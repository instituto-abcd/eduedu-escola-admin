import { Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { ModalExamPerformance } from "./Modal";
import { useDisclosure } from "@mantine/hooks";
import { IdealStudent } from "~/api/school-class";

type Props = {
  count: number;
  label: string;
  color: string;
  title: string;
  students: IdealStudent[];
};

export function ExamItem({ count, label, color, students, title }: Props) {
  const theme = useMantineTheme();
  const [modalExamPerformance, modalExamPerformanceHandler] =
    useDisclosure(false);

  return (
    <>
      <Stack
        onClick={modalExamPerformanceHandler.open}
        style={{
          cursor: "pointer",
        }}
      >
        <Flex justify="center">
          <Text weight={600} color="blue.6">
            {count}
          </Text>
          <IconUsers color={theme.colors.blue[6]} />
        </Flex>
        <Text weight={700} color={color}>
          {label}
        </Text>
      </Stack>
      <ModalExamPerformance
        opened={modalExamPerformance}
        onClose={modalExamPerformanceHandler.close}
        students={students}
        color={color}
        title={title}
      />
    </>
  );
}