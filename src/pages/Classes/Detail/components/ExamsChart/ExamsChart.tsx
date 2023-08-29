import { Accordion, Box, Flex, Text } from "@mantine/core";
import { Chart } from "./Chart";

type componentProps = {
    schoolClassExamsChart: Array<[]>;
}
export function ExamsChart({ schoolClassExamsChart }: componentProps) {
    return (
        <Accordion.Item value="testResultsHistory">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Accordion.Control style={{ width: '40%' }}>
                    Histórico de Resultado de Provas
                </Accordion.Control>
                <Flex>
                    <Box style={{ display: 'flex' }}>
                        <Box style={{ width: '20px', height: '20px', backgroundColor: '#66d9e8', margin: '0 5px 0 15px' }}></Box>
                        <Text fz="sm">Consciência fonológica</Text>
                    </Box>
                    <Box style={{ display: 'flex' }}>
                        <Box style={{ width: '20px', height: '20px', backgroundColor: '#d0bfff', margin: '0 5px 0 15px' }}></Box>
                        <Text fz="sm">Sistema de Escrita Alfabética</Text>
                    </Box>
                    <Box style={{ display: 'flex' }}>
                        <Box style={{ width: '20px', height: '20px', backgroundColor: '#ffc078', margin: '0 5px 0 15px' }}></Box>
                        <Text fz="sm">Leitura e Compreensão de Texto</Text>
                    </Box>
                </Flex>
            </Box>
            <Accordion.Panel>
                <Chart schoolClassExamsChart={schoolClassExamsChart} />
            </Accordion.Panel>
        </Accordion.Item>
    )
}