import { Box, Flex, Grid, Image, Text, Title } from "@mantine/core";
import eduEduLogo from '~/assets/logos/eduedu-preta.svg'
import { SCHOOL_GRADE, SCHOOL_PERIOD } from "~/constants";

type componentProps = {
    student: Array<{}>
}
export function HeaderReport({ student }: componentProps) {
    return (
        <Grid columns={6}>
            {/* EduEdu Logo */}
            <Grid.Col span={1}>
                <Image src={eduEduLogo} width={90} />
            </Grid.Col>

            {/* Student Header Data */}
            <Grid.Col span={5} my="auto">
                <Box>
                    <Title order={3}>Relatório do estudante</Title>
                    <Grid pt={10}>
                        <Grid.Col span="content">
                            <Flex>
                                <Text fz="sm" fw={600} pr={5}>Nome:</Text>
                                <Text fz="sm">{student?.name}</Text>
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span="content">
                            <Flex>
                                <Text fz="sm" fw={600} pr={5}>Matrícula:</Text>
                                <Text fz="sm">{student?.registry}</Text>
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span="content">
                            <Flex>
                                <Text fz="sm" fw={600} pr={5}>Série:</Text>
                                <Text fz="sm">{SCHOOL_GRADE[student?.schoolGrade ?? "CHILDREN"]}</Text>
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span="content">
                            <Flex>
                                <Text fz="sm" fw={600} pr={5}>Turma:</Text>
                                <Text fz="sm">{student?.schoolClassName}</Text>
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span="content">
                            <Flex>
                                <Text fz="sm" fw={600} pr={5}>Período:</Text>
                                <Text fz="sm">{SCHOOL_PERIOD[student?.schoolPeriod ?? "FULL"]}</Text>
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </Box>
            </Grid.Col>
        </Grid>
    )
}