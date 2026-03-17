import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface SpriteMetadata {
  group: number;
  index: number;
  xOffset: number;
  yOffset: number;
}

interface SpriteContextType {
  selectedSprite: SpriteMetadata;
  setSelectedSprite: (sprite: SpriteMetadata) => void;
  bgChecker: boolean;
  setBgChecker: (val: boolean) => void;
  transparency: boolean;
  setTransparency: (val: boolean) => void;
  canvasPos: { x: number; y: number };
  setCanvasPos: (pos: { x: number; y: number }) => void;
  updateOffset: (x: number, y: number) => void;
  sffVersion: 'v1' | 'v1.1';
  setSffVersion: (v: 'v1' | 'v1.1') => void;
  activeFile: string;
  setActiveFile: (f: string) => void;
  fileContents: Record<string, string>;
  setFileContents: (contents: Record<string, string>) => void;
}

const SpriteContext = createContext<SpriteContextType | undefined>(undefined);

export const SpriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSprite, setSelectedSprite] = useState<SpriteMetadata>({
    group: 0,
    index: 0,
    xOffset: 0,
    yOffset: 0,
  });
  const [bgChecker, setBgChecker] = useState(true);
  const [transparency, setTransparency] = useState(true);
  const [canvasPos, setCanvasPos] = useState({ x: 0, y: 0 });
  const [sffVersion, setSffVersion] = useState<'v1' | 'v1.1'>('v1.1');
  const [activeFile, setActiveFile] = useState('char.def');
  const [fileContents, setFileContents] = useState<Record<string, string>>({});

  const updateOffset = (x: number, y: number) => {
    setSelectedSprite(prev => ({ ...prev, xOffset: x, yOffset: y }));
  };

  return (
    <SpriteContext.Provider value={{
      selectedSprite,
      setSelectedSprite,
      bgChecker,
      setBgChecker,
      transparency,
      setTransparency,
      canvasPos,
      setCanvasPos,
      updateOffset,
      sffVersion,
      setSffVersion,
      activeFile,
      setActiveFile,
      fileContents,
      setFileContents
    }}>
      {children}
    </SpriteContext.Provider>
  );
};

export const useSprite = () => {
  const context = useContext(SpriteContext);
  if (!context) {
    throw new Error('useSprite must be used within a SpriteProvider');
  }
  return context;
};
