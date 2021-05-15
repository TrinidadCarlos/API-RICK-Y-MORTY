import alertas from "./alertas.js";
// https://rickandmortyapi.com/api/character/?page=2&name=morty


//SE GENERA LA URL EN BASE A LO QUE EL USUARIO QUIERA VER
function prepararUrl(dato) {
    console.log(dato);
    let pagina;
    let regex = /(\d+)/g;
    let url = "https://rickandmortyapi.com/api/";

    //GENERA LA URL PARA TRAER POR CATEGORIA
    if (dato === 'character' || dato === 'location') {
        url += dato;
    } 
    else if (dato.indexOf("ubicacion") === 0) {
        pagina = dato.match(regex);
        url += `location?page=${pagina[0]}`;
    } 
    else if (dato.indexOf("personaje") === 0) {
        pagina = dato.match(regex);
        
        if (!Number(dato.substr(-1))) {
            //SI ES DIFERENTE DE NUMERO QUIERE DECIR QUE ES EL NOMBRE DE UN PERSONAJE
            let nombre = dato.lastIndexOf("=");
            nombre = dato.substr(nombre + 1);
            console.log(nombre);
            url += `character/?page=${pagina}&name=${nombre}`

        } else {
            //EN CASO DE SE NUMERO, SOLO ES UNA ID DE LA SIGUIENDE PÁGINA DE LOS PERSONAJES
            url += `character?page=${pagina[0]}`;
        }
    } else {
        //GENERA URL PARA TRAER PERSONAJE EN ESPECIFICO
        url += `character/?name=${dato}`
    }

    return consultarAPI(url);

}

//SE CONSULTA LA API

async function consultarAPI(url) {

    try {
        const peticion = await fetch(url)
        const data = await peticion.json()
        if (data.error) {
            alertas('Seguro?', 'Esto no esta en el universo de R y M... intenta nuevamente *burp', 'question');
        } else {
            return data;
        }
    } catch (error) {
        alertas('Lo siento', 'Ha ocurrido un error al realizar la consulta', 'warning');
    }
}

export {
    prepararUrl
}