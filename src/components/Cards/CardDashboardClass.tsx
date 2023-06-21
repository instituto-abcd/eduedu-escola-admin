import { Card, Flex, Stack, Group, Title, Accordion, Text, useMantineTheme, rem } from "@mantine/core";
import { IconFileDescription, IconPlus, IconUsers } from '@tabler/icons-react';

type componentProps = {
    className?: string;
    classNumber?: string;
    classesQuantity?: string;
    studentsQuantity?: string;
    teachersQuantity?: string;
    children?: any;
};

export function CardDashboardClass({ classNumber, className, classesQuantity, studentsQuantity, teachersQuantity, children }: componentProps) {
    const theme = useMantineTheme();

    return (
        <Card>
            <Card.Section>
                <Title
                    order={4}
                    weight={400}
                    mb={20}
                    color={theme.colors.blue[9]}
                >
                    {className}
                </Title>

                <Flex justify={'space-between'} mb={20}>
                    <Stack>
                        <Text size="sm" color="dimmed">Turmas</Text>
                        <Text weight={600}>{classesQuantity}</Text>
                    </Stack>

                    <Stack>
                        <Text size="sm" color="dimmed">Alunos</Text>
                        <Text weight={600}>{studentsQuantity}</Text>
                    </Stack>

                    <Stack>
                        <Text size="sm" color="dimmed">Professores</Text>
                        <Text weight={600}>{teachersQuantity}</Text>
                    </Stack>
                </Flex>

                <Accordion
                    chevron={<IconPlus size="1rem" />}
                    chevronPosition="left"
                    styles={{
                        control: {
                            backgroundColor: `${theme.colors.blue[0]}`,
                            color: theme.colors.blue[6],
                            border: 'none',
                            borderRadius: '12px',
                            '&[data-active]': {
                                backgroundColor: theme.colors.blue[6],
                                color: "#fff"
                            },
                        },
                        chevron: {
                            '&[data-rotate]': {
                                transform: 'rotate(45deg)',
                            },
                        },
                    }}
                >
                    <Accordion.Item value="customization">
                        <Accordion.Control>
                            <Flex justify={"space-between"}>
                                <small>{classNumber}</small>

                                <Flex>
                                    {studentsQuantity}
                                    <IconUsers size="1rem" />
                                </Flex>
                            </Flex>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Group mt={20}>
                                <Text fz="sm" fw={700}>Desempenho em Provas (%)</Text>
                                <Text fz="sm" c="dimmed">
                                    Consc. Fonológica
                                    <span style={{ color: theme.colors.orange[4] }}> 85%</span>
                                </Text>
                                <Text fz="sm" c="dimmed">
                                    Sistema de Escrita Alfab.
                                    <span style={{ color: theme.colors.green[9] }}> 90%</span>
                                </Text>
                                <Text fz="sm" c="dimmed">
                                    Leitura e Comp. de Texto
                                    <span style={{ color: theme.colors.red[9] }}> 63%</span>
                                </Text>
                            </Group>

                            <Group style={{ marginTop: '20px' }}>
                                <Text fz="sm" fw={700}>Desempenho em Planetas (%)</Text>
                                <Text fz="sm" c="dimmed">
                                    Consc. Fonológica
                                    <span style={{ color: theme.colors.orange[4] }}>  85%</span>
                                </Text>
                                <Text fz="sm" c="dimmed">
                                    Sistema de Escrita Alfab.
                                    <span style={{ color: theme.colors.green[9] }}> 90%</span>
                                </Text>
                                <Text fz="sm" c="dimmed">
                                    Leitura e Comp. de Texto
                                    <span style={{ color: theme.colors.red[9] }}> 63%</span>
                                </Text>
                            </Group>

                            <Flex style={{ marginTop: '20px' }}>
                                <Text c="blue.6">Mais Detalhes da Turma</Text>
                                <IconFileDescription style={{ color: theme.colors.blue[6] }} />
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Card.Section>
        </Card>
    )
}