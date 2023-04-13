// Obtener el ID del evento de la URL
let urlParams = location.search
let params = new URLSearchParams(urlParams)
let id = params.get("id")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(data => {
        // Manipula los datos obtenidos de la API
        const eventoSeleccionado = data.events.find(evento => evento._id == id);

        const contenedorEventoSeleccionado = document.getElementById("evento-seleccionado");

        contenedorEventoSeleccionado.innerHTML = mostrarEventoSeleccionado(eventoSeleccionado);
    })
    .catch(error => {
        console.error(error);
    });

// Crear la plantilla HTML correspondiente con la información del evento
function mostrarEventoSeleccionado(eventoSeleccionado) {
    return `<div class="row g-0 m-3 align-items-center ">
    <div class="col-12 col-md-6 d-flex justify-content-center">
        <img src="${eventoSeleccionado.image}" class="height2 col-12 col-md-10 h-50 rounded-5" alt="${eventoSeleccionado.name}">
    </div>
    <div class="col-12 col-md-6">
        <div class="card-body">
            <h5 class="card-title text-center fw-bold">${eventoSeleccionado.name}</h5>
            <p class="card-text my-2"><span class="fw-bold">Date: </span>${eventoSeleccionado.date}</p>
            <p class="card-text my-2"><span class="fw-bold">Description: </span>${eventoSeleccionado.description}</p>
            <p class="card-text my-2"><span class="fw-bold">Category: </span>${eventoSeleccionado.category}</p>
            <p class="card-text my-2"><span class="fw-bold">Place: </span>${eventoSeleccionado.place}</p>
            <p class="card-text my-2"><span class="fw-bold">Capacity: </span>${eventoSeleccionado.capacity}</p>
            ${eventoSeleccionado.assistance ? `<p class="card-text my-2"><span class="fw-bold">Assistance:</span>${eventoSeleccionado.assistance}</p>` : ''}
            ${eventoSeleccionado.estimate ? `<p class="card-text my-2"><span class="fw-bold">Estimate: </span>${eventoSeleccionado.estimate}</p>` : ''}
            <p class="card-text my-2"><span class="fw-bold">Price: </span>$${eventoSeleccionado.price}</p>
        </div>
    </div>
</div>`
}