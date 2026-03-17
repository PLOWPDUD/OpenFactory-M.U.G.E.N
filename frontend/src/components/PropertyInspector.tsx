import React from 'react';
import { useSprite } from '../context/SpriteContext';

const PropertyInspector: React.FC = () => {
  const { selectedSprite, updateOffset, setSelectedSprite } = useSprite();

  const handleIdentityChange = (field: 'group' | 'index', val: string) => {
    setSelectedSprite({
      ...selectedSprite,
      [field]: parseInt(val) || 0
    });
  };

  const handleOffsetChange = (field: 'xOffset' | 'yOffset', val: string) => {
    const num = parseInt(val) || 0;
    if (field === 'xOffset') updateOffset(num, selectedSprite.yOffset);
    else updateOffset(selectedSprite.xOffset, num);
  };

  return (
    <div className="w-64 bg-[#252526] border-l border-[#333333] flex flex-col h-full text-sm">
      <div className="p-3 font-semibold text-gray-400 uppercase border-b border-[#333333] tracking-wider">
        Sprite Properties
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        {/* Identity */}
        <div>
          <h3 className="text-gray-500 mb-2 font-medium">Identity</h3>
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-400">Group:</label>
            <input
              type="number"
              value={selectedSprite.group}
              onChange={e => handleIdentityChange('group', e.target.value)}
              className="bg-[#3c3c3c] text-white w-20 px-2 py-1 rounded outline-none border border-transparent focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-400">Index:</label>
            <input
              type="number"
              value={selectedSprite.index}
              onChange={e => handleIdentityChange('index', e.target.value)}
              className="bg-[#3c3c3c] text-white w-20 px-2 py-1 rounded outline-none border border-transparent focus:border-blue-500"
            />
          </div>
        </div>

        <hr className="border-[#333333]" />

        {/* Alignment */}
        <div>
          <h3 className="text-gray-500 mb-2 font-medium">Alignment (Axis)</h3>
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-400">X Offset:</label>
            <input
              type="number"
              value={selectedSprite.xOffset}
              onChange={e => handleOffsetChange('xOffset', e.target.value)}
              className="bg-[#3c3c3c] text-white w-20 px-2 py-1 rounded outline-none border border-transparent focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-400">Y Offset:</label>
            <input
              type="number"
              value={selectedSprite.yOffset}
              onChange={e => handleOffsetChange('yOffset', e.target.value)}
              className="bg-[#3c3c3c] text-white w-20 px-2 py-1 rounded outline-none border border-transparent focus:border-blue-500"
            />
          </div>
        </div>

        <hr className="border-[#333333]" />

        {/* Info */}
        <div className="text-gray-500 text-xs mt-2">
          <p>Format: SFF 1.01 (8-bit)</p>
          <p>Dimensions: 120 x 140 px</p>
          <p>Palette: Shared</p>
        </div>

        <hr className="border-[#333333]" />

        {/* Project info */}
        <div>
          <h3 className="text-gray-500 mb-2 font-medium">Project Settings</h3>
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-400">Target SFF:</label>
            <select
              value={useSprite().sffVersion}
              onChange={e => useSprite().setSffVersion(e.target.value as 'v1' | 'v1.1')}
              className="bg-[#3c3c3c] text-white w-24 px-1 py-1 rounded outline-none border border-transparent focus:border-blue-500 text-xs"
            >
              <option value="v1">MUGEN Beta (v1)</option>
              <option value="v1.1">MUGEN 1.0 (v1.1)</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-400">File:</label>
            <span className="text-blue-400 cursor-pointer hover:underline text-[10px] truncate max-w-[120px]">
              character.def
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInspector;
