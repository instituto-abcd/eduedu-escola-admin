import { Grid, Group, Card, Select, TextInput, Title } from "@mantine/core";
import { useUserStore } from "~/stores/user";

export function CardDashboard() {
    const userProfile = useUserStore((u) => u.profile)
    const isTeacher = () => { return userProfile === "TEACHER" ? false : true }
    return (
        <Card mb={20}>
            <Card.Section p={20}>
                <Grid columns={4}>
                    {!isTeacher &&
                        <Grid.Col span={1}>
                            <Group>
                                <Title order={4}>Ano Letivo</Title>
                                <Select
                                    maw={120}
                                    placeholder="Selecione"
                                    data={[
                                        { value: '2023', label: '2023' },
                                        { value: '2022', label: '2022' },
                                        { value: '2021', label: '2021' },
                                        { value: '2020', label: '2020' },
                                    ]}
                                />
                            </Group>
                        </Grid.Col>
                    }
                    {!isTeacher &&
                        <Grid.Col span={1}>
                            <Group>
                                <Title order={4}>Professores</Title>
                                <TextInput
                                    maw={60}
                                    placeholder="50"
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
                                placeholder="20"
                                disabled
                            />
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Group>
                            <Title order={4}>Alunos</Title>
                            <TextInput
                                maw={60}
                                placeholder="100"
                                disabled
                            />
                        </Group>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    )
}