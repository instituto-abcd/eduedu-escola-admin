import { Accordion, ActionIcon, Box, Button, Flex, Select, Table, Text, useMantineTheme } from "@mantine/core";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export function PerformanceAtPlanets() {
    const theme = useMantineTheme();
    return (
        <Accordion.Item value="planetsPerformance">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Accordion.Control
                    style={{
                        color: theme.colors.indigo[9],
                        maxWidth: '83%'
                    }}
                >
                    <Flex align="center">
                        <Text pr={10}>Desempenho nos planetas disponibilizados após a prova realizada em</Text>
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
                <ActionIcon>
                    <Button
                        size="xs"
                        style={{
                            margin: '0 10px 0 0',
                            color: theme.colors.blue[6],
                            backgroundColor: theme.colors.blue[0],
                        }}
                    >
                        Liberar mais planetas
                    </Button>
                    <Button
                        size="xs"
                        style={{
                            color: theme.colors.blue[6],
                            backgroundColor: theme.colors.blue[0],
                        }}
                    >
                        Autorizar nova prova
                    </Button>
                </ActionIcon>

            </Box>

            <Accordion.Panel>
                <Table horizontalSpacing="sm" verticalSpacing="md">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Planetas Oferecidos</th>
                            <th>Planetas Realizados</th>
                            <th>Média Estrelas (Realizado)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: theme.colors.blue[6] }}>
                                Consciência Fonológica
                            </td>
                            <td>30</td>
                            <td>30</td>
                            <td>
                                <Rating readOnly value={2} key={Math.random()} style={{ width: '100px' }} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ color: theme.colors.blue[6] }}>
                                Sistema de Escrita Alfabética
                            </td>
                            <td>25</td>
                            <td>20</td>
                            <td>
                                <Rating readOnly value={3.5} key={Math.random()} style={{ width: '100px' }} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ color: theme.colors.blue[6] }}>
                                Leitura e Compreensão de Texto
                            </td>
                            <td>18</td>
                            <td>17</td>
                            <td>
                                <Rating readOnly value={4} key={Math.random()} style={{ width: '100px' }} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Accordion.Panel>
        </Accordion.Item>
    )
}