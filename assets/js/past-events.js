// variables
const contenedor = document.getElementById("eventos");
const eventos = filtrarEventos(data.eventos);
let card = eventos.map(agregarEvento).join(" ");

// funcion para crear el article
function agregarEvento(evento) {
    const alt = evento.name.replace(/\s/g, `-`).toLowerCase();
    return `<article class="card bg-black col-10 col-md-3 height1 rounded-5">
                <img class="h-50 p-2 rounded-5" src="${evento.image}" class="card-img-top" alt="${alt}">
                <div class="d-flex justify-content-between flex-column card-body">
                    <h5 class="card-title fw-bold text-center">${evento.name}</h5>
                    <p class="card-text">${evento.description}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <p class="card-text fw-bold m-0">$${evento.price}</p>
                        <a class="btn-card fw-bold" href="../pages/details.html">See more...</a>
                    </div>
                </div>
            </article>`;
}

// funcion para filtrar por fecha
function filtrarEventos(arrayEventos) {
    const fechaFiltro = data.fechaActual;
    return arrayEventos.filter((evento) => evento.date < fechaFiltro);
}

// mostrar en la pantalla
contenedor.innerHTML = card;