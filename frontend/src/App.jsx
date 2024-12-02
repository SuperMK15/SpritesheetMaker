import React, { useState } from "react";
import axios from "axios";

function App() {
  const [matrix, setMatrix] = useState([[""]]);
  const [spriteWidth, setSpriteWidth] = useState(null);
  const [spriteHeight, setSpriteHeight] = useState(null);
  const [padding, setPadding] = useState(null);
  const [images, setImages] = useState([]);
  const [spritesheetURL, setSpritesheetURL] = useState(null);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);

    setImages((prev) => [
      ...prev,
      ...fileList.map((file) => ({ file, name: file.name })),
    ]);
  };

  const handleMatrixChange = (rowIdx, colIdx, value) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[rowIdx][colIdx] = value;
    setMatrix(updatedMatrix);
  };

  const addRow = () => setMatrix([...matrix, [""]]);

  const handleRowChange = (rowIdx, value) => {
    const updatedMatrix = [...matrix];
    const numColumns = Math.max(Number(value), 1); // Ensure at least 1 column
    updatedMatrix[rowIdx] = new Array(numColumns).fill("");
    setMatrix(updatedMatrix);
  };

  const removeRow = (rowIdx) => {
    const updatedMatrix = [...matrix];
    updatedMatrix.splice(rowIdx, 1);
    setMatrix(updatedMatrix);
  };

  const generateSpritesheet = async () => {
    const imageData = {};
    for (const { file, name } of images) {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
      imageData[name] = base64;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-spritesheet", {
        matrix,
        images: imageData,
        sprite_width: spriteWidth,
        sprite_height: spriteHeight,
        padding,
      });

      setSpritesheetURL(response.data.spritesheet);
    } catch (error) {
      console.error("Error generating spritesheet:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Spritesheet Generator</h1>

      {/* File Upload */}
      <div className="mb-6">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="block text-lg"
        />
      </div>

      {/* Matrix Editor */}
      <div className="bg-white p-4 shadow rounded-lg w-full max-w-3xl mb-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Arrange Files</h2>
        {matrix.map((row, rowIdx) => (
          <div className="flex items-center space-x-2 mb-2" key={rowIdx}>
            {/* Textbox to control number of images per row */}
            <input
              type="number"
              value={row.length}
              onChange={(e) => handleRowChange(rowIdx, e.target.value)}
              className="border p-2 rounded w-16"
            />
            {row.map((cell, colIdx) => (
              <div className="flex items-center" key={colIdx}>
                {/* Dropdown to select images from uploaded list */}
                <select
                  value={cell}
                  onChange={(e) => handleMatrixChange(rowIdx, colIdx, e.target.value)}
                  className="p-2 border rounded w-40"
                >
                  <option value="">Select Image</option>
                  {images.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button
              onClick={() => removeRow(rowIdx)}
              className="ml-4 text-red-500"
            >
              Remove Row
            </button>
          </div>
        ))}
        <button
          onClick={addRow}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Row
        </button>
      </div>

      {/* Settings */}
      <div className="bg-white p-4 shadow rounded-lg w-full max-w-3xl mb-6">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="flex space-x-4">
          <div>
            <label className="block font-medium">Sprite Width</label>
            <input
              type="number"
              className="border p-2 rounded w-40"
              value={spriteWidth}
              onChange={(e) => setSpriteWidth(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-medium">Sprite Height</label>
            <input
              type="number"
              className="border p-2 rounded w-40"
              value={spriteHeight}
              onChange={(e) => setSpriteHeight(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-medium">Padding</label>
            <input
              type="number"
              className="border p-2 rounded w-40"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateSpritesheet}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg mb-6 disabled:opacity-50"
        disabled={!spriteWidth || !spriteHeight || padding === null || images.length === 0}
      >
        Generate Spritesheet
      </button>

      {/* Spritesheet Output */}
      {spritesheetURL && (
        <div className="mt-6">
          <img src={spritesheetURL} alt="Spritesheet" className="rounded-lg shadow-lg" />
          <button
            onClick={() => {
              const a = document.createElement("a");
              a.href = spritesheetURL;
              a.download = "spritesheet.png";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 inline-block"
          >
            Download Spritesheet
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
