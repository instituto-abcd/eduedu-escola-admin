import { Accordion, Box, Center, Flex, Select, Stack, Text, useMantineTheme } from "@mantine/core";

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
import { useState } from "react";

// Stars:
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { errorNotification } from "~/utils/errorNotification";
import { useGetExamCharts, useGetPlanetsCharts } from "~/api/student";

type componentProps = {
    studentId: string;
}

export function StudentPerformanceBy({ studentId }: componentProps) {
    const theme = useMantineTheme();

    const { data: studentPerformanceByExam } = useGetExamCharts(
        studentId ?? "",
        {
            onError: (error) =>
                errorNotification("Erro durante a operação", error.message)
        }
    )

    const { data: studentPerformanceByPlanets } = useGetPlanetsCharts(
        studentId ?? "",
        {
            onError: (error) =>
                errorNotification("Erro durante a operação", error.message)
        }
    )

    const [performanceType, setPerformanceType] = useState('Provas');
    const selectOptions = [
        {
            label: 'Provas',
            value: 'Provas'
        },
        {
            label: 'Planetas',
            value: 'Planetas'
        }
    ]

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

    const processChartData = (datasets) => {
        if (!datasets) return [];

        return datasets.map(element => {
            const colorMapping = {
                "Consciência Fonológica": theme.colors.cyan[3],
                "Sistema de Escrita Alfabética": theme.colors.violet[2],
            };

            const backgroundColor = colorMapping[element.label] || theme.colors.orange[3];
            const borderColor = colorMapping[element.label] || theme.colors.orange[3];

            return {
                ...element,
                backgroundColor,
                borderColor,
                yAxisID: 'y'
            };
        });
    };

    const processedExamData = processChartData(studentPerformanceByExam?.datasets);
    const processedPlanetsData = processChartData(studentPerformanceByPlanets?.datasets);

    return (
        <Accordion.Item value="studentPerformanceBy">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Accordion.Control
                    style={{
                        maxWidth: '85%'
                    }}
                >
                    <Flex align="center">
                        <Text
                            color={theme.colors.indigo[9]}
                            pr={10}
                        >
                            Desempenho do aluno por
                        </Text>
                        <Select
                            withinPortal
                            data={selectOptions}
                            value={performanceType}
                            style={{
                                width: '150px'
                            }}
                            onChange={(value) => setPerformanceType(value)}
                            onClick={event => event.stopPropagation()}
                        />
                    </Flex>
                </Accordion.Control>

            </Box>

            <Accordion.Panel>
                <Center>
                    {performanceType == "Planetas" &&
                        processedPlanetsData &&
                        <Flex>
                            <Stack pr={10}>
                                <Rating readOnly value={5} key={Math.random()} style={{ width: '100px' }} />
                                <Rating readOnly value={4} key={Math.random()} style={{ width: '100px' }} />
                                <Rating readOnly value={3} key={Math.random()} style={{ width: '100px' }} />
                                <Rating readOnly value={2} key={Math.random()} style={{ width: '100px' }} />
                                <Rating readOnly value={1} key={Math.random()} style={{ width: '100px' }} />
                            </Stack>
                            <div className="chart-container" style={{ position: 'relative', height: 'auto', width: '60vw' }}>
                                <Line options={options} data={{ labels: studentPerformanceByPlanets?.labels, datasets: processedPlanetsData }} />
                            </div>
                        </Flex>
                    }

                    {performanceType == "Provas" &&
                        processedExamData &&
                        <div className="chart-container" style={{ position: 'relative', height: 'auto', width: '70vw' }}>
                            <Line options={options} data={{ labels: studentPerformanceByExam?.labels, datasets: processedExamData }} />
                        </div>
                    }
                </Center>
            </Accordion.Panel>
        </Accordion.Item>
    )
}