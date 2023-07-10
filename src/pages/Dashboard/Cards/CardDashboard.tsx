import { Grid, Group, Card, Select, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBySchoolYear } from "~/api/dashboard";
import { useSchoolYearGetAll } from "~/api/school-year";
import { useUserStore } from "~/stores/user";

export function CardDashboard({ getReportData }) {
    const userProfile = useUserStore((u) => u.profile)
    const isTeacher = () => { return userProfile === "TEACHER" ? false : true }

    const params = useParams();
    const { data: years, isLoading: isLoadingYears } = useSchoolYearGetAll({ pageSize: 999 });
    const [schoolYear, setSchoolYear] = useState(params.year ?? '')
    const { data: schoolYearReport } = useGetBySchoolYear(schoolYear);
    getReportData(schoolYearReport)

    return (
        <Card mb={20}>
            <Card.Section p={20}>
                <Grid columns={4}>
                    {!!isTeacher &&
                        <Grid.Col span={1}>
                            <Group>
                                <Title order={4}>Ano Letivo</Title>
                                <Select
                                    maw={120}
                                    placeholder={params.year ?? 'Selecione'}
                                    data={
                                        isLoadingYears
                                            ? [
                                                {
                                                    value: '',
                                                    label: "Carregando...",
                                                },
                                            ]
                                            : years?.map(({ name }) => ({
                                                label: name.toString(),
                                                value: name.toString(),
                                            })) ?? []
                                    }
                                    onChange={(value) => {
                                        setSchoolYear(value)
                                    }}
                                />
                            </Group>
                        </Grid.Col>
                    }
                    {!!isTeacher &&
                        <Grid.Col span={1}>
                            <Group>
                                <Title order={4}>Professores</Title>
                                <TextInput
                                    maw={60}
                                    placeholder={schoolYearReport?.teachersCounter}
                                    disabled
                                />
                            </Group>
                        </Grid.Col>
                    }
                    <Grid.Col span={1}>
                        <Group>
                            <Title order={4}>Turmas</Title>
                            <TextInput
                                maw={60}
                                placeholder={schoolYearReport?.schoolClassesCounter}
                                disabled
                            />
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Group>
                            <Title order={4}>Alunos</Title>
                            <TextInput
                                maw={60}
                                placeholder={schoolYearReport?.studentsCounter}
                                disabled
                            />
                        </Group>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    )
}