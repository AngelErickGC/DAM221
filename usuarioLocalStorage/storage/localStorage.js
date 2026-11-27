const STORAGE_KEY = '@usuarios_app';

export const guardarUsuarios = (usuarios) => {
  try {
    const data = JSON.stringify(usuarios);
    localStorage.setItem(STORAGE_KEY, data);
    return true;
  } catch (error) {
    console.error('Error al guardar:', error);
    return false;
  }
};

export const obtenerUsuarios = async () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al obtener:', error);
    return [];
  }
};

export const eliminarUsuarioStorage = async (id) => {
  try {
    const usuarios = await obtenerUsuarios();
    const filtrados = usuarios.filter((u) => u.id !== id);
    guardarUsuarios(filtrados);
    return true;
  } catch (error) {
    return false;
  }
};