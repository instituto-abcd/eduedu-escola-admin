import { Accordion, Text, Flex, Divider, useMantineTheme } from "@mantine/core";

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
                            <>
                                <Text>{item.axisName}: <span style={{ color: `${item.color}` }}>{item.description}</span></Text>
                                {(i + 1) != performanceByArea.length &&
                                    <Divider orientation="vertical" variant="solid" />
                                }
                            </>
                        ))
                    }
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    )
}