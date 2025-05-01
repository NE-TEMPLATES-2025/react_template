import './styles/index.css'
import { Toaster } from 'react-hot-toast'
import PagesRoutes from './routes'
import React from 'react'
import { Loader } from './components/ui/loader'

function App() {
  return (
    <React.Suspense 
      fallback={
        <Loader 
          fullscreen 
          size="lg" 
          variant="primary"
          text="Loading..."
        />
      }
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }}
      />
      <PagesRoutes />
    </React.Suspense>
  )
}

export default App
