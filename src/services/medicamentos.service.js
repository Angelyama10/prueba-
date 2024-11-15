// medicamentos.service.js
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

export const getMedicamentos = async (token) => {
  try {
    const url = ApiUrl; // Ya contiene la ruta completa
    console.log("URL utilizada para obtener medicamentos:", url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error en la respuesta de getMedicamentos: ${response.status} - ${errorText}`);
      throw new Error('Error al obtener medicamentos');
    }
    
    const data = await response.json();
    console.log("Datos de medicamentos desde el servicio:", data);
    return data;
  } catch (error) {
    console.error("Error en getMedicamentos:", error);
    return [];
  }
};

export const getMedicamentoById = async (token, id) => {
  try {
    const url = `${ApiUrl}/dosis?id=${id}`;
    console.log("URL utilizada para obtener el medicamento por ID:", url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log(`Error en la respuesta de getMedicamentoById: ${response.status}`);
      throw new Error('Error al obtener el medicamento');
    }

    const data = await response.json();
    console.log("Datos obtenidos del medicamento:", data);
    return data;
  } catch (error) {
    console.error("Error en getMedicamentoById:", error);
    throw error;
  }
};

// Nueva función para actualizar el medicamento
export const updateMedicamento = async (token, id, dataMed) => {
  try {
    const url = `${ApiUrl}/update?id=${id}`;
    console.log("URL utilizada para actualizar el medicamento:", url);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataMed),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error al actualizar el medicamento: ${errorText}`);
      throw new Error(`Error al actualizar medicamento: ${errorText}`);
    }

    const data = await response.json();
    console.log("Medicamento actualizado correctamente:", data);
    return data;
  } catch (error) {
    console.error("Error en updateMedicamento:", error);
    throw error;
  }
};

// Nueva función para eliminar el medicamento
export const deleteMedicamento = async (token, id) => {
  try {
    const url = `${ApiUrl}/delete?id=${id}`;
    console.log("URL utilizada para eliminar el medicamento:", url);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error al eliminar el medicamento: ${errorText}`);
      throw new Error(`Error al eliminar medicamento: ${errorText}`);
    }

    console.log("Medicamento eliminado correctamente");
    return { success: true };
  } catch (error) {
    console.error("Error en deleteMedicamento:", error);
    throw error;
  }
};
