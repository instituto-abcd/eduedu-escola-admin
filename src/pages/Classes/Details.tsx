import { Accordion, Button, Flex, Select, useMantineTheme, Table, Divider } from "@mantine/core";
import { IconPlus, } from "@tabler/icons-react";
import { DetailsHeader } from "~/components/Classes/Details/DetailsHeader";
import { StudentsPerformance, TestPerformance, TestResultsHistory } from "~/components/Classes/Details/TestsPerformance";


export function DetailsPage() {
    const theme = useMantineTheme()

    return (
        <>
            <DetailsHeader />

            <Accordion
                variant="separated"
                chevron={<IconPlus size="1rem" />}
                chevronPosition="left"
                styles={{
                    chevron: {
                        '&[data-rotate]': {
                            transform: 'rotate(45deg)',
                        },
                    }
                }}
            >
                <Accordion.Item value="testPerformance">
                    <Accordion.Control
                        style={{
                            color: theme.colors.indigo[9]
                        }}
                    >
                        <Flex justify="space-between">
                            Desempenho em Provas
                            <Button
                                size="xs"
                                style={{
                                    color: theme.colors.blue[6],
                                    backgroundColor: theme.colors.blue[0]
                                }}>
                                Alunos que não precisam de reforço
                            </Button>
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Flex justify="space-between">
                            <TestPerformance examType="Consciência Fonológica" />
                            <Divider orientation="vertical" />
                            <TestPerformance examType="Sistema de Escrita Alfabética" />
                            <Divider orientation="vertical" />
                            <TestPerformance examType="Leitura e Compreensão de Texto" />
                        </Flex>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="planetsPerformance">
                    <Accordion.Control>
                        Desempenho em Planetas
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Table horizontalSpacing="sm" verticalSpacing="md">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Planetas Oferecidos</th>
                                    <th>Planetas Realizados</th>
                                    <th>Média Estrelas</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ color: theme.colors.blue[6] }}>Consciência Fonológica</td>
                                    <td>30</td>
                                    <td>30</td>
                                    <td>
                                        {/* TODO: estrelinhas aqui */}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ color: theme.colors.blue[6] }}>Sistema de Escrita Alfabética</td>
                                    <td>25</td>
                                    <td>20</td>
                                    <td>
                                        {/* TODO: estrelinhas aqui */}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ color: theme.colors.blue[6] }}>Leitura e Compreensão de Texto</td>
                                    <td>18</td>
                                    <td>17</td>
                                    <td>
                                        {/* TODO: estrelinhas aqui */}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="testResultsHistory">
                    <Accordion.Control>
                        Histórico de Resultado de Provas
                    </Accordion.Control>
                    <Accordion.Panel>
                        <TestResultsHistory />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="studentsPerformance">
                    <Accordion.Control>
                        <Flex>
                            Desempenho de Alunos por &nbsp;
                            <Select
                                style={{ width: '100px' }}
                                data={[]} />
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <StudentsPerformance />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </>
    )
}