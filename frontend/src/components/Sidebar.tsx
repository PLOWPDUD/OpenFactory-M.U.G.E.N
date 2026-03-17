import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#252526] border-r border-[#333333] flex flex-col h-full">
      <div className="p-3 text-sm font-semibold text-gray-400 uppercase border-b border-[#333333] tracking-wider">
        Explorer (Sprites)
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {/* Placeholder for groups and indices */}
        <div className="text-sm p-1 hover:bg-[#2a2d2e] cursor-pointer rounded text-gray-300">
          Group 0 (Standing)
        </div>
        <div className="text-sm p-1 hover:bg-[#2a2d2e] cursor-pointer rounded text-gray-300 ml-4 border-l border-[#444]">
          - Index 0
        </div>
        <div className="text-sm p-1 hover:bg-[#2a2d2e] cursor-pointer rounded text-gray-300 ml-4 border-l border-[#444]">
          - Index 1
        </div>
        <div className="text-sm p-1 hover:bg-[#2a2d2e] cursor-pointer rounded text-gray-300">
          Group 20 (Walking)
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
