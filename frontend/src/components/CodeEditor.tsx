import React from 'react';
import Editor from '@monaco-editor/react';
import { useSprite } from '../context/SpriteContext';

const CodeEditor: React.FC = () => {
  const { activeFile, setActiveFile, fileContents, setFileContents } = useSprite();

  const files = ['char.def', 'char.cns', 'char.cmd', 'char.air'];

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFileContents({
        ...fileContents,
        [activeFile]: value
      });
    }
  };

  return (
    <div className="h-64 bg-[#1e1e1e] border-t border-[#333333] flex flex-col">
      {/* File Tabs */}
      <div className="flex bg-[#252526] border-b border-[#333333] overflow-x-auto">
        {files.map(file => (
          <div
            key={file}
            onClick={() => setActiveFile(file)}
            className={`px-4 py-1.5 text-xs cursor-pointer border-r border-[#333333] transition-colors whitespace-nowrap ${
              activeFile === file 
              ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-t-blue-500' 
              : 'text-gray-500 hover:bg-[#2a2d2e] hover:text-gray-300'
            }`}
          >
            {file}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="ini"
          theme="vs-dark"
          value={fileContents[activeFile] || `; Loading ${activeFile}...`}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 8 }
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
