# Configuración de la Base de Datos 🗄️

Este directorio contiene los scripts e instrucciones para configurar el entorno de base de datos local y la conexión con la API.

## 🚀 Pasos para empezar

1. **Instalación**: Abre el archivo `setup.sql` en SQL Server Management Studio (SSMS).
2. **Ejecución**: Ejecuta el script completo para crear la base de datos `Users` y la tabla `users`.

## ⚙️ Configuración del Entorno (Archivo .env)

Para que la API funcione en tu equipo, **Copia el archivo .env.example, cámbiale el nombre a .env y rellena los datos con tu servidor local** ubicado en la carpeta `API`. Cada integrante tiene una configuración de sistema distinta:
s

- **SQLSERVER_SERVER**: Pon el nombre de tu Laptop/PC (Ej: `LAPTOP-3CI84CFC`).
- **SQLSERVER_INSTANCE**: El nombre de tu instancia de SQL (Ej: `SQLEXPRESS02`).
- **SQLSERVER_USER**: `Usuario_API` (Debes crearlo en tu SQL Server).
- **SQLSERVER_PASSWORD**: `api123` (Configúralo al crear el usuario).

> [!IMPORTANT]
> **Creación del Usuario en SQL**: No olvides crear el Login `Usuario_API` en SSMS, asignarle la contraseña `api123` y darle permisos de lectura/escritura (`db_datareader`, `db_datawriter`) sobre la base de datos `Users`.

## 📊 Estructura de la Tabla `users`

| Campo       | Tipo     | Descripción                       |
| :---------- | :------- | :-------------------------------- |
| id          | INT      | Clave primaria (Auto-incremental) |
| nombre      | NVARCHAR | Nombre completo del usuario       |
| correo      | NVARCHAR | Email (Único)                     |
| contrasena  | NVARCHAR | Password enmascarado (Hash)       |
| preguntarc  | NVARCHAR | Pregunta de recuperación          |
| respuestarc | NVARCHAR | Respuesta de recuperación         |
