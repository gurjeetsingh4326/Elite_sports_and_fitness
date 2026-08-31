import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { OrgProvider } from '@/context/OrgContext'
import { DataStoreProvider } from '@/context/DataStoreContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <OrgProvider>
        <DataStoreProvider>
          <App />
        </DataStoreProvider>
      </OrgProvider>
    </BrowserRouter>
  </StrictMode>,
)
