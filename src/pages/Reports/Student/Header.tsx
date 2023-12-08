import { SCHOOL_GRADE, SCHOOL_PERIOD } from "~/constants";
import { Box, Flex, Grid, Image, Text, Title } from "@mantine/core";
import eduEduLogo from '~/assets/logos/eduedu-preta.svg'

type componentProps = {
    student: Array<{}>
}
export function HeaderReport({ student }: componentProps) {
    const { name, registry, schoolGrade, schoolClassName, schoolPeriod } = student || {};

    const InfoItem = ({ label, value }) => (
        <Grid.Col span="content">
            <Flex>
                <Text fz="sm" fw={600} pr={5}>{label}:</Text>
                <Text fz="sm">{value}</Text>
            </Flex>
        </Grid.Col>
    );

    return (
        <Grid columns={6} align="center" justify="space-between">
            <Grid.Col span={1}>
                <Image src={eduEduLogo} width={90} />
            </Grid.Col>

            <Grid.Col span={5} my="auto">
                <Box>
                    <Title order={3}>Relatório do estudante</Title>

                    <Grid pt={10}>
                        <InfoItem label="Nome" value={name} />
                        <InfoItem label="Matrícula" value={registry} />
                        <InfoItem label="Série" value={SCHOOL_GRADE[schoolGrade ?? "CHILDREN"]} />
                        <InfoItem label="Turma" value={schoolClassName} />
                        <InfoItem label="Período" value={SCHOOL_PERIOD[schoolPeriod ?? "FULL"]} />
                    </Grid>
                </Box>
            </Grid.Col>
        </Grid>
    )
}