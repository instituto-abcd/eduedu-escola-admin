import { Grid, Group, Title, Text, Button } from "@mantine/core";
import { SCHOOL_GRADE } from "~/constants";
import { SchoolClassReport } from "../../Report/SchoolClassReport";
import { Print } from "~/utils/pdfDownload";

type componentProps = {
    schoolClass: Array<{}>
}
export function SchoolClassHeader({ schoolClass }: componentProps) {

    return (
        <Grid columns={5}>
            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Turma:</Title>
                    <Text>{schoolClass?.name}</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Série:</Title>
                    <Text>{SCHOOL_GRADE[schoolClass?.schoolGrade]}</Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Alunos:</Title>
                    <Text>
                        {schoolClass.studentsCount}
                    </Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Group>
                    <Title order={5}>Professor(es):</Title>
                    <Text>
                        {schoolClass.teachers &&
                            schoolClass.teachers.map((item) => (
                                item.name
                            ))
                        }
                    </Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Button onClick={Print}>Gerar relatório</Button>
                <div id='printablediv' style={{ display: 'none' }}>
                    <SchoolClassReport />
                </div>
            </Grid.Col>
        </Grid>
    )
}