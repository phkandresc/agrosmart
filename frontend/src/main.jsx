import React from 'react'
import { createRoot } from 'react-dom/client'
import VistaDashboard from './components/VistaDashboard'
import VistaConfiguracion from './components/VistaConfiguracion'
import './styles.css'

function App() {
  return (
    <div>
      <h1>M.I.P. - AgroSmart</h1>
      <VistaDashboard />
      <VistaConfiguracion />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
