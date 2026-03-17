import React from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import CodeEditor from './components/CodeEditor';
import PropertyInspector from './components/PropertyInspector';

function App() {
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
}

export default App;
