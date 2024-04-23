import { Stack, Group, Text } from "@mantine/core";
import { ExamItem } from "./ExamItem";
import { type ClassExamPerformance } from "~/api/school-class";

type Props = {
  performance: ClassExamPerformance;
};

export function ExamPerformance({ performance }: Props) {
  return (
    <>
      <Stack>
        <Text align="center">{performance.axisName}</Text>
        <Group spacing="xl">
          <ExamItem
            title={performance.axisName}
            label="Muito Abaixo"
            count={performance.veryLow.count}
            color="red.9"
            students={performance.veryLow.students}
          />
          <ExamItem
            title={performance.axisName}
            color="orange.4"
            count={performance.below.count}
            label="Abaixo"
            students={performance.below.students}
          />
          <ExamItem
            title={performance.axisName}
            color="green.8"
            count={performance.expected.count}
            label="Esperado"
            students={performance.expected.students}
          />
        </Group>
      </Stack>
    </>
  );
}