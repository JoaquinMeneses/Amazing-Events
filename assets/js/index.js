// variables
const contenedor = document.getElementById("eventos");
const eventos = data.eventos;
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
                        <a class="btn-card fw-bold" href="./assets/pages/details.html">See more...</a>
                    </div>
                </div>
            </article>`;
}

contenedor.innerHTML = card;

/* Plantilla de card
<article class="card bg-black col-10 col-md-3 rounded-5">
    <img class="h-50 p-2 rounded-5" src="" class="card-img-top" alt="">
    <div class="d-flex justify-content-between flex-column card-body">
        <h5 class="card-title fw-bold text-center"></h5>
        <p class="card-text"></p>
        <div class="d-flex justify-content-between align-items-baseline">
            <p class="card-text fw-bold">$</p>
            <a class="btn-card fw-bold" href="./assets/pages/details.html">Ver más...</a>    
            </div>
    </div>
</article>
*/
/* Elementos para trabajar
    image
    name
    description
    price
 */