export const validateUser = (user) => {
  const { nombre, correo, contrasena, preguntarc, respuestarc } = user;

  if (!nombre || nombre.length < 2) {
    throw new Error('Nombre inválido');
  }

  if (!correo || !correo.includes('@')) {
    throw new Error('Correo inválido');
  }

 if (!contrasena || contrasena.length < 6) {
  throw new Error("Contraseña inválida");
}

  if (!preguntarc) {
    throw new Error('Pregunta de recuperación requerida');
  }

  if (!respuestarc) {
    throw new Error('Respuesta de recuperación requerida');
  }
};