import { Flex, Stack, Title, Text, useMantineTheme } from "@mantine/core";
import { SchoolGradeResponse } from "~/api/dashboard";
import { SCHOOL_GRADE } from "~/constants";

type Props = {
  grade: SchoolGradeResponse;
};

export function Header({ grade }: Props) {
  const theme = useMantineTheme();

  return (
    <>
      <Title order={4} weight={400} mb={20} color={theme.colors.blue[9]}>
        {SCHOOL_GRADE[grade.name]}
      </Title>

      <Flex justify={"space-between"} mb={20}>
        <Stack spacing={3} align="center">
          <Text size="sm" color="dimmed">
            Turmas
          </Text>
          <Text weight={600}>{grade.schoolClassesCounter}</Text>
        </Stack>
        <Stack spacing={3} align="center">
          <Text size="sm" color="dimmed">
            Alunos
          </Text>
          <Text weight={600}>{grade.studentsCounter}</Text>
        </Stack>
        <Stack spacing={3} align="center">
          <Text size="sm" color="dimmed">
            Professores
          </Text>
          <Text weight={600}>{grade.teachersCounter}</Text>
        </Stack>
      </Flex>
    </>
  );
}