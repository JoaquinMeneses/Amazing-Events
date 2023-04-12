document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtiene los valores del formulario
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("mensagge").value;

    // Aquí puedes realizar cualquier otra acción con los valores del formulario, como enviarlos a un servidor mediante AJAX

    // Muestra el mensaje de confirmación
    var mensajeElemento = document.getElementById("mensaje");
    mensajeElemento.innerHTML = `<div class="bg-black col-10 col-md-3 rounded-4">
                                    <div class="d-flex justify-content-between flex-column card-body">
                                        <h5 class="card-title text-light fw-bold text-center p-3">There are no events to show</h5>
                                    </div>
                                </div>`;
    mensajeElemento.style.display = "block";
});