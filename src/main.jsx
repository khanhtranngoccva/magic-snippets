import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(<BrowserRouter>
    <App/>
</BrowserRouter>);
