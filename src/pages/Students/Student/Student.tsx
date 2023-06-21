import { Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { HorizontalRule } from "~/components/HorizontalRule";
import { PageHeader } from "~/components/PageHeader";

export function StudentPage() {
    return (
        <>
            <PageHeader title="Novo aluno" />
            <Grid columns={4}>
                <Grid.Col span={1}>
                    <TextInput
                        label="Nome"
                        placeholder="Nome"
                    />
                </Grid.Col>
                <Grid.Col span={1}>
                    <TextInput
                        label="Matrícula"
                        placeholder="Matrícula"
                    />
                </Grid.Col>
                <Grid.Col span={1}>
                    <Select
                        data={[]}
                        label="Período"
                        placeholder="Selecione"
                    />
                </Grid.Col>
                <Grid.Col span={1}>
                    <Select
                        data={[]}
                        label="Turma"
                        placeholder="Selecione"
                    />
                </Grid.Col>
            </Grid>
            <HorizontalRule />
            <Group position="right">
                <Link to="/alunos">
                    <Button variant="outline">
                        Cancelar
                    </Button>
                </Link>
                <Button
                    type="submit"
                    disabled
                >
                    Salvar
                </Button>
            </Group>
        </>
    )
}