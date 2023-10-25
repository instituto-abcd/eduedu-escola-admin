// Utils & Aux:
import { useGetPlanetsCharts } from "~/api/student";
import { errorNotification } from "~/utils/errorNotification";
import { processChartData } from "~/utils/chartMap";

// Components:
import { Box, Title, useMantineTheme } from "@mantine/core";

// Chart:
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
;

type componentProps = {
    studentId: string;
}
export function ByPlanet({ studentId }: componentProps) {
    const theme = useMantineTheme();
    const [studentPerformanceByPlanets, setStudentPerformanceByPlanets] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const data = await useGetPlanetsCharts(studentId);
                // setStudentPerformanceByPlanets(data);
            } catch (error) {
                errorNotification("Erro durante a operação", error.message);
            }
        };

        if (studentId) {
            fetchData();
        }
    }, [studentId]);

    if (!studentId) {
        return null; // Renderiza algo diferente ou apenas não renderiza nada enquanto studentId é nulo
    }

    // Graphic stuff:
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend
    );

    const options = {
        aspectRatio: 4,
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const processedPlanetsData = processChartData(studentPerformanceByPlanets?.datasets, theme);

    return (
        <Box mt={40}>
            <Title order={4} pb={20}>Desempenho do aluno por planeta:</Title>
            {processedPlanetsData &&
                <Line options={options} data={{ labels: studentPerformanceByPlanets?.labels, datasets: processedPlanetsData }} />
            }
        </Box>

    )
}