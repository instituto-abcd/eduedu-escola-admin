import { Accordion, Text, Flex, Divider, useMantineTheme } from "@mantine/core";

export function PerformancePerArea() {
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
                    <Text>Consciência Fonológica: 38% Muito abaixo</Text>
                    <Divider orientation="vertical" variant="solid" />
                    <Text>Sistema de Escrita Alfabética: 53% Abaixo</Text>
                    <Divider orientation="vertical" variant="solid" />
                    <Text>Leitura e Compreensão de Texto: 71% Abaixo</Text>
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    )
}