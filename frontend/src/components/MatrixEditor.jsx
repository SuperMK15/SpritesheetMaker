import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faCogs } from "@fortawesome/free-solid-svg-icons";

const MatrixEditor = ({ matrix, setMatrix, images }) => {
    useEffect(() => {
        setMatrix((prevMatrix) => {
            const updatedMatrix = prevMatrix.map((row) => row.map((cell) => {
                if (images.every((image) => image.name !== cell)) {
                    return "";
                }
                return cell;
            }));
            return updatedMatrix;
        });
    }, [images]);

    const handleMatrixChange = (rowIdx, colIdx, value) => {
        const updatedMatrix = [...matrix];
        updatedMatrix[rowIdx][colIdx] = value;
        setMatrix(updatedMatrix);
    };

    const addRow = () => setMatrix([...matrix, [""]]);

    const handleRowChange = (rowIdx, value) => {
        const updatedMatrix = [...matrix];
        const numColumns = Number(value);
        updatedMatrix[rowIdx] = new Array(numColumns).fill("");
        setMatrix(updatedMatrix);
    };

    const removeRow = (rowIdx) => {
        const updatedMatrix = [...matrix];
        updatedMatrix.splice(rowIdx, 1);
        setMatrix(updatedMatrix);
    };

    const autofillMatrix = () => {
        let i = 0;
        const updatedMatrix = matrix.map((row) => {
            return row.map((cell) => {
                const image = images[i];
                i++;
                return image ? image.name : "";
            });
        });
        setMatrix(updatedMatrix);
    }

    return (
        <div className="bg-white p-4 shadow rounded-lg w-full max-w-3xl mb-6 overflow-x-auto">
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold mb-4">Arrange Files</h2>
                <button
                    onClick={autofillMatrix}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2 ml-auto"
                >
                    <FontAwesomeIcon icon={faCogs} className="mr-2" />
                    Autofill Matrix
                </button>
            </div>

            {matrix.map((row, rowIdx) => (
                <div className="flex items-center space-x-2 mb-2" key={rowIdx}>
                    <input
                        type="number"
                        value={row.length}
                        onChange={(e) => handleRowChange(rowIdx, e.target.value)}
                        className="border p-2 rounded w-16"
                    />
                    {row.map((cell, colIdx) => (
                        <div className="flex items-center" key={colIdx}>
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
                        className="bg-red-500 text-white px-4 py-2 rounded flex items-center min-w-max mr-2"
                    >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Remove Row
                    </button>
                </div>
            ))}
            <button
                onClick={addRow}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Row
            </button>
        </div>
    )
}

export default MatrixEditor
