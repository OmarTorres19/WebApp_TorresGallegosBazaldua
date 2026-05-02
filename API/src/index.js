/**
 * APIREST
 *
 * Arquitecta básica
 *
 *   Models - Operaciones CRUD en la tablas Users
 *   Routes - Cada ruta accede a una operación
 *            en la BD.
 *   Controllers - gestiona la petición y determina
 *              - que operación debe ejecutarse y
 *              - retorna los datos.
 *    Config - configurar las conexiones a las BD:
 *             MySQL y SQLServer
 *
 *   Métodos HTTP: GET | POST | PUT | DELETE
 *
 *   Conector a BD - MySQL y SQLServer
 *
 *   Thunderclient
 */

import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/routes.js";
import cors from "cors"; // Permite solicitudes desde cualquier origen

dotenv.config();

const app = express();

// Configurar CORS para permitir solicitudes desde cualquier origen
// Esto es útil durante el desarrollo, pero en producción, es recomendable configurar CORS
// de manera más restrictiva para mejorar la seguridad.
app.use(cors());

app.use(express.json()); // Viaja en formato JSON
//http://localhost:5000/api/ con esto accedemos al servidor

//  Leer JSON
// Para que el servidor pueda entender las solicitudes con cuerpo en formato JSON, se utiliza el middleware express.json().
// Esto permite que el servidor analice el cuerpo de las solicitudes entrantes y lo convierta en un objeto JavaScript
//  accesible a través de req.body. Sin esta configuración, el servidor no podría procesar correctamente las solicitudes
// que contienen datos en formato JSON.
app.use(express.json());

app.use("/api", usersRoutes);
// de la variable de entorno PORT, si no existe, se asigna el valor 5000
// El servidor escucha en el puerto definido por la variable de entorno PORT o en el puerto 5000 si PORT no está definido

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
