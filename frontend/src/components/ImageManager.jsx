import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import DraggableList from './DraggableList';

const ImageManager = ({ images, setImages, theme }) => {
    const handleFileUpload = (e) => {
        const files = e.target.files;
        const fileList = Array.from(files);

        setImages((prev) => [
            ...prev,
            ...fileList.map((file) => ({ file, name: file.name })),
        ]);
    };

    const handleDeleteImage = (imageName) => {
        setImages((prev) => prev.filter((image) => image.name !== imageName));
    };

    const handleClearAll = () => {
        if (!images.length) return;

        const confirmDelete = window.confirm("Are you sure you want to delete all images?");
        if (!confirmDelete) return;

        setImages([]);
    };

    return (
        <div
            className={`rounded-lg w-64 p-4 overflow-y-auto max-h-screen mt-4 ml-4 mb-4 ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            } shadow`}
        >
            <h2 className="text-xl font-bold mb-5 text-center">Image Manager</h2>
            <div className="mt-4 mb-6">
                <label
                    htmlFor="file-upload"
                    className={`flex items-center justify-center px-4 py-2 rounded-lg shadow cursor-pointer transition text-white ${
                        theme === "dark" ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                    Upload Images
                </label>
                <button
                    onClick={handleClearAll}
                    className={`${
                        theme === "dark" ? "bg-red-600 hover:bg-red-500" : "bg-red-500 hover:bg-red-600"
                    } text-white px-4 py-2 rounded-lg shadow mt-4 w-full`}
                >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Clear All
                </button>
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </div>
            <DraggableList
                images={images}
                setImages={setImages}
                handleDeleteImage={handleDeleteImage}
                theme={theme} // Pass theme to DraggableList
            />
        </div>
    );
};

export default ImageManager;
