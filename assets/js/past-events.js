// variables
const contenedorEventos = document.getElementById("eventos");
const eventos = data.eventos;
let plantillaEvento = eventos.map(agregarEvento).join(" ");

// funcion para crear el article
function agregarEvento(evento) {
    const alt = evento.name.replace(/\s/g, `-`).toLowerCase();
    const fechaFiltro = data.fechaActual;
    if (evento.date < fechaFiltro){
        return `<article class="card bg-black col-10 col-md-3 height1 rounded-5">
                <img class="h-50 p-2 rounded-5" src="${evento.image}" class="card-img-top" alt="${alt}">
                <div class="d-flex justify-content-between flex-column card-body">
                    <h5 class="card-title fw-bold text-center">${evento.name}</h5>
                    <p class="card-text">${evento.description}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <p class="card-text fw-bold m-0">$${evento.price}</p>
                        <a class="btn-card fw-bold" href="../pages/details.html?id=${evento.date}">See more...</a>
                    </div>
                </div>
            </article>`;
    }
}

// mostrar en la pantalla
contenedorEventos.innerHTML = plantillaEvento;

// variables filtro por categoria
const contenedorCategorias = document.getElementById("categorias");
const categorias = data.eventos;
let plantillaCategoria = "";
let idCategoria = 1; // variable para id y for
const categoriasNoRepetidas = new Set();
categorias.forEach((evento) => {
    if (!categoriasNoRepetidas.has(evento.category)) {
        // si la categoría no está en el Set, agregarla y añadir su plantilla
        categoriasNoRepetidas.add(evento.category);
        plantillaCategoria += `<div class="m-2">
                            <input class="checkbox-categoria" onChange="filtrarPorCategorias()" type="checkbox" name="${evento.name}" value="${evento.category}" id="categoria-${idCategoria}" checked: "">
                            <label for="categoria-${idCategoria}">${evento.category}</label>
                        </div>`;
        idCategoria++; // aumenta el valor de idCategoria
    }
});

// funcion filtro por categoria
function filtrarPorCategorias() {
    const checkboxesCategorias = document.getElementsByClassName("checkbox-categoria");
    const categoriasSeleccionadas = [];
    for (let checkbox of checkboxesCategorias) {
        if (checkbox.checked) {
            categoriasSeleccionadas.push(checkbox.value);
        }
    }
    if (categoriasSeleccionadas.length === 0) {
        contenedorEventos.innerHTML = plantillaEvento;
    } else {
        const eventosFiltrados = eventos.filter(evento => categoriasSeleccionadas.includes(evento.category));
        const plantillaFiltrada = eventosFiltrados.map(agregarEvento).join(" ");
        contenedorEventos.innerHTML = plantillaFiltrada;
    }
}
// mostrar en la pantalla
contenedorCategorias.innerHTML = plantillaCategoria;


// variable filtro por buscador
const buscador = document.getElementById("buscador");
buscador.addEventListener("input", filtrarPorTexto);

// funcion filtrar por buscador
function filtrarPorTexto() {
    const textoBuscado = buscador.value.toLowerCase();
    const eventosFiltrados = eventos.filter(evento => evento.name.toLowerCase().includes(textoBuscado) || evento.description.toLowerCase().includes(textoBuscado));
    const plantillaFiltrada = eventosFiltrados.map(agregarEvento).join(" ");
    contenedorEventos.innerHTML = plantillaFiltrada;
}