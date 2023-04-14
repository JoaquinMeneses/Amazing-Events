const contenedorTabla = document.getElementById("tabla");

fetch('https://mindhub-xj03.onrender.com/api/amazing') // Reemplazar con la URL de la API real
    .then(response => response.json()) // Analizar la respuesta como JSON
    .then(data => {
        // Manipula los datos obtenidos de la API
        const contenedorTabla = document.getElementById("tabla");

        const eventosPasados = data.events.filter(evento =>(evento.date) <(data.currentDate));
        const eventosFuturos = data.events.filter(evento =>(evento.date) >(data.currentDate));


        contenedorTabla.innerHTML = mostrarTabla();

        function mostrarTabla() {
            let tabla = ""
            return tabla = `<table>
                                <tbody>
                                    <tr>
                                        <th colspan="3">Events statistics</th>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold">Events with the highest percentage of attendance</td>
                                        <td class="fw-bold">Events with the lowest percentage of attendance</td>
                                        <td class="fw-bold">Events with larger capacity</td>
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
                                        <td class="fw-bold">Categories</td>
                                        <td class="fw-bold">Revenues</td>
                                        <td class="fw-bold">Percentage of attendance</td>
                                    </tr>
                                    ${agregarEstadisticasProximosEventosPorCategoria(data)}
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th colspan="3">Past events statistics by category</th>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold">Categories</td>
                                        <td class="fw-bold">Revenues</td>
                                        <td class="fw-bold">Percentage of attendance</td>
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
            let eventoMayorCapacidad = null;
            for (let evento of data.events) {
                if (evento.capacity > mayorCapacidad) {
                    mayorCapacidad = evento.capacity;
                    eventoMayorCapacidad = evento;
                }
            }
            return `${eventoMayorCapacidad.name} with: ${mayorCapacidad}`;
        }
        
        function agregarEstadisticasProximosEventosPorCategoria(data) {
            let estadisticas = "";
            const categorias = new Set();
            const estadisticasPorCategoria = {};
            
            // Obtener categorías únicas
            for (let evento of eventosFuturos) {
                categorias.add(evento.category);
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
                estadisticasPorCategoria[categoria] = {
                    ingresos: ingresos,
                    porcentajeAsistencia: porcentajeAsistencia.toFixed(2)
                };
            }
            
            // Crear la tabla con las estadísticas por categoría
            for (let categoria of categorias) {
                estadisticas += `
                    <tr>
                        <td>${categoria}</td>
                        <td>$${estadisticasPorCategoria[categoria].ingresos}</td>
                        <td>${estadisticasPorCategoria[categoria].porcentajeAsistencia}%</td>
                    </tr>
                `;
            }
            
            return estadisticas;
        }
        
        function agregarEstadisticasPasadosEventosPorCategoria(data) {
            let estadisticas = "";
            const categorias = new Set();
            const estadisticasPorCategoria = {};
            
            // Obtener categorías únicas
            for (let evento of eventosPasados) {
                categorias.add(evento.category);
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
                estadisticasPorCategoria[categoria] = {
                    ingresos: ingresos,
                    porcentajeAsistencia: porcentajeAsistencia.toFixed(2)
                };
            }
            
            // Crear la tabla con las estadísticas por categoría
            for (let categoria of categorias) {
                estadisticas += `
                    <tr>
                        <td>${categoria}</td>
                        <td>$${estadisticasPorCategoria[categoria].ingresos}</td>
                        <td>${estadisticasPorCategoria[categoria].porcentajeAsistencia}%</td>
                    </tr>
                `;
            }
            
            return estadisticas;
        }
    })
    .catch(error => {
        console.error(error);
    });