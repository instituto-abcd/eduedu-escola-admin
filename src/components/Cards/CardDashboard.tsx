import { Grid, Group, Card, Select, TextInput, Title } from "@mantine/core";

export function CardDashboard() {
    return (
        <Card mb={20}>
            <Card.Section>
                <Grid columns={4}>
                    <Grid.Col span={1}>
                        <Group>
                            <Title order={4}>Ano Letivo</Title>
                            <Select
                                style={{ width: '120px' }}
                                placeholder="Selecione"
                                data={[
                                    { value: '2023', label: '2023' },
                                    { value: '2022', label: '2022' },
                                    { value: '2021', label: '2021' },
                                    { value: '2020', label: '2020' },
                                ]}
                            />
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Group>
                            <Title order={4}>Professores</Title>
                            <TextInput
                                style={{ width: '60px' }}
                                placeholder="50"
                                disabled
                            />
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Group>
                            <Title order={4}>Turmas</Title>
                            <TextInput
                                style={{ width: '60px' }}
                                placeholder="20"
                                disabled
                            />
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Group>
                            <Title order={4}>Alunos</Title>
                            <TextInput
                                style={{ width: '60px' }}
                                placeholder="100"
                                disabled
                            />
                        </Group>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    )
}