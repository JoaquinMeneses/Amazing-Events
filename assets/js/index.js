import {agregarEvento,imprimirCategorias,filtrarPorCategoria,buscadorDeTexto,imprimirEventos} from "./module/funciones.js";

const contenedorEventos = document.getElementById("eventos")

let plantillaEventos = ""

const eventos = []

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        // Manipula los datos obtenidos de la API
        /* console.log(data.events);
        console.log(data.currentDate); */
        // Filtra los eventos pasados y agrega a eventos[]
        for (let evento of data.events) {
            eventos.push(evento);
        }

        // Se conecta a la funcion agregarEvento para usarse como parametro y conectar el evento con Details
        const urlDetails = "./assets/pages/details.html"

        // Genera la plantilla de eventos pasados
        for (let evento of eventos) {
            plantillaEventos += agregarEvento(evento,urlDetails);
        }

        // Agrega la plantilla de eventos pasados al contenedor
        contenedorEventos.innerHTML = plantillaEventos;

        // Obtiene las categorías de los eventos
        let categorias = eventos.map(evento => evento.category);
        let categoriasFiltrado = new Set(categorias);
        let categoriasFinal = Array.from(categoriasFiltrado);

        // Imprime las categorías en el contenedor de categorías
        imprimirCategorias(categoriasFinal, contenedorCategorias);

        // Agrega event listener para el cambio de categorías
        contenedorCategorias.addEventListener("change", filtrosCruzados )
        
        // Agrega event listener para el input del buscador
        buscador.addEventListener("input", filtrosCruzados )

        // Funcion para aplicar filtros cruzados
        function filtrosCruzados() {
            let arrayCategorias = Array.from( document.querySelectorAll('input[type="checkbox"]:checked') ).map(cat => cat.name)
            let filtro = filtrarPorCategoria(eventos, arrayCategorias)
            let resultados = buscadorDeTexto(filtro, buscador.value)
            imprimirEventos(resultados,contenedorEventos)
        }
    })
    .catch(error => {
        console.error(error);
    });