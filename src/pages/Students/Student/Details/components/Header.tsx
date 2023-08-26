import { Button, Grid, Group, Title, Text } from "@mantine/core";

export function HeaderStudent() {
    return (
        <Grid columns={6} align="center">
            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Amanda Freitas Dias</Title>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Matrícula</Title>
                    <Text>123456789</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Série:</Title>
                    <Text>2º Ano Fund</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Turma:</Title>
                    <Text>2º C</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Período</Title>
                    <Text>Manhã</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Button>Gerar relatório</Button>
            </Grid.Col>
        </Grid>
    )
}