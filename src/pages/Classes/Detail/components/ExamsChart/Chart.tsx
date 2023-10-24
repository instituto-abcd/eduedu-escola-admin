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
import { useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";

type componentProps = {
    schoolClassExamsChart: Array<{}>
}

export function Chart({ schoolClassExamsChart }: componentProps) {

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
                display: false
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

    const [examsChart, setExamsChart] = useState({
        labels: schoolClassExamsChart?.labels ?? [],
        datasets: schoolClassExamsChart?.datasets ?? []
    });

    useEffect(() => {
        setExamsChart({
            labels: schoolClassExamsChart?.labels ?? [],
            datasets: schoolClassExamsChart?.datasets ?? []
        });
    }, [schoolClassExamsChart]);

    return (
        <Box>
            {examsChart.datasets.length !== 0 &&
                <div className="chart-container" style={{ position: 'relative', height: '35vh', width: '70vw' }}>
                    <Line options={options} data={examsChart} />
                </div>
            }
            {!examsChart.datasets.length &&
                <Text my={20} align="center">Sem dados registrados em Histórico de Resultado de Provas.</Text>
            }
        </Box>
    )
}