import React, { useState } from 'react';
import { LuLayoutGrid, LuImage, LuMousePointer2 } from 'react-icons/lu';

const Canvas: React.FC = () => {
  const [bgChecker, setBgChecker] = useState(true);

  return (
    <div className={`flex-1 flex flex-col h-full bg-[#1e1e1e] relative`}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-[#2d2d2d] border-b border-[#3e3e42]">
        <button 
          className={`p-1.5 rounded ${bgChecker ? 'bg-[#404040]' : 'hover:bg-[#3a3a3d]'}`}
          onClick={() => setBgChecker(!bgChecker)}
          title="Toggle checkerboard background"
        >
          <LuLayoutGrid size={16} />
        </button>
        <button className="p-1.5 rounded hover:bg-[#3a3a3d]" title="Toggle Transparency (8-bit / 32-bit)">
          <LuImage size={16} />
        </button>
        <div className="h-4 w-px bg-gray-600 mx-1" />
        <button className="p-1.5 rounded bg-[#404040]" title="Select Tool">
          <LuMousePointer2 size={16} />
        </button>
      </div>

      {/* Drawing Area */}
      <div className={`flex-1 relative overflow-hidden ${bgChecker ? 'bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVQ4T2NkYGD4z8DAwMgAA0xCQEDAQIIB1AwDGAaMBgOjgIE+cDA1DAyMBgP9IAAA/7AB8+4P6hAAAAAASUVORK5CYII=)]' : 'bg-[#1e1e1e]'}`}>
        
        {/* Crosshair (Coordinate Axis) */}
        <div className="absolute top-1/2 left-1/2 w-full h-px bg-green-500/50 -translate-x-1/2 mix-blend-difference pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 h-full w-px bg-green-500/50 -translate-y-1/2 mix-blend-difference pointer-events-none" />

        {/* Center Indicator */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full border border-green-400 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        {/* Placeholder Sprite */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400/30 font-bold text-xl select-none">
          SPRITE CANVAS
        </div>
      </div>
    </div>
  );
};

export default Canvas;
