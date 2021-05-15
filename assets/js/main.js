import {formulario, personaje, categoria, vaciarCampos, contenedorṔaginador} from './variablesGlobales.js';
import { pintarUbicaciones, pintarPersonajes, limpiarPaginador } from './pintarDatos.js';
import {prepararUrl} from './peticiones.js';
import alertas from './alertas.js';

window.onload = function(){
    const spinner = document.querySelector('.spinner');
    spinner.style.opacity = 0;
    spinner.style.visibility = "hidden";
    spinner.style.transition = "all 1.5s ease-in-out ";
    formulario.addEventListener('submit', evaluarCampo);
    vaciarCampos.addEventListener('click', vaciarCards);
    contenedorṔaginador.addEventListener('click', paginaSiguiente);
    
}


async function evaluarCampo(e) {
    e.preventDefault();
    let datos;

    // EVALUA SI AMBOS CAMPOS ESTÁN LLENOS
    if (personaje.value !== '' && categoria.value !== 'null') {
        alertas('¡Una opción!', 'Solo se permite personaje o categoría', 'error')
        return;
    }
    //EVALUA SI AMBOS CAMPOS SON VACIOS
    if (personaje.value === '' && categoria.value === 'null') {
        alertas('¡Campos vacíos!', 'Escribe un personaje o selecciona una categoría', 'error')
        return;
    }
    
    //EVALUA SI PERONAJE ES UN NÚMERO O SI PERSONAJE NO ESTA VACIO Y SI CATEGORIA ES DIFERENTE DE VACIO
    if(!isNaN(personaje.value ) || personaje.value.trim() === '' && categoria.value !== 'null' ){
        //SE SELECCIONÓ CATEGORIA
        //al usar preparaURL se debe usar la funcion asincrona
        datos = await prepararUrl(categoria.value);
    }else{
        //SE SELECCIONÓ PERSONAJE
        //al usar preparaURL se debe usar la funcion asincrona
        datos = await prepararUrl(personaje.value);
    }
  
    //SI DATOS CONTIENE UN RESULTADO, SE LLAMA A LA FUNCION SIGUIENTE
    if (datos) {
        seleccionarDatosAPintar(datos);
    }

}

function seleccionarDatosAPintar(datos) {
    //EN BASE A LA CATEGORIA SE SELECCIONA QUE SE VA A PINTAR: UBICACIONES O PERSONAJES
    categoria.value === 'location' ? pintarUbicaciones(datos) : pintarPersonajes(datos) ;
}

function vaciarCards(){
    //BORRA EL CONTENIDO EXISTENTE DE LAS UBICACIONES O PERSONAJES PARA MOSTRAR LOS NUEVOS
    if (contenedorCards.firstChild) {
        while(contenedorCards.firstChild){
            contenedorCards.removeChild(contenedorCards.firstChild);
        }
    }
    //SE LIMPIA EL PAGINADOR YA QUE CADA PERSONAJE, PERSONAJES, UBICACION O UBICACIONES CUENTAN CON PÁGINAS DIFERENTES
    limpiarPaginador();
}


async function paginaSiguiente(e) {
    //SE SELECCIONAN LOS DATOS DEL ID DE NUMERO SELECCIONADO EN EL PAGINADOR
    const paginaSiguiente = e.target.id;
    //SE HACE LA PETICION DE LA PÁGINA SIGUIENTE
    const next = await prepararUrl(paginaSiguiente);


    //SE PINTA EL PAGINADOR DEL PERSONAJE O UBICACIÓN
    if (paginaSiguiente.indexOf('ubicacion') === 0) {
        pintarUbicaciones(next);
    }else if(paginaSiguiente.indexOf('personaje') === 0){
        pintarPersonajes(next);
    }
}