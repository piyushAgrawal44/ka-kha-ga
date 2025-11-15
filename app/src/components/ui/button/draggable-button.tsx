import React, { useState } from "react";

const DraggableButton: React.FC = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="w-full h-screen fixed"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        onMouseDown={handleMouseDown}
        className="absolute px-4 py-2 bg-blue-500 text-white rounded"
        style={{
          left: pos.x,
          top: pos.y,
        }}
      >
        Drag me
      </div>
    </div>
  );
};

export default DraggableButton;
