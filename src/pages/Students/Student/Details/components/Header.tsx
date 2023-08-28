import { Button, Grid, Group, Title, Text } from "@mantine/core";
import { useStudentGetOne } from "~/api/student";
import { SCHOOL_GRADE, SCHOOL_PERIOD } from "~/constants";
import { errorNotification } from "~/utils/errorNotification";

type componentProps = {
    studentId: string;
}

export function HeaderStudent({ studentId }: componentProps) {

    const { data: student } = useStudentGetOne(studentId ?? "", {
        onError: (error) =>
            errorNotification("Erro ao obter aluno", error.message)
    
    });

    return (
        <Grid columns={6} align="center">
            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>{student?.name}</Title>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Matrícula:</Title>
                    <Text>{student?.registry}</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Série:</Title>
                    <Text>{SCHOOL_GRADE[student?.schoolGrade ?? "CHILDREN"]}</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Turma:</Title>
                    <Text>{student?.schoolClassName}</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Período</Title>
                    <Text>{SCHOOL_PERIOD[student?.schoolPeriod ?? "FULL"]}</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Button>Gerar relatório</Button>
            </Grid.Col>
        </Grid>
    )
}