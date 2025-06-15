import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContextProvider } from './contexts/AppContext.tsx'
import { AppRoutes } from './routes.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  </StrictMode>,
)