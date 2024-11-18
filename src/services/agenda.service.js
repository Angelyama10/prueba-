import { REACT_URI_API } from '@env'; // Importar la URL base desde las variables de entorno

const ApiUrl = `${REACT_URI_API}/agenda`;

/**
 * Envía una anotación de agenda a la API (POST).
 * @param {Object} agendaData - Datos de la anotación.
 * @returns {Object} Respuesta de la API.
 */
export const sendAgendaData = async (agendaData) => {
  try {
    console.log('URL utilizada para la API:', ApiUrl);
    console.log('Payload enviado a la API:', agendaData);

    const response = await fetch(ApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agendaData),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Error al enviar datos:', errorDetails);
      throw new Error('Error al enviar datos: ' + errorDetails);
    }

    const data = await response.json();
    console.log('Respuesta de la API:', data);
    return data;
  } catch (error) {
    console.error('Error en sendAgendaData:', error.message);
    throw error;
  }
};

/**
 * Obtiene todas las agendas de la API (GET).
 * @param {string} token - Token de autenticación.
 * @returns {Array} Lista de agendas.
 */
export const getAgendas = async (token) => {
  try {
    console.log('URL utilizada para obtener agendas:', ApiUrl);

    const response = await fetch(ApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Error al obtener agendas:', errorDetails);
      throw new Error('Error al obtener agendas: ' + errorDetails);
    }

    const data = await response.json();
    console.log('Datos de agendas desde la API:', data);
    return data;
  } catch (error) {
    console.error('Error en getAgendas:', error.message);
    return [];
  }
};

export const getAgendaById = async (token, id) => {
  try {
    const url = `${ApiUrl}/${id}`; // Asegúrate de que ApiUrl está definido como https://api.tu-servidor.com/v1/agenda
    console.log('URL para obtener agenda por ID:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error al obtener agenda:', errorDetails);
      throw new Error('Error al obtener agenda');
    }

    const data = await response.json();
    console.log('Datos de la agenda recibidos:', data);
    return data;
  } catch (error) {
    console.error('Error en getAgendaById:', error.message);
    throw error;
  }
};
