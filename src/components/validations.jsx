// validations.js (crea este archivo para tus funciones de validación)
export const validations = {
    isEmail: (value) => {
      // Aquí puedes agregar tu lógica de validación de correo electrónico
      // Por ejemplo, podrías usar una expresión regular
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || 'Correo electrónico inválido';
    },
  };
  