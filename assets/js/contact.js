document.addEventListener("DOMContentLoaded", function() {
    var mensajeEnviadoMostrado = false; // Variable para llevar el seguimiento de si el mensaje ya se ha mostrado
    var mensajeErrorMostrado = false; // Variable para llevar el seguimiento de si el mensaje de error ya se ha mostrado

    document.getElementById("enviar-mensaje").addEventListener("click", function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Verificar si los campos están completados
        var nombre = document.getElementById("nombre").value;
        var email = document.getElementById("email").value;
        var mensaje = document.getElementById("mensaje").value;

        if (nombre !== "" && email !== "" && mensaje !== "") {
            // Aquí puedes realizar cualquier lógica de envío del formulario

            // Crear elemento de mensaje de "Mensaje enviado"
            var mensajeEnviado = document.createElement("div");
            mensajeEnviado.innerHTML = "Mensaje enviado";
            mensajeEnviado.className = "mensaje-enviado"; // Agregar clase para estilos CSS

            // Agregar el elemento de mensaje de "Mensaje enviado" al DOM
            var contenedorFormulario = document.getElementsByClassName("contenedor form-contact")[0];
            contenedorFormulario.appendChild(mensajeEnviado);

            // Marcar que el mensaje ya se ha mostrado
            mensajeEnviadoMostrado = true;

            // Limpiar el formulario después de mostrar el mensaje
            document.getElementById("nombre").value = "";
            document.getElementById("email").value = "";
            document.getElementById("mensaje").value = "";

            // Eliminar el mensaje de error si se ha mostrado
            if (mensajeErrorMostrado) {
                var mensajeError = document.getElementsByClassName("mensaje-error")[0];
                contenedorFormulario.removeChild(mensajeError);
                mensajeErrorMostrado = false;
            }
        } else {
            // Verificar si el mensaje de error ya se ha mostrado
            if (!mensajeErrorMostrado) {
                // Crear elemento de mensaje de error
                var mensajeError = document.createElement("div");
                mensajeError.innerHTML = "Por favor complete todos los campos antes de enviar el mensaje.";
                mensajeError.className = "mensaje-error"; // Agregar clase para estilos CSS

                // Agregar el elemento de mensaje de error al DOM
                var contenedorFormulario = document.getElementsByClassName("contenedor form-contact")[0];
                contenedorFormulario.appendChild(mensajeError);

                // Marcar que el mensaje de error ya se ha mostrado
                mensajeErrorMostrado = true;
            }
        }
    });
});
