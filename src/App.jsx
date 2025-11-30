import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { Suspense, lazy } from 'react';

import NavBar from './pages/NavBar'
import Inicio from './pages/Inicio' 
import Carrito from './pages/Carrito'
import Footer from './pages/Footer'

const Productos = lazy(() => import('./pages/Productos'));
const Ofertas = lazy(() => import('./pages/Ofertas'));
const Resenias = lazy(() => import('./pages/Resenia')); 
const Contacto = lazy(() => import('./pages/Contacto'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {

    return (
        <div>
            <NavBar />
            <Suspense fallback={<div style={{ minHeight: '80vh', textAlign: 'center', paddingTop: '50px' }}>Cargando...</div>}>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/Productos' element={<Productos />} />
                <Route path='/Ofertas' element={<Ofertas />} />
                <Route path='/Resenias' element={<Resenias />} />
                <Route path='/Contacto' element={<Contacto />} />
                <Route path='/Carrito' element={<Carrito />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            </Suspense>
            <Footer />
        </div>
    )
}

export default App
