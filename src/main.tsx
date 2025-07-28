import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Layout from './layout'
import Articles from './pages/Articles'
import { DataProvider } from './context'
import Error404 from './pages/Error404'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
)
