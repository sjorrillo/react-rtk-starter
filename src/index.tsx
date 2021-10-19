import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import { Provider } from 'react-redux';
import { setupRootStore } from './app/store';
import { initTranslations } from './app/modules/i18n';
import { initApiClient } from './app/modules/xhr';
import { applyServerSettings } from './config';
import { BASE_LANGUAGE } from './app/modules/i18n/setup-i18n';

applyServerSettings((config) => {
  const store = setupRootStore();

  initApiClient(store);

  const renderApp = () => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  initTranslations({ lng: BASE_LANGUAGE, debug: config.i18nDebug }, renderApp);
});
