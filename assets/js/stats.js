const tabla = document.getElementById("tabla");
const eventosPasados = [];
const eventosFuturos = [];

for (let evento of data.eventos) {
    if (new Date(evento.date) < new Date(data.fechaActual)) {
        eventosPasados.push(evento);
    } else {
        eventosFuturos.push(evento);
    }
}

tabla.innerHTML = mostrarTabla(eventosPasados, eventosFuturos);

function mostrarTabla(eventosPasados, eventosFuturos) {
    let tabla = `<table>
                <tbody>
                    <tr class="fw-bold">
                        <th colspan="3">Events statistics</th>
                    </tr>
                    <tr class="fw-bold">
                        <td>Events with the highest percentage of attendance</td>
                        <td>Events with the lowest percentage of attendance</td>
                        <td>Event with larger capacity</td>
                    </tr>
                    <tr>
                        <td>${calcularEventoMayorAsistencia(data)}</td>
                        <td>${calcularEventoMenorAsistencia(data)}</td>
                        <td>${calcularEventoMayorCapacidad(data)}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <th colspan="3">Upcoming events statistics by category</th>
                    </tr>
                    <tr>
                        <td>Categories</td>
                        <td>Revenues</td>
                        <td>Percentage of attendance</td>
                    </tr>`;
                    
    // Objeto para realizar seguimiento de ingresos totales por categoría
    const ingresosPorCategoria = {};
    const asistenciaPasados = {};
    const asistenciaFuturos = {};

    for (let evento of eventosFuturos) {
        if (ingresosPorCategoria[evento.category]) {
            ingresosPorCategoria[evento.category] += evento.estimate * evento.price; // Actualizar ingresos totales por categoría
        } else {
            ingresosPorCategoria[evento.category] = evento.estimate * evento.price;
        }
        asistenciaFuturos[evento.name] = (evento.estimate / evento.capacity) * 100; // Calcular porcentaje de asistencia a eventos futuros
        tabla += `<tr>
                    <td>${evento.category}</td>
                    <td>${evento.estimate * evento.price}</td>
                    <td>${asistenciaFuturos[evento.name].toFixed(2)}%</td>
                </tr>`;
    }
    
    tabla += `
                </tbody>
                <tbody>
                    <tr>
                        <th colspan="3">Past events statistics by category</th>
                    </tr>
                    <tr>
                        <td>Categories</td>
                        <td>Revenues</td>
                        <td>Percentage of attendance</td>
                    </tr>`;

                    for (let evento of eventosPasados) {
                        if (ingresosPorCategoria[evento.category]) {
                            ingresosPorCategoria[evento.category] += evento.assistance * evento.price; // Actualizar ingresos totales por categoría
                        } else {
                            ingresosPorCategoria[evento.category] = evento.assistance * evento.price;
                        }
                    
                        for (let categoria in ingresosPorCategoria) {
                            console.log(`Categoría: ${categoria}, Ingresos: $${ingresosPorCategoria[categoria]}`);
                        }
                        asistenciaPasados[evento.name] = (evento.assistance / evento.capacity) * 100; // Calcular porcentaje de asistencia a eventos pasados
                        tabla += `<tr>
                                    <td>${evento.category}</td>
                                    <td>${evento.assistance * evento.price}</td>
                                    <td>${asistenciaPasados[evento.name].toFixed(2)}%</td>
                                </tr>`;
                    }
    tabla += `</tbody>
            </table>`;
    return tabla;
}

function calcularEventoMayorAsistencia(data) {
    let mayorAsistencia = 0;
    let eventoMayorAsistencia = null;
    for (let evento of data.eventos) {
        if (evento.assistance > mayorAsistencia) {
            mayorAsistencia = evento.assistance;
            eventoMayorAsistencia = evento;
        }
    }
    const porcentajeAsistencia = (mayorAsistencia / eventoMayorAsistencia.capacity) * 100; // Calcular porcentaje de asistencia
    return `${eventoMayorAsistencia.name} with: ${porcentajeAsistencia.toFixed(2)}%`;
}


function calcularEventoMenorAsistencia(data) {
    let menorAsistencia = Infinity;
    let eventoMenorAsistencia = null;
    for (let evento of data.eventos) {
        if (evento.assistance < menorAsistencia) {
            menorAsistencia = evento.assistance;
            eventoMenorAsistencia = evento;
        }
    }
    const porcentajeAsistencia = (menorAsistencia / eventoMenorAsistencia.capacity) * 100; // Calcular porcentaje de asistencia
    return `${eventoMenorAsistencia.name} with: ${porcentajeAsistencia.toFixed(2)}%`;
}

function calcularEventoMayorCapacidad(data) {
    let mayorCapacidad = 0;
    let eventoMayorCapacidad = null;
    for (let evento of data.eventos) {
        if (evento.capacity > mayorCapacidad) {
            mayorCapacidad = evento.capacity;
            eventoMayorCapacidad = evento;
        }
    }
    return `${eventoMayorCapacidad.name} with: ${mayorCapacidad}`;
}