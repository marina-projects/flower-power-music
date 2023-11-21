// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { FirebaseContext } from './context/FirebaseContext';
import firebase from './firebase/config';
import { ProvideAuth } from '..//src/context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <FirebaseContext.Provider value={{ firebase }}>
        <ProvideAuth >
          <App />
        </ProvideAuth>
      </FirebaseContext.Provider>
    </React.StrictMode>
);

reportWebVitals();
