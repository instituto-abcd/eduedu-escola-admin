// Components:
import { Accordion, Box, Flex, Select, Stack, Text, useMantineTheme } from "@mantine/core";

// Charts:
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

// Stars:
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useGetExamsCharts, useGetPlanetsCharts } from "~/api/school-class";
import { errorNotification } from "~/utils/errorNotification";

type componentProps = {
    schoolClassId: string;
}
export function SchoolClassPerformanceBy({ schoolClassId }: componentProps) {
    const theme = useMantineTheme();

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

    const { data: schoolClassPerformanceByPlanets } = useGetPlanetsCharts(
        schoolClassId ?? "",
        {
            onError: (error) =>
                errorNotification("Erro durante a operação", error.message)
        }
    )

    const { data: schoolClassPerformanceByExams } = useGetExamsCharts(
        schoolClassId ?? "",
        {
            onError: (error) =>
                errorNotification("Erro durante a operação", error.message)
        }
    )

    schoolClassPerformanceByPlanets?.datasets.forEach(element => {
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

    schoolClassPerformanceByExams?.datasets.forEach(element => {
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
    return (
        <Accordion.Item value="schoolClassPerformanceBy">
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
                            Desempenho da turma por
                        </Text>
                        <Select
                            withinPortal
                            data={selectOptions}
                            value={performanceType}
                            style={{
                                width: '150px'
                            }}
                            onChange={(value) => setPerformanceType(value)}
                        />
                    </Flex>
                </Accordion.Control>

            </Box>

            <Accordion.Panel>
                <Flex>
                    {performanceType == "Planetas" &&
                        <Stack w={200}>
                            <Rating readOnly value={5} key={Math.random()} style={{ width: '150px' }} />
                            <Rating readOnly value={4} key={Math.random()} style={{ width: '150px' }} />
                            <Rating readOnly value={3} key={Math.random()} style={{ width: '150px' }} />
                            <Rating readOnly value={2} key={Math.random()} style={{ width: '150px' }} />
                            <Rating readOnly value={1} key={Math.random()} style={{ width: '150px' }} />
                            <Rating readOnly value={0} key={Math.random()} style={{ width: '150px' }} />
                        </Stack>
                    }

                    {performanceType == "Provas" &&
                        schoolClassPerformanceByExams &&
                        <Bar options={options} data={schoolClassPerformanceByExams} />
                    }

                    {performanceType == "Planetas" &&
                        schoolClassPerformanceByPlanets &&
                        <Bar options={options} data={schoolClassPerformanceByPlanets} />
                    }
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    )
}