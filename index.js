/* 
   Archivo principal que inicia el servidor.
   Responsabilidades:
     1. Configurar Express
     2. Leer variables de entorno
     3. Registrar middlewares
     4. Registrar rutas
     5. Servir archivos estáticos (assets)


  Se requiere configurar el proyecto nodeJS
  
  1. Iniciarlizar proyecto
     npm init -y ------ asigna valores por defecto en 
                 ------ la configuración de package.json

   2. Instalar dependencias para el proyecto: en este caso
      Express para el servidor HTTP para procesar peticiones
      a través de envíos POST y GET.

      npm install express

      npm install --save-dev nodemon

*/

/*app.disable('x-powered-by');*/

import express from "express";
import path from "path"; //Maneja rutas de archivos (nativo de Node)
import { fileURLToPath } from "url"; //Convierte URL->ruta de archivo
import session from "express-session"; //Manejo de sesiones de usuario

import formRoutes from "./routes/formRoutes.js"; //Mis rutas personalizadas
import { get404 } from "./controllers/errorController.js";

// asigna puerto para atender peticiones
/**
 * | Rango       | Tipo        | Uso recomendado                                 |
| ----------- | ----------- | ----------------------------------------------- |
| 0-1023      | Well-known  | ❌ Reservados (HTTP=80, HTTPS=443, FTP=21, etc.) |
| 1024-49151  | Registrados | ✅ Desarrollo (3000, 4000, 5000, 8080)           |
| 49152-65535 | Dinámicos   | ✅ Temporales                                    |
 */

// Estas dos líneas simulan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 5000;

//convertimos a app en un objeto con métodos .use() .get() .listen()
const app = express() //Instancia de clase express -> Objeto app

// Define moto de plantillas
app.set('view engine', 'ejs'); //Motor de plantillas EJS

//asocia carpeta de views para las vistas EJS
app.set('views', path.join(__dirname, 'views')); //Ruta absoluta a carpeta de vistas

//Transforma cuerpos JSON de tipo POST -> Objs JavaScript. Se ejecuta SIEMPRE en todos los requests
app.use(express.json()); //Función Middleware incorporada de Express

//Procesa formularios HTML.
app.use(express.urlencoded({ extended: true })); //extended:true - permite objetos anidados en formularios
//<form name="Juan&age=25> → req.body = {name: "Juan", age: "25"}

// Configuración de sesiones
// secret:          clave para firmar la cookie (en producción iría en .env)
// resave:          no re-guarda la session si no hubo cambios
// saveUninitialized: no crea session hasta que se guarde algo (ej: login exitoso)
// cookie.maxAge:   duración de la sesión en ms → 1 hora
// cookie.httpOnly: la cookie no es accesible desde JavaScript del navegador (seguridad)
app.use(session({
    secret: "bat-cave-secret-key-2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hora
        httpOnly: true
    }
}));

//                path.join(__dirname, "public") → /ruta/al/proyecto/public




//asocia contenido estático. Se ejecuta ANTES que formRoutes
app.use("/", express.static(path.join(__dirname, "public")));


//Rutas
app.use("/", formRoutes); // ./routes/formRoutes.js


app.use(get404); 

//Asociamos puerto con el servidor
app.listen(port, () => {
   console.log(`Servidor ejecutándose en http://localhost:${port}`);
})


//Flujo completo de una petición
/*
1. Navegador: GET http://localhost:3000/contacto
2. app.listen() recibe petición
3. Express ejecuta middlewares EN ORDEN:
   a) express.json() ✓ (no hay JSON)
   b) express.urlencoded() ✓ (no hay form)
   c) express.static("/") ❌ (no existe public/contacto.html)
   d) formRoutes("/") → formRoutes.get('/contacto') ✓
4. formRoutes responde → Navegador muestra página
*/


//Orden Visual
/*
app.use(express.json())     ← 1° SIEMPRE
app.use(express.urlencoded()) ← 2° SIEMPRE  
app.use("/", express.static()) ← 3° Archivos primero
app.use("/", formRoutes)     ← 4° Rutas personalizadas

*/