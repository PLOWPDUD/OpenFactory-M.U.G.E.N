import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor: React.FC = () => {
  return (
    <div className="h-64 border-t border-[#3e3e42] bg-[#1e1e1e] flex flex-col">
      <div className="flex bg-[#2d2d2d] text-xs">
        <div className="px-4 py-1.5 bg-[#1e1e1e] border-t-2 border-primary-500 text-gray-300">
          player.cns
        </div>
        <div className="px-4 py-1.5 text-gray-500 hover:bg-[#2a2d2e] cursor-pointer">
          player.cmd
        </div>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="ini"
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on'
          }}
          defaultValue={`[Data]
life = 1000
power = 3000
attack = 100
defence = 100

[Size]
xscale = 1
yscale = 1

[StateDef 0]
type = S
physics = S
anim = 0`}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
