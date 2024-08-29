import React from "react";
import ImageGenerator from "./components/ImageGenerator";

const App = () => {
  return (
    <div className="App">
      <header className="bg-gray-800 p-4 text-white text-center">
        <h1 className="text-2xl">Image Generator</h1>
      </header>
      <main className="p-4">
        <ImageGenerator />
      </main>
    </div>
  );
};

export default App;