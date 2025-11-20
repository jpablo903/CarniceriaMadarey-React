import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './pages/NavBar'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import Ofertas from './pages/Ofertas'
import Resenias from './pages/Resenia'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'
import Footer from './pages/Footer'
import AdminPanel from './pages/AdminPanel'

function App() {

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/Productos' element={<Productos />} />
                <Route path='/Ofertas' element={<Ofertas />} />
                <Route path='/Resenias' element={<Resenias />} />
                <Route path='/Contacto' element={<Contacto />} />
                <Route path='/Carrito' element={<Carrito />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
