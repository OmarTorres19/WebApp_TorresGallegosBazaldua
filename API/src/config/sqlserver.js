import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

export const sqlServerConfig = {
  user: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  server: process.env.SQLSERVER_SERVER, // ✅ SOLO el host
  database: process.env.SQLSERVER_DB,
  options: {
    instanceName: process.env.SQLSERVER_INSTANCE, // ✅ AQUÍ va la instancia
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(sqlServerConfig);
    return pool;
  } catch (error) {
    console.error('❌ SQL Server connection error:', error);
    throw error;
  }
};
``