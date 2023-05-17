import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/screens/home/Home.jsx'
import './assets/styles/global.css'
import Router from './components/UI/Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
