import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove } from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faGripVertical } from "@fortawesome/free-solid-svg-icons";

function DraggableList({ images, setImages, handleDeleteImage, theme }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((img) => img.name === active.id);
      const newIndex = images.findIndex((img) => img.name === over?.id);

      setImages((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={images.map((img) => img.name)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-2">
          {images.map(({ name }) => (
            <SortableItem
              key={name}
              id={name}
              name={name}
              handleDeleteImage={handleDeleteImage}
              theme={theme}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ id, name, handleDeleteImage, theme }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`flex justify-between items-center border-b pb-2 shadow p-2 rounded-lg ${
        theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-2">
        {/* Drag handle */}
        <FontAwesomeIcon
          icon={faGripVertical}
          className="text-gray-500 cursor-grab"
          {...listeners}
        />
        {/* File name */}
        <span className="truncate w-40">{name}</span>
      </div>
      <button
        onClick={() => handleDeleteImage(name)}
        className="text-red-500 font-bold"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
}

export default DraggableList;
