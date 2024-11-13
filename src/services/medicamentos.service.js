import { REACT_URI_API } from '@env';

const ApiUrl = `${REACT_URI_API}/medicamentos`; // Ruta completa con /medicamentos

export const postMedicamentos = async (token, dataMed) => {
  try {
    console.log("Datos que se envían a la API:", dataMed); // Log para verificar el formato
    const response = await fetch(ApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataMed),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error al insertar medicamento: ${errorText}`);
      throw new Error(`Error al insertar medicamento: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en postMedicamentos:", error);
    throw error;
  }
};

// medicamentos.service.js

export const getMedicamentos = async (token) => {
  try {
    console.log("URL utilizada para obtener medicamentos:", ApiUrl); // Verificar URL
    const response = await fetch(ApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.log(`Error en la respuesta de getMedicamentos: ${response.status}`);
      throw new Error('Error al obtener medicamentos');
    }
    
    const data = await response.json();
    console.log("Datos de medicamentos desde el servicio:", data); // Log para verificar datos
    return data;
  } catch (error) {
    console.error("Error en getMedicamentos:", error);
    return [];
  }
};