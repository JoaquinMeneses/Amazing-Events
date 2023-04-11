import {agregarEvento,imprimirCategorias,filtrarPorCategoria,buscadorDeTexto,imprimirEventos} from "./module/funciones.js"

const contenedorCartas = document.getElementById("eventos")

let plantillaEventos = ""

const eventos = []

let href = "../pages/details.html"

for( let evento of data.eventos ){
    if(evento.date > data.fechaActual ){
        eventos.push( evento )
    } 
}

for (let evento of eventos){
    plantillaEventos += agregarEvento(evento); 
}

contenedorCartas.innerHTML = plantillaEventos
let buscador = document.getElementById("buscador")
let contenedorCategorias = document.getElementById("contenedorCategorias")

let categorias = eventos.map (evento => evento.category)
/* console.log(categorias) */
let categoriasFiltrado = new Set (categorias)
let categoriasFinal = Array.from(categoriasFiltrado)
/* console.log(categoriasFinal) */

imprimirCategorias(categoriasFinal, contenedorCategorias)

contenedorCategorias.addEventListener("change", (e) => {
    let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
    /* console.log(arrayCategorias) */
    let filtro = filtrarPorCategoria(eventos, arrayCategorias)
    let resultados = buscadorDeTexto(filtro, buscador.value)
    imprimirEventos(resultados,contenedorCartas)
})

buscador.addEventListener("input", (e) => {
    let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
    /* console.log(arrayCategorias) */
    let filtro = filtrarPorCategoria(eventos, arrayCategorias)
    let resultados = buscadorDeTexto(filtro, buscador.value)
    imprimirEventos(resultados,contenedorCartas)
})