// variables de eventos
const contenedorEventos = document.getElementById("eventos");
const eventos = data.eventos;
let plantillaEvento = eventos.map(agregarEvento).join(" ");

// funcion para crear el evento
function agregarEvento(evento) {
    const alt = evento.name.replace(/\s/g, `-`).toLowerCase();
    return `<article class="card bg-black col-10 col-md-3 height1 rounded-5">
                <img class="h-50 p-2 rounded-5" src="${evento.image}" class="card-img-top" alt="${alt}">
                <div class="d-flex justify-content-between flex-column card-body">
                    <h5 class="card-title fw-bold text-center">${evento.name}</h5>
                    <p class="card-text">${evento.description}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <p class="card-text fw-bold m-0">$${evento.price}</p>
                        <a class="btn-card fw-bold" href="./assets/pages/details.html">See more...</a>
                    </div>
                </div>
            </article>`;
}

// mostrar en la pantalla
contenedorEventos.innerHTML = plantillaEvento;

// variables de categorias
const contenedorCategorias = document.getElementById("categorias");
const categorias = data.eventos;
const categoriasNoRepetidas = new Set();
let plantillaCategoria = "";
let idCategoria = 1; // variable para id y for de los elementos

// crear etiquetas
categorias.forEach((evento) => {
    if (!categoriasNoRepetidas.has(evento.category)) {
        // si la categoría no está en el Set, agregarla y añadir su plantilla
        categoriasNoRepetidas.add(evento.category);
        plantillaCategoria += `<div class="m-2">
                            <input class="checkbox-categoria" onChange="filtrarPorCategorias()" type="checkbox" name="${evento.name}" value="${evento.category}" id="categoria-${idCategoria}" checked: "">
                            <label for="categoria-${idCategoria}">${evento.category}</label>
                        </div>`;

        idCategoria++; // incrementar el valor de idCategoria
    }
});

// mostrar en la pantalla
contenedorCategorias.innerHTML = plantillaCategoria;

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