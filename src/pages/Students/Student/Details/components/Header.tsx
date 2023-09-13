import { Button, Grid, Group, Title, Text } from "@mantine/core";
import { SCHOOL_GRADE, SCHOOL_PERIOD } from "~/constants";
import { StudentReport } from "./report";

type componentProps = {
    student: Array<{}>;
    detailedSummary: Array<{}>;
}

export function HeaderStudent({ student, detailedSummary }: componentProps) {

    const Print = () => {
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

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

            <Grid.Col span={5}>
                <Button onClick={Print}>Gerar relatório</Button>
                <div id='printablediv' style={{ display: 'none' }}>
                    <StudentReport
                        student={student}
                        detailedSummary={detailedSummary}
                    />
                </div>
            </Grid.Col>
        </Grid>
    )
}