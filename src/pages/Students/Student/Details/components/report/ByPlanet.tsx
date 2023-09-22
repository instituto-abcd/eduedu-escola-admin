// Utils & Aux:
import { useGetPlanetsCharts } from "~/api/student";
import { errorNotification } from "~/utils/errorNotification";

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
import { Line } from "react-chartjs-2";;

type componentProps = {
    studentId: string;
}
export function ByPlanet({ studentId }: componentProps) {
    const theme = useMantineTheme();

    const { data: studentPerformanceByPlanets } = useGetPlanetsCharts(
        studentId ?? "",
        {
            onError: (error) =>
                errorNotification("Erro durante a operação", error.message)
        }
    )

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

    studentPerformanceByPlanets?.datasets.forEach(element => {
        if (element.label == "Consciência Fonológica") {
            element.backgroundColor = theme.colors.cyan[3]
            element.borderColor = theme.colors.cyan[3]
        } else if (element.label == "Sistema de Escrita Alfabética") {
            element.backgroundColor = theme.colors.violet[2]
            element.borderColor = theme.colors.violet[2]
        } else {
            element.backgroundColor = theme.colors.orange[3]
            element.borderColor = theme.colors.orange[3]
        }
        element.yAxisID = 'y'
    });
    return (
        <Box mt={40}>
            <Title order={4} pb={20}>Desempenho do aluno por planeta:</Title>
            {
                studentPerformanceByPlanets &&
                <Line options={options} data={studentPerformanceByPlanets ?? [{ labels: [], datasets: [] }]} />
            }
        </Box>

    )
}