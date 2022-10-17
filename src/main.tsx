import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeProvider from './theme';
import { CookiesProvider } from 'react-cookie';
import CollapseSideBarProvider from './contexts/CollapseSideBarContext';
import SettingContextProvider from './contexts/SettingContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <BrowserRouter>
          <CookiesProvider>
            <CollapseSideBarProvider>
              <SettingContextProvider>
                <ThemeProvider>
                  <App />
                </ThemeProvider>
              </SettingContextProvider>
            </CollapseSideBarProvider>
          </CookiesProvider>
        </BrowserRouter>
      </HelmetProvider>
    </PersistGate>
  </ReduxProvider>
  // </React.StrictMode>
);
