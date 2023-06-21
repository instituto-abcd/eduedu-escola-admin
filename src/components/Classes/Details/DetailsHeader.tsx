import { Button, Grid, Group, Select, Title, Text } from "@mantine/core";

export function DetailsHeader() {
    return (
        <Grid columns={6}>
            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Turma:</Title>
                    <Select
                        data={[]}
                        placeholder="Pesquisar"
                        searchable
                    />
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Série:</Title>
                    <Text>1º Ano Fund. 1</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Alunos:</Title>
                    <Text>40</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Frequência:</Title>
                    <Text>85%</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Professor(es):</Title>
                    <Text>Márcia, Lucas, Pedro</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Button>Gerar relatório</Button>
            </Grid.Col>
        </Grid>
    )
}