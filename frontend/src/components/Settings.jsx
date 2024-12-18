import React from 'react';

const Settings = ({ spriteWidth, setSpriteWidth, spriteHeight, setSpriteHeight, padding, setPadding, theme }) => {
    return (
        <div
            className={`${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            } p-4 shadow rounded-lg w-full max-w-3xl mb-6`}
        >
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="flex space-x-4">
                <div>
                    <label className="block font-medium">Sprite Width</label>
                    <input
                        type="number"
                        className={`border p-2 rounded w-40 ${
                            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                        }`}
                        value={spriteWidth}
                        onChange={(e) => setSpriteWidth(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block font-medium">Sprite Height</label>
                    <input
                        type="number"
                        className={`border p-2 rounded w-40 ${
                            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                        }`}
                        value={spriteHeight}
                        onChange={(e) => setSpriteHeight(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block font-medium">Padding</label>
                    <input
                        type="number"
                        className={`border p-2 rounded w-40 ${
                            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                        }`}
                        value={padding}
                        onChange={(e) => setPadding(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;
