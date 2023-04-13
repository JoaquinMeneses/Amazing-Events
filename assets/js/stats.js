const contenedorTabla = document.getElementById("tabla");

fetch('https://mindhub-xj03.onrender.com/api/amazing') // Reemplazar con la URL de la API real
    .then(response => response.json()) // Analizar la respuesta como JSON
    .then(data => {
        // Manipula los datos obtenidos de la API
        const contenedorTabla = document.getElementById("tabla");
        const eventosPasados = [];
        const eventosFuturos = [];

        for (let evento of data.events) {
            if (new Date(evento.date) < new Date(data.currentDate)) {
                eventosPasados.push(evento);
            } else {
                eventosFuturos.push(evento);
            }
        }

        contenedorTabla.innerHTML = mostrarTabla();

        function mostrarTabla() {
            let tabla = ""
            return tabla = `<table>
                                <tbody>
                                    <tr>
                                        <th colspan="3">Events statistics</th>
                                    </tr>
                                    <tr>
                                        <td>Events with the highest percentage of attendance</td>
                                        <td>Events with the lowest percentage of attendance</td>
                                        <td>Events with larger capacity</td>
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
                                    </tr>
                                    ${agregarEstadisticasProximosEventosPorCategoria(data)}
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
                                    ${agregarEstadisticasPasadosEventosPorCategoria(data)}
                                </tbody>
                            </table>`
        }
        
        function calcularEventoMayorAsistencia(data) {
            let mayorPorcentajeAsistencia = 0;
            let eventoMayorAsistencia = null;
            for (let evento of data.events) {
                const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;
                if (porcentajeAsistencia > mayorPorcentajeAsistencia) {
                    mayorPorcentajeAsistencia = porcentajeAsistencia;
                    eventoMayorAsistencia = evento;
                }
            }
            return `${eventoMayorAsistencia.name} with: ${mayorPorcentajeAsistencia.toFixed(2)}%`;
        }
        
        function calcularEventoMenorAsistencia(data) {
            let menorPorcentajeAsistencia = Infinity;
            let eventoMenorAsistencia = null;
            for (let evento of data.events) {
                const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;
                if (porcentajeAsistencia < menorPorcentajeAsistencia) {
                    menorPorcentajeAsistencia = porcentajeAsistencia;
                    eventoMenorAsistencia = evento;
                }
            }
            return `${eventoMenorAsistencia.name} with: ${menorPorcentajeAsistencia.toFixed(2)}%`;
        }
        
        function calcularEventoMayorCapacidad(data) {
            let mayorCapacidad = 0;
            let mayorEstimateAssistance = 0;
            let eventoMayorCapacidad = null;
            for (let evento of data.events) {
                let capacidad;
                if (evento.type === "past") {
                    capacidad = evento.assistance;
                } else {
                    capacidad = evento.estimate;
                }
                if (capacidad > mayorCapacidad) {
                    mayorCapacidad = capacidad;
                    mayorEstimateAssistance = capacidad;
                    eventoMayorCapacidad = evento;
                } else if (capacidad === mayorCapacidad) {
                    if (capacidad === evento.estimate || capacidad === evento.assistance) {
                        mayorEstimateAssistance = capacidad;
                        eventoMayorCapacidad = evento;
                    }
                }
            }
            return `${eventoMayorCapacidad.name} with: ${mayorEstimateAssistance}`;
        }
        
        function agregarEstadisticasProximosEventosPorCategoria(data) {
            let estadisticas = "";
            const categorias = [];
            const ingresosPorCategoria = [];
            const porcentajeAsistenciaPorCategoria = [];
            // Obtener categorías únicas
            for (let evento of eventosFuturos) {
                if (!categorias.includes(evento.category)) {
                    categorias.sort().push(evento.category);
                }
            }
            // Calcular ingresos y porcentaje de asistencia por categoría
            for (let categoria of categorias) {
                let ingresos = 0;
                let asistenciaTotal = 0;
                let capacidadTotal = 0;
                for (let evento of eventosFuturos) {
                    if (evento.category === categoria) {
                        ingresos += evento.price * evento.estimate;
                        asistenciaTotal += evento.estimate;
                        capacidadTotal += evento.capacity;
                    }
                }
                const porcentajeAsistencia = (asistenciaTotal / capacidadTotal) * 100;
                ingresosPorCategoria.push(ingresos);
                porcentajeAsistenciaPorCategoria.push(porcentajeAsistencia.toFixed(2));
            }
            // Crear filas de la tabla con las estadísticas por categoría
            for (let i = 0; i < categorias.length; i++) {
                estadisticas += `
                    <tr>
                        <td>${categorias[i]}</td>
                        <td>$${ingresosPorCategoria[i]}</td>
                        <td>${porcentajeAsistenciaPorCategoria[i]}%</td>
                    </tr>
                `;
            }
            return estadisticas;
        }
        
        function agregarEstadisticasPasadosEventosPorCategoria(data) {
            let estadisticas = "";
            const categorias = [];
            const ingresosPorCategoria = [];
            const porcentajeAsistenciaPorCategoria = [];
            // Obtener categorías únicas
            for (let evento of eventosPasados) {
                if (!categorias.includes(evento.category)) {
                    categorias.sort().push(evento.category);
                }
            }
            // Calcular ingresos y porcentaje de asistencia por categoría
            for (let categoria of categorias) {
                let ingresos = 0;
                let asistenciaTotal = 0;
                let capacidadTotal = 0;
                for (let evento of eventosPasados) {
                    if (evento.category === categoria) {
                        ingresos += evento.price * evento.assistance;
                        asistenciaTotal += evento.assistance;
                        capacidadTotal += evento.capacity;
                    }
                    }
                    const porcentajeAsistencia = (asistenciaTotal / capacidadTotal) * 100;
                    ingresosPorCategoria.push(ingresos);
                    porcentajeAsistenciaPorCategoria.push(porcentajeAsistencia.toFixed(2));
                }
            // Crear filas de la tabla con las estadísticas por categoría
            for (let i = 0; i < categorias.length; i++) {
                estadisticas += `
                    <tr>
                        <td>${categorias[i]}</td>
                        <td>$${ingresosPorCategoria[i]}</td>
                        <td>${porcentajeAsistenciaPorCategoria[i]}%</td>
                    </tr>
                `;
            }
            return estadisticas;
        }
    })
    .catch(error => {
        console.error(error);
    });