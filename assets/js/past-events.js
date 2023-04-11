const contenedorCartas = document.getElementById("eventosPasados")

let plantillaEventos = ""

const eventosPasados = []

for( let evento of data.eventos ){
    if(evento.date < data.fechaActual ){
        eventosPasados.push( evento )
    } 
}

function agregarEvento (eventosPasados){
    const alt = eventosPasados.name.replace(/\s/g, `-`).toLowerCase();
        return `<div class="card bg-black col-10 col-md-3 height1 rounded-5">
                    <img class="h-50 p-2 rounded-5" src="${eventosPasados.image}" class="card-img-top" alt="${alt}">
                    <div class="d-flex justify-content-between flex-column card-body">
                        <h5 class="card-title fw-bold text-center">${eventosPasados.name}</h5>
                        <p class="card-text">${eventosPasados.description}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <p class="card-text fw-bold m-0">$${eventosPasados.price}</p>
                            <a class="btn-card fw-bold" href="../pages/details.html?id=${eventosPasados.name}">See more...</a>
                        </div>
                    </div>
                </div>`;
}

for (let evento of eventosPasados){
    plantillaEventos += agregarEvento(evento); 
}

contenedorCartas.innerHTML = plantillaEventos
let buscador = document.getElementById("buscador")
let contenedorCategorias = document.getElementById("contenedorCategorias")

let categorias = eventosPasados.map (evento => evento.category)
/* console.log(categorias) */
let categoriasFiltrado = new Set (categorias)
let categoriasFinal = Array.from(categoriasFiltrado)
/* console.log(categoriasFinal) */

imprimirCategorias(categoriasFinal, contenedorCategorias)

function imprimirCategorias(array, contenedor){
    let plantillaCategorias = ""
    for (let categoria of array){
        plantillaCategorias += `<div class="d-flex align-items-center">
                                    <input class="form-check-input m-2" type="checkbox" name="${categoria}" value="${categoria}">
                                    <label class="form-check-label m-2" for="${categoria}">${categoria}</label>
                                </div>`
    }
    contenedor.innerHTML = plantillaCategorias
    
}

contenedorCategorias.addEventListener("change", (e) => {
    let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
    /* console.log(arrayCategorias) */
    let filtro = filtrarPorCategoria(eventosPasados, arrayCategorias)
    let resultados = buscadorDeTexto(filtro, buscador.value)
    imprimirEventos(resultados)
})

buscador.addEventListener("input", (e) => {
    let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
    /* console.log(arrayCategorias) */
    let filtro = filtrarPorCategoria(eventosPasados, arrayCategorias)
    let resultados = buscadorDeTexto(filtro, buscador.value)
    imprimirEventos(resultados)
})

function filtrarPorCategoria(array, categorias){
    if ( categorias.length === 0 ){
        return array
    }else{
        return array.filter( array => categorias.includes(array.category) );
    }
}

function buscadorDeTexto(array, texto){
    if (!texto){
        return array;
    }else{
        let textoMin = texto.toLowerCase();
        return array.filter( nota => nota.name.toLowerCase().includes(textoMin) || nota.description.toLowerCase().includes(textoMin) )
    }
}

function imprimirEventos(parametro){
    if (parametro.length === 0){
        contenedorCartas.innerHTML = `<div class="bg-black col-10 col-md-3 rounded-4">
                                        <div class="d-flex justify-content-between flex-column card-body">
                                            <h5 class="card-title text-light fw-bold text-center p-3">There are no events to show</h5>
                                        </div>
                                    </div>`;
    }else{
        let nota = parametro.map(agregarEvento).join(" ")
        contenedorCartas.innerHTML = nota;
    }
}