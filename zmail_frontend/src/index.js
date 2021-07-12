import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import firebase from 'firebase/app'
// import reportWebVitals from './reportWebVitals';

firebase.initializeApp({
  apiKey: "AIzaSyAgxX-_HTUC9T3Q8Di1lQ87DbOJI7XVhOw",
  authDomain: "zmail-c6a2a.firebaseapp.com",
  projectId: "zmail-c6a2a",
  storageBucket: "zmail-c6a2a.appspot.com",
  messagingSenderId: "617480774526",
  appId: "1:617480774526:web:b84fe09b4eb76eba52892f"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();
