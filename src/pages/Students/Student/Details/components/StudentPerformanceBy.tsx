import { Accordion, Box, Flex, Select, Stack, Text, useMantineTheme } from "@mantine/core";

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
import { monthsAbbreviation } from "~/constants";

// Stars:
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export function StudentPerformanceBy() {
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
    // TODO: get real data when backend is finished
    const PhonologicalAwarenessData = [
        {
            month: "Jan",
            testValue: 60,
        },
        {
            month: "Fev",
            testValue: 74,
        },
        {
            month: "Mar",
            testValue: 77,
        },
        {
            month: "Abr",
            testValue: 80,
        },
        {
            month: "Jun",
            testValue: 73,
        },
        {
            month: "Jul",
            testValue: 85,
        },
        {
            month: "Ago",
            testValue: 85,
        },
        {
            month: "Set",
            testValue: 85,
        },
        {
            month: "Out",
            testValue: 80,
        },
        {
            month: "Nov",
            testValue: 87,
        },
        {
            month: "Dez",
            testValue: 90,
        },
    ]
    const AlphabeticWritingSystem = [
        {
            month: "Jan",
            testValue: 30,
        },
        {
            month: "Fev",
            testValue: 60,
        },
        {
            month: "Mar",
            testValue: 70,
        },
        {
            month: "Abr",
            testValue: 80,
        },
        {
            month: "Jun",
            testValue: 70,
        },
        {
            month: "Jul",
            testValue: 80,
        },
        {
            month: "Ago",
            testValue: 90,
        },
        {
            month: "Set",
            testValue: 85,
        },
        {
            month: "Out",
            testValue: 95,
        },
        {
            month: "Nov",
            testValue: 100,
        },
        {
            month: "Dez",
            testValue: 100,
        },
    ]
    const TextReadingAndComprehension = [
        {
            month: "Jan",
            testValue: 70,
        },
        {
            month: "Fev",
            testValue: 70,
        },
        {
            month: "Mar",
            testValue: 75,
        },
        {
            month: "Abr",
            testValue: 80,
        },
        {
            month: "Jun",
            testValue: 75,
        },
        {
            month: "Jul",
            testValue: 85,
        },
        {
            month: "Ago",
            testValue: 90,
        },
        {
            month: "Set",
            testValue: 85,
        },
        {
            month: "Out",
            testValue: 95,
        },
        {
            month: "Nov",
            testValue: 100,
        },
        {
            month: "Dez",
            testValue: 100,
        },
    ]

    const [testsData, setTestsData] = useState({
        labels: monthsAbbreviation,
        datasets: [
            {
                label: "Consciência Fonológica",
                data: PhonologicalAwarenessData.map((data) => data.testValue),
                borderColor: theme.colors.cyan[3],
                backgroundColor: theme.colors.cyan[3],
                yAxisID: 'y',
            },
            {
                label: "Sistema de Escrita Alfabética",
                data: AlphabeticWritingSystem.map((data) => data.testValue),
                borderColor: theme.colors.violet[2],
                backgroundColor: theme.colors.violet[2],
                yAxisID: 'y',
            },
            {
                label: "Leitura e Compreensão de Texto",
                data: TextReadingAndComprehension.map((data) => data.testValue),
                borderColor: theme.colors.orange[3],
                backgroundColor: theme.colors.orange[3],
                yAxisID: 'y',
            },
        ],
    });

    return (
        <Accordion.Item value="studentPerformanceBy">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Accordion.Control
                    style={{
                        color: theme.colors.indigo[9],
                        maxWidth: '85%'
                    }}
                >
                    <Flex align="center">
                        <Text pr={10}>Desempenho do aluno por</Text>
                        <Select
                            withinPortal
                            data={[]}
                            placeholder="Pesquisar"
                            searchable
                            style={{
                                width: '150px'
                            }}
                        />
                    </Flex>
                </Accordion.Control>

            </Box>

            <Accordion.Panel>
                <Flex>
                    <Stack w={200}>
                        <Rating readOnly value={5} key={Math.random()} style={{ width: '150px' }} />
                        <Rating readOnly value={4} key={Math.random()} style={{ width: '150px' }} />
                        <Rating readOnly value={3} key={Math.random()} style={{ width: '150px' }} />
                        <Rating readOnly value={2} key={Math.random()} style={{ width: '150px' }} />
                        <Rating readOnly value={1} key={Math.random()} style={{ width: '150px' }} />
                    </Stack>
                    <Line options={options} data={testsData} />
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    )
}