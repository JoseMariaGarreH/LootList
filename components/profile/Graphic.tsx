import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
    ratingsCount: number[];
};

export default function Graphic({ ratingsCount }: Props) {
    const data = {
        // Etiquetas para cada barra del gráfico, incluyendo medias estrellas
        labels: ['1★', '1.5★', '2★', '2.5★', '3★', '3.5★', '4★', '4.5★', '5★'],
        datasets: [
            {
                label: 'Tus valoraciones', // Nombre del dataset que aparece en la leyenda
                data: ratingsCount,        // Array con el número de valoraciones para cada estrella y media estrella
                backgroundColor: '#e63946', // Color de las barras
                borderRadius: 8,            // Bordes redondeados para las barras
            },
        ],
    };

    const options = {
        responsive: true, // El gráfico se adapta al tamaño del contenedor
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff', // Color del texto de la leyenda
                },
            },
            tooltip: {
                backgroundColor: '#1d3557', // Color de fondo del tooltip
                titleColor: '#ffffff',      // Color del título del tooltip
                bodyColor: '#ffffff',       // Color del texto del tooltip
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff', // Color de los labels del eje X
                },
                grid: {
                    color: '#457b9d', // Color de las líneas de la cuadrícula en X
                },
            },
            y: {
                beginAtZero: true, // El eje Y empieza en 0
                ticks: {
                    stepSize: 1,    // Incremento de 1 en el eje Y
                    color: '#ffffff', // Color de los labels del eje Y
                },
                grid: {
                    color: '#457b9d', // Color de las líneas de la cuadrícula en Y
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
}