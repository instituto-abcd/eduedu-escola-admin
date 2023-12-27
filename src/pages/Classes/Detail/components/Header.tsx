import { Grid, Group, Title, Text, Button, Flex } from "@mantine/core";
import { SCHOOL_GRADE } from "~/constants";
import { SchoolClassReport } from "../../../Reports/SchoolClass/SchoolClassReport";
import { Print } from "~/utils/pdfDownload";
import { Link } from "react-router-dom";
import { PATH } from "~/constants/path";

type componentProps = {
    schoolClass: Array<{}>
}
export function SchoolClassHeader({ schoolClass }: componentProps) {

    return (
        <Grid columns={5} justify="space-between" align="center">
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
                            )).join(', ')
                        }
                    </Text>
                </Group>
            </Grid.Col>

            <Grid.Col span={1}>
                <Flex justify="flex-end">
                    <Link
                        to={`${PATH.REPORTS}/turma/${schoolClass.id}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button>Gerar relatório</Button>
                    </Link>
                </Flex>
            </Grid.Col>
        </Grid>
    )
}