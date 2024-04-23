import { Accordion, Box, Divider, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AccordionButton } from "~/components/AccordionButton/AccordionButton";
import { ExamPerformance } from "~/components/ExamPerformance/ExamPerformance";
import { ModalExamsPerformance } from "./Modal";
import { useParams } from "react-router-dom";
import {
  useGetExamsPerformance,
  useGetIdealStudents,
} from "~/api/school-class";

export function ExamsPerformance() {
  const params = useParams();
  const schoolClassId = params.classId ?? "";

  const { data: perf } = useGetExamsPerformance(schoolClassId, {
    initialData: [],
  });

  const { data: ideal } = useGetIdealStudents(schoolClassId, {
    initialData: [],
  });

  const [openIdealStudentsModal, openIdealStudentsModalHandler] =
    useDisclosure(false);

  return (
    <>
      <Accordion.Item value="block-1">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Accordion.Control style={{ maxWidth: "75%" }}>
            <Text>Desempenho em Provas</Text>
          </Accordion.Control>
          <AccordionButton
            parentCallback={openIdealStudentsModalHandler.open}
            label="Alunos que não precisam de reforço"
          />
        </Box>

        <Accordion.Panel>
          <Flex justify="space-around">
            {perf?.map((item, i) => (
              <Box key={i}>
                <ExamPerformance performance={item} />
                {i + 1 < perf.length && (
                  <Divider orientation="vertical" variant="solid" />
                )}
              </Box>
            ))}
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>

      {ideal && (
        <ModalExamsPerformance
          opened={openIdealStudentsModal}
          onClose={openIdealStudentsModalHandler.close}
          students={ideal}
        />
      )}
    </>
  );
}