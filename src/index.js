// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { FirebaseContext } from './context/FirebaseContext';
import auth from './firebase/config';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <FirebaseContext.Provider value={{ auth }}>
        <App />
      </FirebaseContext.Provider>
    </React.StrictMode>
);

reportWebVitals();
