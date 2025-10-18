import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './pages/NavBar'
import Inicio from './pages/Inicio' 
import Productos from './pages/Productos'
import Ofertas from './pages/Ofertas'
import Resenias from './pages/Resenia'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'

function App() {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        const itemExistente = carrito.find(item => item.id === producto.id);

        if (itemExistente) {
            setCarrito(carrito.map(item => 
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const eliminarDelCarrito = (idProducto) => {
        setCarrito(carrito.filter(item => item.id !== idProducto));
    };

    const modificarCantidad = (idProducto, nuevaCantidad) => {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(idProducto);
            return;
        }

        setCarrito(carrito.map(item =>
            item.id === idProducto
                ? { ...item, cantidad: nuevaCantidad }
                : item
        ));
    };

    return (
        <div>
            <NavBar itemCount={carrito.length} />
            <Routes>
                <Route path='/' element={<Inicio/>}/> 
                <Route path='/Productos' element={<Productos agregarAlCarrito={agregarAlCarrito}/>}/>
                <Route path='/Ofertas' element={<Ofertas/>}/> 
                <Route path='/Resenias' element={<Resenias/>}/>
                <Route path='/Contacto' element={<Contacto/>}/>
                <Route path='/Carrito' element={<Carrito 
                            carrito={carrito}
                            modificarCantidad={modificarCantidad}
                            eliminarDelCarrito={eliminarDelCarrito}
                        />
                    }
                />
            </Routes>
        </div>
    )
}

export default App
