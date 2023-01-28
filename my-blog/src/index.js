import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyB-X6GGEKw9tXT7DOhQAKkc8FRHYMMdH8w",
  authDomain: "my-react-blog-e9d58.firebaseapp.com",
  projectId: "my-react-blog-e9d58",
  storageBucket: "my-react-blog-e9d58.appspot.com",
  messagingSenderId: "669266581350",
  appId: "1:669266581350:web:5eceae75bbf33923c5daa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
