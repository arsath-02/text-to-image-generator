import React, { useState } from "react";
import axios from "axios";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const generateImageAndDescription = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://active-mallard-uniquely.ngrok-free.app/generate_image_and_description", { prompt });
      setImage(response.data.image);
      setDescription(response.data.description);
    } catch (error) {
      console.error("Error generating image and description:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={generateImageAndDescription} className="mb-4">
        <label htmlFor="prompt" className="block text-gray-700 text-sm font-bold mb-2">
          Enter a prompt:
        </label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>
      {image && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Generated Image:</h2>
          <img src={`data:image/png;base64,${image}`} alt="Generated" className="w-64 h- 64" />
        </div>
      )}
      {description && (
        <div>
          <h2 className="text-xl font-bold mb-2 text-gray-600">Description:</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;