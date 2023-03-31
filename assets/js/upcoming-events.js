// variables
const contenedor = document.getElementById("eventos")
const eventos = filtrarEventos (data.eventos)
let card = ``

// funcion para crear el article
function agregarEventoHtml(evento) {
    // variable para crear un alt usando la variable name del objeto
    let alt = evento.name.replace(` `,`-`)
    return `<article class="card bg-black col-10 col-md-3 rounded-5">
                <img class="h-50 p-2 rounded-5" src="${evento.image}" class="card-img-top" alt="${alt}">
                <div class="d-flex justify-content-between flex-column card-body">
                    <h5 class="card-title fw-bold text-center">${evento.name}</h5>
                    <p class="card-text">${evento.description}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <p class="card-text fw-bold">$${evento.price}</p>
                        <a class="btn-card fw-bold" href="./details.html">Ver más...</a>    
                    </div>
                </div>
            </article>`
}

// funcion para filtrar por fecha
function filtrarEventos(arrayEventos) {
    const fechaFiltro = data.fechaActual
    const eventosFiltrados = []
    for (let evento of arrayEventos) {
        if (evento.date >= fechaFiltro) { 
        eventosFiltrados.push(evento)
        }
    }
    return eventosFiltrados
}

// funcion para mostrar en la pantalla
for (let evento of eventos) {
    card += agregarEventoHtml(evento)
}
contenedor.innerHTML = card; 