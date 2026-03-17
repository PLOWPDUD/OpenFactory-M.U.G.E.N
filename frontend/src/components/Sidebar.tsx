import React from 'react';
import { useSprite } from '../context/SpriteContext';

const Sidebar: React.FC = () => {
  const { selectedSprite, setSelectedSprite } = useSprite();

  const sprites = [
    { group: 0, index: 0, xOffset: 50, yOffset: 100 },
    { group: 0, index: 1, xOffset: 52, yOffset: 100 },
    { group: 20, index: 0, xOffset: 45, yOffset: 110 },
  ];

  return (
    <div className="w-64 bg-[#252526] border-r border-[#333333] flex flex-col h-full">
      <div className="p-3 text-sm font-semibold text-gray-400 uppercase border-b border-[#333333] tracking-wider">
        Explorer (Sprites)
      </div>
      <div className="flex-1 overflow-y-auto p-0">
        {sprites.map((spr, i) => (
          <div 
            key={i}
            onClick={() => setSelectedSprite(spr)}
            className={`text-sm p-2 px-3 cursor-pointer transition-colors ${
              selectedSprite.group === spr.group && selectedSprite.index === spr.index 
              ? 'bg-[#37373d] text-white shadow-inner' 
              : 'hover:bg-[#2a2d2e] text-gray-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="opacity-50">#</span>
              <span>Group {spr.group}, Index {spr.index}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
