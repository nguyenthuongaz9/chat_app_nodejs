import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import ModelProvider from './components/providers/ModelProvider.tsx'
import { QueryProvider } from './components/providers/QueryProvider.tsx'
import { SocketProvider } from './components/providers/SocketProvider.tsx'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
        <SocketProvider>
          <QueryProvider>
            
            <App />
            <Toaster />
            <ModelProvider />
          
          </QueryProvider>     
        </SocketProvider>

    </>
  </StrictMode>,
)
