import alertas from "./alertas.js";
import {spinnerPeticiones} from './variablesGlobales.js'

//FUNCIOÓN QUE GENERA LA URL EN BASE A LO QUE EL USUARIO QUIERA VER
function prepararUrl(dato) {
    let pagina;
    let regex = /(\d+)/g;
    //URL BASE
    let url = "https://rickandmortyapi.com/api/";

    //GENERA LA URL PARA TRAER POR CATEGORIA EN GENERAL (EL SELECT DEL FORM)
    if (dato === 'character' || dato === 'location') {
        url += dato;
    } 
    //GENERA LA URL PARA TRAER POR UBICACION (PAGINADOR)
    else if (dato.indexOf("ubicacion") === 0) {
        pagina = dato.match(regex);
        url += `location?page=${pagina[0]}`;
    } 
    //GENERA LA URL PARA TRAER POR PERSONAJES EN GENERAL(PAGINADOR)
    else if (dato.indexOf("personaje") === 0) {
        //OBTIENE LA PAGINA
        pagina = dato.match(regex);
        
        //SI EN LA POSICION DADA ES DIFERENTE DE NUMERO (TEXTO), QUIERE DECIR QUE ES LA SIGUIENTE PAGINA DE UN PERSONAJE EN ESPECIFICO
        if (!Number(dato.substr(-1))) {
            //SI ES DIFERENTE DE NUMERO QUIERE DECIR QUE ES EL NOMBRE DE UN PERSONAJE
            let nombre = dato.lastIndexOf("=");
            //YA SE TENIA LA POSICIÓN DE LA PAGINA SIGUIENTE... SOLO SE OBTINE EL NOMBRE DEL PERSONAJE
            nombre = dato.substr(nombre + 1);
            url += `character/?page=${pagina}&name=${nombre}`

        } else {
            //EN CASO DE SE NUMERO, SOLO ES UNA ID DE LA SIGUIENDE PÁGINA DE LOS PERSONAJES EN GENERAL
            url += `character?page=${pagina[0]}`;
        }
    } 
    //GENERA URL PARA TRAER PERSONAJE EN ESPECIFICO
    else {
        url += `character/?name=${dato}`
    }


    //ANTES DE CONSULTAR LA API CON LA URL QUE SE GENERA, SE ACTIVA EL SPINNER DE CARGA
    spinnerPeticiones.classList.remove('d-none');
    spinnerPeticiones.classList.add('spinner-peticion');

    return consultarAPI(url);

}


//SE CONSULTA LA API
async function consultarAPI(url) {
    let respuesta;
    try {
        const peticion = await fetch(url)
        const data = await peticion.json()
        if (data.error) {
            alertas('Seguro?', 'Esto no esta en el universo de R y M... intenta nuevamente *burp', 'question');
        } else {
           //SE PODRÍA HACER AQUI: return data, PERO ESO HARÍA QUE SE PONGA TENGA QUE QUITAR EL SPINNER AQUI, O EN EL CATCH O ARRIBA DE data.error...
            respuesta =  data;
            
        }
    } catch (error) {
        alertas('Lo siento', 'Ha ocurrido un error al realizar la consulta', 'warning');
    }
    

    //PASE LO QUE PASE, YA SEA CORRECTA LA CONSULTA, O NO ARROJE RESULTADOS O CAIGA EN CATCH, SE QUITA EL SPINNER
    spinnerPeticiones.classList.remove('spinner-peticion');
    spinnerPeticiones.classList.add('d-none');
    //SE RETORNA RESPUESTA CON LA DATA, EN CASO DE TENERLA
    return respuesta

}


export {
    prepararUrl
}