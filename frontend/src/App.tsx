import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import CodeEditor from './components/CodeEditor';
import PropertyInspector from './components/PropertyInspector';
import { SpriteProvider, useSprite } from './context/SpriteContext';
import React, { useEffect } from 'react';

const AppContent: React.FC = () => {
  const { setFileContents } = useSprite();

  useEffect(() => {
    // In a real electron app, this would use IPC
    // For this scaffold, we'll simulate the load with the templates we just integration
    // We already have the content in our memory from the previous tool calls
    setFileContents({
      'char.def': `; Definition file for player\n[Info]\nname = ""\ndisplayname = ""\nauthor = "OpenFactory"\n\n[Files]\ncmd = char.cmd\ncns = char.cns\nst = char.cns\nsprite = char.sff\nanim = char.air`,
      'char.cmd': `; Command file\n[Command]\nname = "y"\ncommand = y\ntime = 1`,
      'char.cns': `; Constants file\n[Data]\nlife = 1000\nattack = 100\ndefence = 100`,
      'char.air': `; Animation file\n[Begin Action 0]\n0,0, 0,0, 5`
    });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1e1e1e] text-gray-200 overflow-hidden font-sans select-none">
      {/* Top Menu Bar */}
      <div className="h-8 bg-[#333333] border-b border-[#1e1e1e] flex items-center px-4 text-xs gap-4">
        <span className="font-semibold text-gray-300">OpenFactory-MUGEN</span>
        <span className="cursor-pointer hover:text-white">File</span>
        <span className="cursor-pointer hover:text-white">Edit</span>
        <span className="cursor-pointer hover:text-white">View</span>
        <span className="cursor-pointer hover:text-white">Char</span>
        <span className="cursor-pointer hover:text-white">Help</span>
      </div>
      
      {/* Main Workspace */}
      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Left Sidebar (Explorer) */}
        <Sidebar />
        
        {/* Center Area (Canvas + Editor) */}
        <div className="flex-1 flex flex-col min-w-0">
          <Canvas />
          <CodeEditor />
        </div>

        {/* Right Sidebar (Properties) */}
        <PropertyInspector />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white text-xs flex items-center px-4 justify-between">
        <span>Ready</span>
        <div className="flex gap-4">
          <span>Sprites: 154</span>
          <span>Palettes: 1</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <SpriteProvider>
      <AppContent />
    </SpriteProvider>
  );
}

export default App;
