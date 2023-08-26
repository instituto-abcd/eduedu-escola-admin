import { Accordion, Text, Flex, Divider, Box, useMantineTheme } from "@mantine/core";

type componentProps = {
    performanceByArea: Array<{}>;
}

export function PerformancePerArea({ performanceByArea }: componentProps) {
    const theme = useMantineTheme();
    return (
        <Accordion.Item value="performancePerArea">
            <Accordion.Control
                style={{
                    color: theme.colors.indigo[9],
                    maxWidth: '85%'
                }}
            >
                <Text>Desempenho do aluno por área</Text>
            </Accordion.Control>

            <Accordion.Panel>
                <Flex justify="space-around">
                    {performanceByArea &&
                        performanceByArea.map((item, i) => (
                            <Box key={item?.axisCode}>
                                <Text>{item?.axisName}: <span style={{ color: `${item?.color}` }}>{item?.description}</span></Text>
                                {(i + 1) != performanceByArea.length &&
                                    <Divider orientation="vertical" variant="solid" />
                                }
                            </Box>
                        ))
                    }
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    )
}