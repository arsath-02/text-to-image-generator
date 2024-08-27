import React from "react";

const InputSection = ({ generateImage, loading }) => {
  const [prompt, setPrompt] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    generateImage(prompt);
  };

  return (
    <section className="fixed sm:bottom-6 max-sm:top-0 right-0 flex max-sm:flex-col text-gray-600">
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Enter a prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Generate Image
        </button>
      </form>
    </section>
  );
}

export default InputSection;