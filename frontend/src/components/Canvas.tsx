import React, { useState, useRef } from 'react';
import { LuLayoutGrid, LuImage, LuMousePointer2, LuMove } from 'react-icons/lu';
import { useSprite } from '../context/SpriteContext';

const Canvas: React.FC = () => {
  const { 
    selectedSprite, 
    bgChecker, setBgChecker, 
    transparency, setTransparency,
    canvasPos, setCanvasPos 
  } = useSprite();

  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey) || e.button === 2) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - canvasPos.x, y: e.clientY - canvasPos.y };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCanvasPos({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="flex-1 flex flex-col h-full bg-[#1e1e1e] relative select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-[#2d2d2d] border-b border-[#3e3e42] z-10">
        <button 
          className={`p-1.5 rounded ${bgChecker ? 'bg-[#404040]' : 'hover:bg-[#3a3a3d]'}`}
          onClick={() => setBgChecker(!bgChecker)}
          title="Toggle checkerboard background"
        >
          <LuLayoutGrid size={16} />
        </button>
        <button 
          className={`p-1.5 rounded ${transparency ? 'bg-[#404040]' : 'hover:bg-[#3a3a3d]'}`}
          onClick={() => setTransparency(!transparency)}
          title="Toggle Transparency"
        >
          <LuImage size={16} />
        </button>
        <div className="h-4 w-px bg-gray-600 mx-1" />
        <button className="p-1.5 rounded bg-[#404040]" title="Select Tool">
          <LuMousePointer2 size={16} />
        </button>
        <button className="p-1.5 rounded hover:bg-[#3a3a3d]" title="Move Tool (Right Click / Middle Click Drag)">
          <LuMove size={16} />
        </button>
      </div>

      {/* Drawing Area */}
      <div 
        ref={containerRef}
        className={`flex-1 relative overflow-hidden ${bgChecker ? 'bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVQ4T2NkYGD4z8DAwMgAA0xCQEDAQIIB1AwDGAaMBgOjgIE+cDA1DAyMBgP9IAAA/7AB8+4P6hAAAAAASUVORK5CYII=)]' : 'bg-[#1e1e1e]'}`}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out"
          style={{ transform: `translate(${canvasPos.x}px, ${canvasPos.y}px)` }}
        >
          {/* Crosshair (Coordinate Axis) */}
          <div className="absolute w-full h-px bg-green-500/50 mix-blend-difference pointer-events-none" />
          <div className="absolute h-full w-px bg-green-500/50 mix-blend-difference pointer-events-none" />

          {/* Center Indicator */}
          <div className="absolute w-2 h-2 rounded-full border border-green-400 pointer-events-none" />
          
          {/* Placeholder Sprite with Offset Application */}
          <div 
            className={`flex items-center justify-center border-2 border-dashed border-blue-500/30 bg-blue-500/10 text-white font-bold p-10 transition-all ${!transparency ? 'opacity-50' : ''}`}
            style={{ 
              transform: `translate(${selectedSprite.xOffset}px, ${-selectedSprite.yOffset}px)`,
              width: '120px',
              height: '140px'
            }}
          >
            <div className="text-center text-[10px] leading-tight opacity-50">
              G{selectedSprite.group} I{selectedSprite.index}<br/>
              ({selectedSprite.xOffset}, {selectedSprite.yOffset})
            </div>
          </div>
        </div>

        {/* Overlay Info */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded border border-white/10 pointer-events-none z-10">
          POS: {canvasPos.x}, {canvasPos.y} | OFFSET: {selectedSprite.xOffset}, {selectedSprite.yOffset}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
