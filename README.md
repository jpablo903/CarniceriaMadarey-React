# 🥩 Carnicería Online - Proyecto React JS

Este proyecto fue desarrollado como parte del programa **Talento Tech** del curso de **React JS**. Su objetivo principal es modernizar una aplicación web existente, transformándola de un proyecto de Frontend JS simple a una aplicación robusta y dinámica utilizando la tecnología moderna de React.

---

## ✨ Características del Proyecto

Este sitio web simula una carnicería online, ofreciendo a los clientes una plataforma sencilla para visualizar productos, consultar ofertas y realizar pedidos mediante un carrito de compras.

| Sección | Descripción |
| :--- | :--- |
| **Productos y Ofertas** | Muestra el catálogo completo de cortes (Vacuno, Pollo, Cerdo). Los datos son consumidos dinámicamente desde una Mock API. |
| **Carrito de Compras** | Permite a los clientes seleccionar y gestionar productos antes de formalizar el pedido, facilitando una experiencia de compra fluida. |
| **Contacto** | Información de contacto y ubicación del negocio. |
| **Reseñas** | Espacio para que los clientes dejen comentarios y valoraciones. |

---

## 🚀 Modernización Tecnológica

Este proyecto representa una **continuación y modernización** del proyecto original desarrollado en JavaScript. Modernizamos la página haciendo uso de tecnologías modernas y populares:

| Aspecto | Proyecto Original (Frontend JS) | Proyecto Actual (React JS) |
| :--- | :--- | :--- |
| **Tecnologías Base** | HTML, CSS, JavaScript (Vanilla) | **React + Vite**, JavaScript (Moderno) |
| **Gestión de Datos** | Datos estáticos (arrays locales) | Datos dinámicos obtenidos mediante `fetch` desde una **Mock API** |
| **Arquitectura** | Funciones y manipulación directa del DOM | Uso de **Componentes Reutilizables** y manejo de estado a través de *Hooks* (`useState`, `useEffect`). |
| **Herramientas** | Entorno básico | **Vite** para un desarrollo rápido y optimizado. |

---

## 🛠️ Instalación y Ejecución

Para levantar el proyecto de forma local, sigue estos pasos:

### Prerrequisitos

* Tener instalado **Node.js** (versión recomendada 18+).

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/jpablo903/CarniceriaMadarey-React.git
    cd CarniceriaMadarey
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar la API:**
    * Verifica que la URL de tu Mock API en el archivo `Productos.jsx` sea correcta y que los datos estén cargados (con IDs únicos).

4.  **Iniciar el proyecto:**
    ```bash
    npm run dev
    ```

El proyecto se abrirá automáticamente en tu navegador en el puerto local (generalmente `http://localhost:5173`).

---

## 👥 Desarrollador

* **Juan Pablo Rajoy** - *Estudiante de Talento Tech - React JS*