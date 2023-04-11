// Obtener el ID del evento de la URL
let urlParams = location.search
let params = new URLSearchParams(urlParams)
let id = params.get("id")

const eventoSeleccionado = data.eventos.find(evento => evento.name === id)

const contenedorEventoSeleccionado = document.getElementById("evento-seleccionado")

contenedorEventoSeleccionado.innerHTML = mostrarEventoSeleccionado(eventoSeleccionado)

// Crear la plantilla HTML correspondiente con la información del evento
function mostrarEventoSeleccionado(eventoSeleccionado) {
    return `<div class="row g-0 m-3 align-items-center ">
                <div class="col-12 col-md-6 d-flex justify-content-center">
                    <img src="${eventoSeleccionado.image}" class="height2 col-12 col-md-10 h-50 rounded-5" alt="${eventoSeleccionado.name}">
                </div>
                <div class="col-12 col-md-6">
                    <div class="card-body">
                        <h5 class="card-title text-center fw-bold">${eventoSeleccionado.name}</h5>
                        <p class="card-text">Date: ${eventoSeleccionado.date}</p>
                        <p class="card-text">Description: ${eventoSeleccionado.description}</p>
                        <p class="card-text">Category: ${eventoSeleccionado.category}</p>
                        <p class="card-text">Place: ${eventoSeleccionado.place}</p>
                        <p class="card-text">Capacity: ${eventoSeleccionado.capacity}</p>
                        ${eventoSeleccionado.assistance ? `<p class="card-text">Assistance: ${eventoSeleccionado.assistance}</p>` : ''}
                        ${eventoSeleccionado.estimate ? `<p class="card-text">Estimate: ${eventoSeleccionado.estimate}</p>` : ''}
                        <p class="card-text">Price: $${eventoSeleccionado.price}</p>
                    </div>
                </div>
            </div>`
}