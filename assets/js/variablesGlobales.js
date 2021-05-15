const formulario = document.querySelector('#formulario');
const personaje = document.querySelector('#personaje');
const categoria = document.querySelector('#categoria');
const vaciarCampos = document.querySelector('#vaciarCampos');
const contenedorṔaginador = document.querySelector('#contenedorPaginas');
const paginador = document.querySelector('#paginador');


const fragment = document.createDocumentFragment();
const contenedorCards = document.querySelector('#contenedorCards');
const templateCardPersonajes = document.querySelector('#templateCardPersonajes').content;
const templateCardUbicaciones = document.querySelector('#templateCardUbicaciones').content;


export {
    formulario,
    personaje,
    categoria,
    vaciarCampos,
    contenedorṔaginador,
    paginador,
    contenedorCards,
    templateCardPersonajes,
    templateCardUbicaciones,
    fragment
}