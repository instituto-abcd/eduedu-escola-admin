// Components:
import { Accordion, Box, Center, Flex, Select, Stack, Text, useMantineTheme } from "@mantine/core";

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
import { processChartData } from "~/utils/chartMap";

type componentProps = {
    schoolClassId: string;
}
export function SchoolClassPerformanceBy({ schoolClassId }: componentProps) {
    const theme = useMantineTheme();
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

    const processedExamData = processChartData(schoolClassPerformanceByExams?.datasets, theme);
    const processedPlanetsData = processChartData(schoolClassPerformanceByPlanets?.datasets, theme);

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
                display: true,
            }
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true, 
                position: 'left' as const,
                max: performanceType === 'Provas' ? 100 : 5,
                min: performanceType === 'Provas' ? 0 : 0,
                ticks: {
                    stepSize: performanceType === 'Provas' ? 20 : 1
                }
            },
        },
    };
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
                            onClick={event => event.stopPropagation()}
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
                <Center>
                    {performanceType == "Planetas" &&
                        processedPlanetsData &&
                        <Flex style={{width: '100%'}}>
                            <Stack pr={5} mt={15} p={5} style={{gap:16}}>
                                <Rating readOnly value={5} key={Math.random()} style={{ width: '100px' }} />
                                <Rating readOnly value={4} key={Math.random()} style={{ width: '100px' }} />
                                <Rating readOnly value={3} key={Math.random()} style={{ width: '100px' }} />
                                <Rating readOnly value={2} key={Math.random()} style={{ width: '100px' }} />
                                <Rating readOnly value={1} key={Math.random()} style={{ width: '100px' }} />
                                <Rating readOnly value={0} key={Math.random()} style={{ width: '100px' }} />
                            </Stack>
                            <div className="chart-container" style={{ position: 'relative', height: 'auto', width: '100%' }}>
                                <Bar options={options} data={{ labels: schoolClassPerformanceByPlanets?.labels, datasets: processedPlanetsData }} />
                            </div>
                        </Flex>
                    }

                    {performanceType == "Provas" &&
                        processedExamData &&
                        <Bar options={options} data={{ labels: schoolClassPerformanceByExams?.labels, datasets: processedExamData }} />
                    }
                </Center>
            </Accordion.Panel>
        </Accordion.Item>
    )
}