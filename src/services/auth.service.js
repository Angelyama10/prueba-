const ApiUrl = `${process.env.REACT_URI_API}/${process.env.Version}`;

export const auht = async (dataUser) => {
  try {
    const response = await fetch(`${ApiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(dataUser),
    });

    if (!response.ok) {
        throw new Error('error en la creacion del usuario');
      }
  
      const dataAuth= await response.json();
      return dataAuth;
  } catch (error) {
    throw error;
  }
};
