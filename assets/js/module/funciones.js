export function agregarEvento(eventos, urlDetails) {
    const alt = eventos.name.replace(/\s/g, "-").toLowerCase();
    return `<div class="card bg-black col-10 col-md-3 height1 rounded-5">
                <img class="h-50 p-2 rounded-5" src="${eventos.image}" class="card-img-top" alt="${alt}">
                <div class="d-flex flex-column justify-content-around card-body">
                    <h5 class="card-title fw-bold text-center">${eventos.name}</h5>
                    <p class="card-text">${eventos.description}</p>
                    <div class="d-flex justify-content-around align-items-baseline">
                        <p class="card-text fw-bold m-0">$${eventos.price}</p>
                        <a class="btn-card fw-bold" href="${urlDetails}?id=${eventos._id}">See more...</a>
                    </div>
                </div>
            </div>`;
}

export function imprimirCategorias(eventos, contenedor) {
    eventos.sort();
    let plantillaCategorias = "";
    for (let categoria of eventos) {
        plantillaCategorias += `<div class="d-flex align-items-center">
                                    <input class="form-check-input m-2" type="checkbox" name="${categoria}" value="${categoria}">
                                    <label class="form-check-label m-2" for="${categoria}">${categoria}</label>
                                </div>`;
    }
    contenedor.innerHTML = plantillaCategorias;
}

export function filtrarPorCategoria(eventos, categorias){
    if ( categorias.length === 0 ){
        return eventos
    }else{
        return eventos.filter( eventos => categorias.includes(eventos.category) );
    }
}

export function buscadorDeTexto(eventos, texto){
    if (!texto){
        return eventos;
    }else{
        let textoMin = texto.toLowerCase();
        return eventos.filter( evento => evento.name.toLowerCase().includes(textoMin) || evento.description.toLowerCase().includes(textoMin) )
    }
}

export function imprimirEventos(eventos,contenedor){
    if (eventos.length === 0){
        contenedor.innerHTML = `<div class="bg-black col-10 col-md-3 rounded-4">
                                    <div class="d-flex justify-content-between flex-column card-body">
                                        <h5 class="card-title text-light fw-bold text-center p-3">There are no events to show</h5>
                                    </div>
                                </div>`;
    }else{
        let evento = eventos.map(agregarEvento).join(" ")
        contenedor.innerHTML = evento;
    }
}