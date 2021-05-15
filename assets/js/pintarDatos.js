import {contenedorCards, templateCardPersonajes, templateCardUbicaciones, fragment, contenedorṔaginador ,paginador} from './variablesGlobales.js';

function pintarUbicaciones(datos) {
    console.log(datos);
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
    pintarPaginador(info, 'ubicacion');
    contenedorCards.appendChild(fragment);
}

function pintarPersonajes(datos) {
    console.log(datos);
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

    pintarPaginador(info, 'personaje');
   

    contenedorCards.appendChild(fragment);
}



function pintarPaginador(info, busqueda) {
    let posicion;
    let name;

    if (info.next === null && info.prev !== null) {
        posicion = info.prev.lastIndexOf('=');
        name = info.prev.substr(posicion + 1 );
    }
    else if(info.next === null && info.prev === null){
        name = 0
    }
    else{
        posicion = info.next.lastIndexOf('=');
        name = info.next.substr(posicion + 1 );
    }



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