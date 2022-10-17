/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactElement, useState } from 'react';

interface IState {
  isCollapse: boolean;
  isHover: boolean;
  isClick: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const initialState: IState = {
  isCollapse: false,
  isHover: false,
  isClick: false,
  onToggle: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

interface CollapseProviderProps {
  children: ReactElement;
}

const CollapseSideBarContext = createContext(initialState);

export default function CollapseSideBarProvider({ children }: CollapseProviderProps) {
  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
  });

  const handleToggle = () => {
    setCollapse((prev) => ({ ...prev, click: !prev.click }));
  };

  const handleMouseLeave = () => {
    if (collapse.click) {
      setCollapse((prev) => ({ ...prev, hover: false }));
    }
  };

  const handleMouseEnter = () => {
    if (collapse.click) {
      setCollapse((prev) => ({ ...prev, hover: true }));
    }
  };
  return (
    <CollapseSideBarContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        isHover: collapse.hover,
        isClick: collapse.click,
        onToggle: handleToggle,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }}
    >
      {children}
    </CollapseSideBarContext.Provider>
  );
}

export { CollapseSideBarContext };
