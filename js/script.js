// DATOS DE EJEMPLO (hasta 2024, incluyendo los años del ejemplo)
const osData = {
    '2001': { Windows: 90, Linux: 5, macOS: 5 },
    '2005': { Windows: 85, Linux: 10, macOS: 5 },
    '2010': { Windows: 80, Linux: 12, macOS: 8 },
    '2020': { Windows: 75, Linux: 15, macOS: 10 },
    '2024': { Windows: 70, Linux: 18, macOS: 12 },
    '2025': { Windows: 75, Linux: 15, macOS: 10 }
    
};

// Configuración de colores para leyendas
const osConfig = {
    Windows: { color: 'rgba(0, 123, 255, 1)', label: 'Windows (%)' },
    Linux: { color: 'rgba(255, 193, 7, 1)', label: 'Linux (%)' },
    macOS: { color: 'rgba(108, 117, 125, 1)', label: 'macOS (%)' }
};

// Instancia del gráfico
const ctx = document.getElementById('osChart')?.getContext('2d');
let osChart;


//FUNCION PRICIPAL CREAR Y ACTUALIZAR GRAFICO 
function updateChart() {
    if (!ctx) return; // Salir si el canvas no se encuentra

    //Obtener los sistemas seleccionados
    const selectedSystems = [];
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {// script.js - Código / Buenas prácticas

// DATOS DE EJEMPLO
const osData = {
    '2001': { Windows: 90, Linux: 5, macOS: 5 },
    '2005': { Windows: 85, Linux: 10, macOS: 5 },
    '2010': { Windows: 80, Linux: 12, macOS: 8 },
    '2020': { Windows: 75, Linux: 15, macOS: 10 },
    '2024': { Windows: 70, Linux: 18, macOS: 12 },
    '2025': { Windows: 75, Linux: 15, macOS: 10 }
};

// Configuración de colores para leyendas claras (Estética / Usabilidad)
const osConfig = {
    Windows: { color: 'rgba(0, 123, 255, 1)', label: 'Windows (%)' },
    Linux: { color: 'rgba(255, 193, 7, 1)', label: 'Linux (%)' },
    macOS: { color: 'rgba(108, 117, 125, 1)', label: 'macOS (%)' }
};

// Referencia al canvas y variable para la instancia del gráfico
const ctx = document.getElementById('osChart')?.getContext('2d');
let osChart;

/**
 * Función principal para crear o actualizar el gráfico.
 * (Interacción y Funcionalidad, Datos/Visualización)
 */
function updateChart() {
    if (!ctx) return; // Salir si el canvas no se encuentra

    // 1. Obtener los sistemas seleccionados (1 a 3 sistemas)
    const selectedSystems = [];
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedSystems.push(checkbox.value);
        }
    });

    // Validación: debe haber al menos un sistema seleccionado
    if (selectedSystems.length === 0) {
        if (osChart) osChart.destroy();
        return; 
    }

    // 2. Obtener el tipo de gráfico
    const chartType = document.getElementById('chartType').value;

    // 3. Preparar los datasets para Chart.js
    const labels = Object.keys(osData);
    const datasets = selectedSystems.map(system => {
        const dataPoints = labels.map(year => osData[year][system]);
        const config = osConfig[system];

        return {
            label: config.label,
            data: dataPoints,
            backgroundColor: chartType === 'bar' ? config.color.replace(', 1)', ', 0.6)') : config.color,
            borderColor: config.color,
            borderWidth: chartType === 'line' ? 3 : 1,
            fill: false,
            tension: 0.4 
        };
    });

    // 4. Destruir el gráfico anterior si existe
    if (osChart) {
        osChart.destroy();
    }

    // 5. Crear el nuevo gráfico
    osChart = new Chart(ctx, {
        type: chartType, 
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolución del Porcentaje de Usuarios por Sistema Operativo'
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentaje de Usuarios (%)'
                    },
                    max: 100 
                },
                x: {
                    title: {
                        display: true,
                        text: 'Año'
                    }
                }
            }
        }
    });
}

// Escuchadores de Eventos para Interacción

// 1. Listener para el cambio de tipo de gráfico
document.getElementById('chartType')?.addEventListener('change', updateChart);

// 2. Listeners para los checkboxes de selección de sistemas
document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const checkedCount = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked').length;
        
        // Evitar que se deseleccione el último (asegura 1 a 3 sistemas)
        if (checkedCount === 0) {
            alert("Debes seleccionar al menos un sistema operativo.");
            e.target.checked = true; // Revertir la deselección
            return;
        }

        updateChart();
    });
});

// Inicializar el gráfico al cargar la página
window.onload = updateChart;
            selectedSystems.push(checkbox.value);
        }
    });

    // Validación: debe haber al menos un sistema seleccionado
    if (selectedSystems.length === 0) {
        if (osChart) osChart.destroy();
        return; 
    }

    // 2. Obtener el tipo de gráfico
    const chartType = document.getElementById('chartType').value;

    // 3. Preparar los datasets para Chart.js
    const labels = Object.keys(osData);
    const datasets = selectedSystems.map(system => {
        const dataPoints = labels.map(year => osData[year][system]);
        const config = osConfig[system];

        return {
            label: config.label,
            data: dataPoints,
            backgroundColor: chartType === 'bar' ? config.color.replace(', 1)', ', 0.6)') : config.color,
            borderColor: config.color,
            borderWidth: chartType === 'line' ? 3 : 1,
            fill: false,
            tension: 0.4 
        };
    });

    // 4. Destruir el gráfico anterior si existe
    if (osChart) {
        osChart.destroy();
    }

    // 5. Crear el nuevo gráfico
    osChart = new Chart(ctx, {
        type: chartType, 
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolución del Porcentaje de Usuarios por Sistema Operativo'
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentaje de Usuarios (%)'
                    },
                    max: 100 
                },
                x: {
                    title: {
                        display: true,
                        text: 'Año'
                    }
                }
            }
        }
    });
}

// Escuchadores de Eventos para Interacción

// 1. Listener para el cambio de tipo de gráfico
document.getElementById('chartType')?.addEventListener('change', updateChart);

// 2. Listeners para los checkboxes de selección de sistemas
document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const checkedCount = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked').length;
        
        // Evitar que se deseleccione el último (asegura 1 a 3 sistemas)
        if (checkedCount === 0) {
            alert("Debes seleccionar al menos un sistema operativo.");
            e.target.checked = true; // Revertir la deselección
            return;
        }

        updateChart();
    });
});

// Inicializar el gráfico al cargar la página
window.onload = updateChart;