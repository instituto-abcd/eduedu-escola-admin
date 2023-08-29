import { Grid, Group, Title, Text, Button } from "@mantine/core";
import { SCHOOL_GRADE } from "~/constants";

type componentProps = {
    schoolClass: Array<{}>
}
export function SchoolClassHeader({ schoolClass }: componentProps) {
    console.log('children:\n', schoolClass)
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
                        {/* TODO: get students quantity */}
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
                {/* TODO: implement this endpoint */}
                <Button>Gerar relatório</Button>
            </Grid.Col>
        </Grid>
    )
}