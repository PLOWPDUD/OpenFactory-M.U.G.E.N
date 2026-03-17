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
      updateOffset
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
