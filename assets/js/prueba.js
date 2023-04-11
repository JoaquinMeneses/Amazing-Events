const eventosPasados = [];
const eventosFuturos = [];

for (let evento of data.eventos) {
    if (new Date(evento.date) < new Date(data.fechaActual)) {
        eventosPasados.push(evento);
    } else {
        eventosFuturos.push(evento);
    }
}
console.log(eventosPasados);
console.log(eventosFuturos);



function calcularEventoMayorAsistencia(data) {
    let mayorAsistencia = 0;
    let eventoMayorAsistencia = null;
    for (let evento of data.eventos) {
        if (evento.assistance > mayorAsistencia) {
            mayorAsistencia = evento.assistance;
            eventoMayorAsistencia = evento;
        }
    }
    return eventoMayorAsistencia.name; // Sacar el nombre del evento
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
    return eventoMenorAsistencia.name; // Sacar el nombre del evento
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
    return eventoMayorCapacidad.name; // Sacar el nombre del evento
}

function calcularGananciasEventosPasados(eventosPasados) {
    const ingresosPorCategoria = {};
    for (let evento of eventosPasados) {
        if (ingresosPorCategoria[evento.category]) {
            ingresosPorCategoria[evento.category] += evento.assistance * evento.price; // Actualizar ingresos totales por categoría
        } else {
            ingresosPorCategoria[evento.category] = evento.assistance * evento.price;
        }
    console.log(ingresosPorCategoria);
    }
    return ingresosPorCategoria;
}

function calcularGananciasEventosFuturos(eventosFuturos) {
    const ingresosPorCategoria = {};
    for (let evento of eventosFuturos) {
        if (ingresosPorCategoria[evento.category]) {
            ingresosPorCategoria[evento.category] += evento.estimate * evento.price; // Actualizar ingresos totales por categoría
        } else {
            ingresosPorCategoria[evento.category] = evento.estimate * evento.price;
        }
    }
    return ingresosPorCategoria;
}

function calcularPorcentajeAsistenciaPasados(eventosPasados) {
    const porcentajeAsistenciaPasados = {};
    for (let evento of eventosPasados) {
        if (evento.assistance && evento.capacity) {
            const porcentaje = (evento.assistance / evento.capacity) * 100; // Calcular porcentaje de asistencia para eventos pasados
            porcentajeAsistenciaPasados[evento.category] = porcentaje.toFixed(2);
        }
    }
    return porcentajeAsistenciaPasados;
}

function calcularPorcentajeAsistenciaFuturos(eventosFuturos) {
    const porcentajeAsistenciaFuturos = {};
    for (let evento of eventosFuturos) {
        if (evento.estimate && evento.capacity) {
            const porcentaje = (evento.estimate / evento.capacity) * 100; // Calcular porcentaje de asistencia para eventos futuros
            porcentajeAsistenciaFuturos[evento.category] = porcentaje.toFixed(2);
        }
    }
    return porcentajeAsistenciaFuturos;
}

const mayorAsistencia = calcularEventoMayorAsistencia(data);
const menorAsistencia = calcularEventoMenorAsistencia(data);
const mayorCapacidad = calcularEventoMayorCapacidad(data);
const gananciasPasados = calcularGananciasEventosPasados(eventosPasados);
const gananciasFuturos = calcularGananciasEventosFuturos(eventosFuturos);
const asistenciaPasados = calcularPorcentajeAsistenciaPasados(eventosPasados);
const asistenciaFuturos = calcularPorcentajeAsistenciaFuturos(eventosFuturos);

console.log(mayorAsistencia);
console.log(menorAsistencia);
console.log(mayorCapacidad);
console.log(gananciasPasados);
console.log(gananciasFuturos);
console.log(asistenciaPasados);
console.log(asistenciaFuturos);

const tabla = document.getElementById("tabla");

tabla.innerHTML = mostrarLista();

function mostrarLista() {
    return `
        <table>
            <tbody>
                <tr>
                    <th colspan="3">Events statistics</th>
                </tr>
                <tr>
                    <td>Event with the highest percentage of attendance</td>
                    <td>Event with the lowest percentage of attendance</td>
                    <td>Event with larger capacity</td>
                </tr>
                <tr>
                    <td>${mayorAsistencia}</td>
                    <td>${menorAsistencia}</td>
                    <td>${mayorCapacidad}</td>
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
                </tr>
                <tr>
                    <td>${gananciasFuturos}</td>
                    <td>${gananciasFuturos}</td>
                    <td>${gananciasFuturos}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <th colspan="3">Past events statistics by category</th>
                </tr>
                <tr>
                    <td>Categories</td>
                    <td>Revenues</td>
                    <td>Percentage of attendance</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    `;
}