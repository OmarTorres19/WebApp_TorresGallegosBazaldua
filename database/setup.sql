/*
  SCRIPT DE CONFIGURACIÓN DE BASE DE DATOS
  Práctica 3 - FORMULARIO con API REST
*/

-- 1. CREACIÓN DE LA BASE DE DATOS
-- Si la base de datos ya existe, no hace nada. Si no, la crea.
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Users')
BEGIN
    CREATE DATABASE [Users];
END
GO

USE [Users];
GO

-- 2. CREACIÓN DE LA TABLA
-- Verificamos si la tabla ya existe para evitar errores al re-ejecutar
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    SET ANSI_NULLS ON;
    SET QUOTED_IDENTIFIER ON;

    CREATE TABLE [dbo].[users](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [nombre] [nvarchar](100) NOT NULL,
        [correo] [nvarchar](100) NOT NULL,
        [contrasena] [nvarchar](255) NOT NULL,
        [preguntarc] [nvarchar](255) NULL, -- Pregunta de recuperación
        [respuestarc] [nvarchar](255) NULL, -- Respuesta de recuperación
        
        CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [UQ_users_correo] UNIQUE NONCLUSTERED ([correo] ASC)
    ) ON [PRIMARY];
    
    PRINT 'Tabla [users] creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'La tabla [users] ya existe en la base de datos.';
END
GO

-- 3. INSERCIÓN DE DATOS DE PRUEBA
IF NOT EXISTS (SELECT 1 FROM [dbo].[users] WHERE [correo] = 'admin@correo.com')
BEGIN
    INSERT INTO [dbo].[users] ([nombre], [correo], [contrasena], [preguntarc], [respuestarc])
    VALUES ('Administrador', 'admin@correo.com', 'hash_de_prueba_123', 'Mascota', 'Firulais');
    PRINT 'Usuario de prueba insertado.';
END
GO