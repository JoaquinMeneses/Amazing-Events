const eventos = data.eventos

const contenedorCartas = document.getElementById("eventos")

let template = ""

function agregarEvento (eventos){
    const alt = eventos.name.replace(/\s/g, `-`).toLowerCase();
    return `<div class="card bg-black col-10 col-md-3 height1 rounded-5">
                <img class="h-50 p-2 rounded-5" src="${eventos.image}" class="card-img-top" alt="${alt}">
                <div class="d-flex justify-content-between flex-column card-body">
                    <h5 class="card-title fw-bold text-center">${eventos.name}</h5>
                    <p class="card-text">${eventos.description}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <p class="card-text fw-bold m-0">$${eventos.price}</p>
                        <a class="btn-card fw-bold" href="./assets/pages/details.html?id=${eventos.name}">See more...</a>
                    </div>
                </div>
            </div>`
}

for (let evento of eventos){
    template += agregarEvento(evento); 
}

contenedorCartas.innerHTML = template
let buscador = document.getElementById("buscador")
let contenedorCategorias = document.getElementById("contenedorCategorias")

let categorias = eventos.map (evento => evento.category)
/* console.log(categorias) */
let categoriasFiltrado = new Set (categorias)
let categoriasFinal = Array.from(categoriasFiltrado)
/* console.log(categoriasFinal) */

imprimirCategorias(categoriasFinal, contenedorCategorias)

function imprimirCategorias(array, contenedor){
    let template = ""
    for (let categoria of array){
        template += `<div class="d-flex align-items-center">
                        <input class="form-check-input m-2" type="checkbox" name="${categoria}" value="${categoria}">
                        <label class="form-check-label m-2" for="${categoria}">${categoria}</label>
                    </div>`
    }
    contenedor.innerHTML = template
    
}

contenedorCategorias.addEventListener("change", (e) => {
    let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
    /* console.log(arrayCategorias) */
    let filtro = filtrarPorCategoria(eventos, arrayCategorias)
    let resultados = buscadorDeTexto(filtro, buscador.value)
    imprimirEventos(resultados)
})

buscador.addEventListener("input", (e) => {
    let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
    /* console.log(arrayCategorias) */
    let filtro = filtrarPorCategoria(eventos, arrayCategorias)
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
        contenedorCartas.innerHTML = "There are no events to show";
    }else{
        let nota = parametro.map(agregarEvento).join(" ")
        contenedorCartas.innerHTML = nota;
    }
}