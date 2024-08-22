import os
import torch
import base64
from io import BytesIO
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
from transformers import pipeline
from PIL import Image
import uvicorn

class CFG:
    device = "cuda" if torch.cuda.is_available() else "cpu"
    seed = 42
    generator = torch.Generator(device).manual_seed(seed)
    image_gen_steps = 35
    image_gen_model_id = "stabilityai/stable-diffusion-2"
    image_gen_size = (400, 400)
    image_gen_guidance_scale = 9
    prompt_gen_model_id = "gpt2"
    prompt_dataset_size = 6
    prompt_max_length = 12

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Stable Diffusion model for image generation
image_gen_model = StableDiffusionPipeline.from_pretrained(
    CFG.image_gen_model_id, torch_dtype=torch.float16, variant='fp16'
).to(CFG.device)

# Load a text generation model for generating descriptions
description_model = pipeline("text-generation", model="gpt2")

# Define the request model
class ImageRequest(BaseModel):
    prompt: str

@app.post("/generate_image_and_description")
async def generate_image_and_description(request: ImageRequest):
    prompt = request.prompt
    
    # Generate the image
    image = image_gen_model(
        prompt, num_inference_steps=CFG.image_gen_steps,
        generator=CFG.generator,
        guidance_scale=CFG.image_gen_guidance_scale
    ).images[0]
    
    image = image.resize(CFG.image_gen_size, Image.LANCZOS)
    
    # Convert image to base64 for returning as a string
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    
    # Generate a description for the image
    description_prompt = f"Describe the following image: {prompt}"
    description = description_model(description_prompt, max_length=50, num_return_sequences=1)[0]['generated_text']
    
    return {"image": img_str, "description": description}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)