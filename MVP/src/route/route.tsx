/**
 * @fileoverview Configuración de rutas principales de la aplicación 
 * @module Routes
 * @version 1.0.0
 */

import {createBrowserRouter} from "react-router-dom"
import Chat from "../page/chat/chat";
import Landing from "../page/landing/landing";

/**
 * @constant
 * @type {import('react-router-dom').RouteObject[]}
 * @description Router principal que contiene todas las rutas de la aplicación
 */

const router = createBrowserRouter([
    {
        path:"/",
        element: <Landing/>,
        errorElement: <div>Ups! Algo salió mal</div>
    },
    {
        path:"chat",
        element: <Chat/>,
        errorElement: <div>Ups! Algo salió mal</div>
    }
])

export default router;