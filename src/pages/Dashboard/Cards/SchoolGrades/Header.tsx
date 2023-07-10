import { Flex, Stack, Title, Text, useMantineTheme } from "@mantine/core";
import { SCHOOL_GRADE } from "~/constants";

type componentsProps = {
    schoolGrade: any;
}

export function Header({ schoolGrade }: componentsProps) {
    const theme = useMantineTheme();

    return (
        <>
            <Title order={4} weight={400} mb={20} color={theme.colors.blue[9]}>
                {SCHOOL_GRADE[schoolGrade.name]}
            </Title>

            <Flex justify={"space-between"} mb={20}>
                <Stack spacing={3} align="center">
                    <Text size="sm" color="dimmed">
                        Turmas
                    </Text>
                    <Text weight={600}>{schoolGrade.schoolClassesCounter}</Text>
                </Stack>
                <Stack spacing={3} align="center">
                    <Text size="sm" color="dimmed">
                        Alunos
                    </Text>
                    <Text weight={600}>{schoolGrade.studentsCounter}</Text>
                </Stack>
                <Stack spacing={3} align="center">
                    <Text size="sm" color="dimmed">
                        Professores
                    </Text>
                    <Text weight={600}>{schoolGrade.teachersCounter}</Text>
                </Stack>
            </Flex>
        </>
    )
}