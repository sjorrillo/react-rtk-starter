import React from 'react';
import ReactDOM from 'react-dom';
import App from './core/app';
import { Provider } from 'react-redux';
import { setupRootStore } from './core/store';
import { initTranslations } from './core/modules/i18n';
import { client, initApiClient } from './core/modules/xhr';
import { applyServerSettings } from './config';
import { BASE_LANGUAGE } from './core/modules/i18n/setup-i18n';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import buildTheme from './config/theme';

applyServerSettings((config) => {
  const store = setupRootStore(client);

  initApiClient(store);

  const renderApp = () => {
    ReactDOM.render(
      <React.StrictMode>
        <ThemeProvider theme={buildTheme()}>
          <CssBaseline />

          <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>
        </ThemeProvider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  };

  initTranslations({ lng: BASE_LANGUAGE, debug: config.i18nDebug }, renderApp);
});
