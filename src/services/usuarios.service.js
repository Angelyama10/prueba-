// user.service.js
import { REACT_URI_API } from '@env';

const ApiUrl = `${REACT_URI_API}/users`; // Ruta actualizada a /users

export const registerUser = async (userData) => {
  try {
    console.log("Datos que se envían a la API para registrar usuario:", userData); // Log para depuración
    const response = await fetch(ApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error al registrar usuario: ${errorText}`);
      throw new Error(`Error al registrar usuario: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
};

export const getUserById = async (token, userId) => {
  try {
    const url = `${ApiUrl}/users/user?id=${userId}`;
    console.log("URL utilizada para obtener el usuario:", url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error al obtener el usuario: ${errorText}`);
      throw new Error(`Error al obtener usuario: ${errorText}`);
    }

    const data = await response.json();
    console.log("Datos del usuario obtenidos:", data);

    // Retornar solo el primer nombre
    return data.firstName;
  } catch (error) {
    console.error("Error en getUserById:", error);
    throw error;
  }
};



