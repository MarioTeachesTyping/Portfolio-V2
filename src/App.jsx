import { useState, lazy, Suspense } from 'react'
import { Riple } from 'react-loading-indicators';

import NavBar from './components/NavBar.jsx'

const ModelViewer = lazy(() => import('./components/ModelViewer.jsx'));

function App() {

  return (
    <>
      <div>
        <NavBar />
        <Suspense fallback={
          <div style={{ width: '100vw', height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Riple size="large" color="white" text="" textColor="white" />
          </div>
        }>
          <ModelViewer />
        </Suspense>
      </div>
    </>
  )
}

export default App