import { Grid, Group, Card, Select, TextInput, Title, Text, Stack } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetBySchoolYear } from "~/api/dashboard";
import { useSchoolYearGetAll } from "~/api/school-year";
import { PATH } from "~/constants/path";
import { useUserStore } from "~/stores/user";

export function CardDashboard({ getReportData }) {
    const userProfile = useUserStore((u) => u.profile)
    const isTeacher = () => { return userProfile === "TEACHER" ? false : true }

    const params = useParams();

    const [schoolYear, setSchoolYear] = useState(params.year);

    const { data: years, isLoading: isLoadingYears } = useSchoolYearGetAll({
        pageSize: 999,
        onSuccess(data) {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];

                if (element.status == 'ACTIVE') {
                    setSchoolYear(element.name)
                }

            }
        }
    });

    const shouldEnabled = Boolean(schoolYear);

    const { data: schoolYearReport } = useGetBySchoolYear(schoolYear,
        {
            enabled: shouldEnabled,
            onSuccess(data) {
                getReportData(data);
            },
            onError: (error) => {
                errorNotification("Erro", error.message)
            }
        }
    );

    return (
        <Card mb={20}>
            <Card.Section p={20}>
                <Grid columns={4}>
                    {years?.length == 0 &&
                        <Grid.Col span={4}>
                            <Stack align="center">
                                <Text>Sem ano letivo cadastrado. Clique no link abaixo para cadastrar um ano letivo:</Text>
                                <Link
                                    to={PATH.SCHOOL_YEAR}
                                    style={{ textDecoration: 'none' }}
                                >
                                    Cadastrar Ano Letivo
                                </Link>
                            </Stack>
                        </Grid.Col>
                    }

                    {years?.length > 0 &&
                        <>
                            {!!isTeacher &&
                                <Grid.Col span={1}>
                                    <Group>
                                        <Title order={4}>Ano Letivo</Title>
                                        <Select
                                            withinPortal
                                            maw={120}
                                            placeholder={params.year ?? (schoolYear ?? 'Selecione')}
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
                                            onChange={(value) => { setSchoolYear(value) }}
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
                        </>
                    }
                </Grid>
            </Card.Section>
        </Card>
    )
}