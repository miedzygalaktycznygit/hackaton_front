import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Query, QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { AuthProvider } from './contexts/AuthContext.tsx';

const queryClient = new QueryClient()

async function mocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const {worker} = await import('./mocks/browser')
  worker.start()
}


mocking().then(() => {
  ReactDom.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
})