import React, { useRef, useState } from 'react';

function PaintBox() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(1);

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex items-center p-4 mt-28">
      
      <div className="flex gap-4 mb-4">
        

      {/* Canvas Area */}
      <div className="border border-gray-300 shadow-lg">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="border bg-white"
        />
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <span  className="text-white material-symbols-outlined bg-red-500 mx-6 rounded-lg text-[32px]">arrow_forward_ios</span>
        <div className="">
          <div className="flex items-center gap-2">
              <label className="font-semibold text-white">Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10"
              />
          </div>
            <br />
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Clear
            </button>
        </div>  
        <div className="w-2 h-2 "></div>
      </div>
      </div>
    </div>
  );
}

export default PaintBox;
