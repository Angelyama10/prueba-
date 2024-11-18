import { REACT_URI_API } from '@env'; // Importar la URL base desde las variables de entorno

// Asegurarse de que REACT_URI_API esté definido correctamente
const ApiUrl = `${REACT_URI_API}/citas`;

/**
 * Envía una nueva cita médica a la API.
 * @param {Object} appointmentData - Datos de la cita médica (título, médico, hora, ubicación, nota).
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Object} Respuesta de la API.
 */
export const sendAppointment = async (token, appointmentData) => {
  try {
    console.log('URL utilizada para enviar la cita médica:', ApiUrl);
    console.log('Datos enviados:', appointmentData);

    const response = await fetch(ApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Error en la respuesta de sendAppointment:', errorDetails);
      throw new Error('Error al enviar la cita médica');
    }

    const data = await response.json();
    console.log('Cita médica creada correctamente:', data);
    return data;
  } catch (error) {
    console.error('Error en sendAppointment:', error.message);
    throw error;
  }
};
/**
 * Obtiene la lista de citas médicas desde la API.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Array} Lista de citas médicas.
 */
export const getAppointments = async (token) => {
    try {
      console.log('URL para listar citas médicas:', ApiUrl);
  
      const response = await fetch(ApiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error en getAppointments:', errorDetails);
        throw new Error('Error al obtener citas médicas');
      }
  
      const data = await response.json();
      console.log('Citas médicas obtenidas:', data);
      return data;
    } catch (error) {
      console.error('Error en getAppointments:', error.message);
      return [];
    }
  };