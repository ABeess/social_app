/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import { createContext, ReactElement, useEffect, useState } from 'react';
import useCookiesTheme from 'src/hooks/useCookies';

interface IInitialState {
  themeMode: string;
  onChange: (mode: string) => void;
}

const initialState: IInitialState = {
  themeMode: 'light',
  onChange: () => {},
};

const SettingContext = createContext(initialState);

interface SettingProviderProp {
  children: ReactElement;
}

export default function SettingContextProvider({ children }: SettingProviderProp): ReactElement {
  const { themeMode, setThemeMode } = useCookiesTheme();

  const [theme, setTheme] = useState('');

  const handleChangeTheme = (mode: string) => {
    setThemeMode(mode);
  };

  useEffect(() => setTheme(themeMode), [themeMode]);

  return (
    <SettingContext.Provider value={{ themeMode: theme, onChange: handleChangeTheme }}>
      {children}
    </SettingContext.Provider>
  );
}

export { SettingContext };
