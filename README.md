# Text to Image Generator 🖼️

A simple Node.js + Firebase backend for generating images from text prompts using AI, saving them to Firestore, and providing a description.

## ✨ Features

- Generate AI images based on text prompts.
- Automatically generate image descriptions.
- Store generated images, prompts, and descriptions in Firebase Firestore.
- Easy API integration.

## 🛠️ Tech Stack

- Node.js
- Express.js
- Firebase Firestore
- OpenAI (for image generation)
- Axios

## 🚀 Installation

### Prerequisites

- Node.js (v18 or later)
- Firebase Project with Firestore enabled
- OpenAI API Key
- Service Account Key (for Firebase Admin SDK)

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/arsath-02/text-to-image-generator.git
cd text-to-image-generator
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

### 4️⃣ Setup Firebase Admin SDK

Download your service account key from Firebase Console and place it as `serviceKey.json` in the root directory.

---

## 🔸 Usage

### Start the server

```bash
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

### API Endpoint

#### POST `/generate`

**Body (JSON):**

```json
{
  "prompt": "generate image of iris",
  "userId": "your-user-id"
}
```

**Returns:**

```json
{
  "message": "Prompt and image saved successfully"
}
```

---

## 🟢 Notes

- Make sure your Firebase Service Account has **Firestore Admin** permissions.
- Handle the authentication properly when deploying.
- If you get `UNAUTHENTICATED` errors, refresh or reconfigure your service account.

---

## ✅ License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

[Arsath] - [https://github.com/arsath-02]
