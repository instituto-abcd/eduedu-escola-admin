// Utils & Aux:
import { useGetExamCharts } from "~/api/student";
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
import { Line } from "react-chartjs-2";
import { processChartData } from "~/utils/chartMap";

type componentProps = {
    studentId: string;
    maxWidth?: string;
}
export function ByExam({ studentId, maxWidth }: componentProps) {
    const theme = useMantineTheme();

    const { data: studentPerformanceByExam } = useGetExamCharts(
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

    const processedExamData = processChartData(studentPerformanceByExam?.datasets, theme);

    return (
        <Box mt={40}>
            <Title order={4} pb={20}>Desempenho do aluno por prova:</Title>

            {processedExamData &&
                <Line
                    options={options}
                    data={{ labels: studentPerformanceByExam?.labels, datasets: processedExamData }}
                    style={{ maxWidth: maxWidth ?? 'auto' }}
                />
            }
        </Box>
    )
}