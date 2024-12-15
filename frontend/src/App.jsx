import React, { useState } from "react";

import Title from "./components/Title";
import ImageManager from "./components/ImageManager";
import MatrixEditor from "./components/MatrixEditor";
import Settings from "./components/Settings";
import SpritesheetGenerator from "./components/SpritesheetGenerator";

function App() {
  const [matrix, setMatrix] = useState([[""]]);
  const [spriteWidth, setSpriteWidth] = useState(null);
  const [spriteHeight, setSpriteHeight] = useState(null);
  const [padding, setPadding] = useState(null);
  const [images, setImages] = useState([]);
  const [spritesheetURL, setSpritesheetURL] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <ImageManager
        images={images}
        setImages={setImages}
      />

      <div className="flex-1 p-6 flex flex-col items-center">
        <Title />

        <MatrixEditor
          matrix={matrix}
          setMatrix={setMatrix}
          images={images}
        />

        <Settings
          spriteWidth={spriteWidth}
          setSpriteWidth={setSpriteWidth}
          spriteHeight={spriteHeight}
          setSpriteHeight={setSpriteHeight}
          padding={padding}
          setPadding={setPadding}
        />

        <SpritesheetGenerator
          spriteWidth={spriteWidth}
          spriteHeight={spriteHeight}
          padding={padding}
          spritesheetURL={spritesheetURL}
          setSpritesheetURL={setSpritesheetURL}
          images={images}
          matrix={matrix}
        />
      </div>
    </div>
  );
}

export default App;
