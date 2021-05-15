import {contenedorCards, templateCardPersonajes, templateCardUbicaciones, fragment, contenedorṔaginador ,paginador} from './variablesGlobales.js';


function pintarUbicaciones(datos) {
    const {results, info} = datos;
    //SE LIMPIA EL CONTENDOR PARA QUE AL PINTAR LA PROXIMA CONSULTA, LA ANTERIOR SE BORRE
    contenedorCards.innerHTML = '';

    limpiarPaginador();

    results.forEach(d => {
        templateCardUbicaciones.querySelector('#cardTituloUbicacion').textContent = d.name;
        templateCardUbicaciones.querySelector('#ubicacionTipo').textContent = d.type;
        templateCardUbicaciones.querySelector('#ubicacionDimension').textContent = d.dimension;

        const clone = templateCardUbicaciones.cloneNode(true);
        fragment.appendChild(clone);
    });

    //SE MANDA A PINTAR EL PAGINADOR EL OBJETO info Y LA PALABRA CLAVE ubicacion que sirve mas adelate
    pintarPaginador(info, 'ubicacion');
    contenedorCards.appendChild(fragment);
}


function pintarPersonajes(datos) {
    const {results, info} = datos;
    //SE LIMPIA EL CONTENDOR PARA QUE AL PINTAR LA PROXIMA CONSULTA, LA ANTERIOR SE BORRE
    contenedorCards.innerHTML = '';
    limpiarPaginador();

    results.forEach(p => {
        templateCardPersonajes.querySelector('.card-titulo').textContent = p.name;
        
        templateCardPersonajes.querySelector('#imagen').setAttribute('src', p.image);
        templateCardPersonajes.querySelector('#imagen').setAttribute('alt', `Cargando imagen de ${p.name}...`);
        templateCardPersonajes.querySelector('#genero').textContent = p.gender;
        templateCardPersonajes.querySelector('#origen').textContent = p.origin.name;
        templateCardPersonajes.querySelector('#locacion').textContent = p.location.name;
        templateCardPersonajes.querySelector('#estatus').textContent = p.status;
        templateCardPersonajes.querySelector('#especie').textContent = p.species;

        const clone = templateCardPersonajes.cloneNode(true);
        fragment.appendChild(clone)
    });

    //SE MANDA A PINTAR EL PAGINADOR EL OBJETO info Y LA PALABRA CLAVE personaje que sirve mas adelate
    pintarPaginador(info, 'personaje');
    contenedorCards.appendChild(fragment);
}



function pintarPaginador(info, busqueda) {
    let posicion;
    let name;

    //EL OBJETO info CONTIENTE PROPIEDADES next y prev, que son url para la página siguiente y anterior... en la página 1, prev = null , y en la ultima página next viene como null...

    //en caso de que next sea nulo y prev si tenga valor, quiere decir que estamos en la ultima página
    if (info.next === null && info.prev !== null) {
        posicion = info.prev.lastIndexOf('=');
        name = info.prev.substr(posicion + 1 );
    }
    //si next y prev son nulas, quiere decir que no existen más páginas
    else if(info.next === null && info.prev === null){
        name = 0
    }
     //esta case evalua que... si next si existe y prev es nulo, estamos en la página 1
    else{
        posicion = info.next.lastIndexOf('=');
        name = info.next.substr(posicion + 1 );
    }

    //la variable name toma en nombre del personaje en especifico del cual se esta navegando entra paginas para no perder la referencia de ese nombre, y que la url la necesita...
    // en caso de que no se tenga el nombre (else if) se asigna un 0, indicando que la url no va a necesitar un nombre ya que son personajes, o ubicaciones



    // este if pinta algo asi:
    // en caso de ser ubicaciones: id = ubicacion-PAGINA-NUMERO-p=0
    // en caso de ser personjes: id = ubicacion-PAGINA-NUMERO-p=0

    // en caso de ser personaje especifico: id = ubicacion-PAGINA-NUMERO-p=NOMBRE-DEL-PERSONAJE
    if (info.pages > 1) {
        contenedorṔaginador.classList.remove('d-none');
        for (let i = 1; i <= info.pages; i++) {
            paginador.innerHTML += `
            <li class="pagina" id="${busqueda}-${i}-p=${name}"> ${i} </li>
            `; 
        }
    }
}


function limpiarPaginador(){
    contenedorṔaginador.classList.add('d-none');
    while(paginador.firstChild) {
        paginador.removeChild(paginador.firstChild);
    }
}


export {
    pintarUbicaciones,
    pintarPersonajes,
    limpiarPaginador
}