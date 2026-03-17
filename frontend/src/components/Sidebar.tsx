import React from 'react';
import { useSprite } from '../context/SpriteContext';

const Sidebar: React.FC = () => {
  const { selectedSprite, setSelectedSprite, activeFile, setActiveFile } = useSprite();

  const files = ['char.def', 'char.cns', 'char.cmd', 'char.air'];
  const sprites = [
    { group: 0, index: 0, xOffset: 50, yOffset: 100 },
    { group: 0, index: 1, xOffset: 52, yOffset: 100 },
    { group: 20, index: 0, xOffset: 45, yOffset: 110 },
  ];

  return (
    <div className="w-64 bg-[#252526] border-r border-[#333333] flex flex-col h-full overflow-hidden">
      {/* Files Section */}
      <div className="flex flex-col border-b border-[#333333]">
        <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Project Files
        </div>
        <div className="pb-2">
          {files.map(file => (
            <div
              key={file}
              onClick={() => setActiveFile(file)}
              className={`text-sm px-4 py-1 cursor-pointer transition-colors ${
                activeFile === file ? 'bg-[#37373d] text-white' : 'text-gray-400 hover:bg-[#2a2d2e]'
              }`}
            >
              {file}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-[#333333]">
        Sprite Explorer
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
