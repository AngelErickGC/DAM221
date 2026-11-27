import { obtenerUsuarios, guardarUsuarios, eliminarUsuarioStorage } from '../storage/localStorage';

export const validarUsuario = (nombre, edad) => {
  if (!nombre || nombre.trim() === '') return 'El nombre es obligatorio.';
  if (!edad || isNaN(edad) || parseInt(edad) <= 0) return 'La edad debe ser un número mayor a 0.';
  return null; 
};

export const agregarUsuario = async (nombre, edad) => {
  const error = validarUsuario(nombre, edad);
  if (error) throw new Error(error);

  const usuarios = await obtenerUsuarios();
  const nuevoUsuario = {
    id: Date.now().toString(),
    nombre: nombre.trim(),
    edad: parseInt(edad),
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  return nuevoUsuario;
};

export const listarUsuarios = async () => {
  return await obtenerUsuarios();
};

export const actualizarUsuario = async (id, nombre, edad) => {
  const error = validarUsuario(nombre, edad);
  if (error) throw new Error(error);

  let usuarios = await obtenerUsuarios();
  const index = usuarios.findIndex(u => u.id === id);
  
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], nombre: nombre.trim(), edad: parseInt(edad) };
    guardarUsuarios(usuarios);
    return true;
  }
  return false;
};

export const eliminarUsuario = async (id) => {
  return await eliminarUsuarioStorage(id);
};