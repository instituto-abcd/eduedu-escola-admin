import { Accordion, Box, Divider, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AccordionButton } from "~/components/AccordionButton/AccordionButton";
import { ExamPerformance } from "~/components/ExamPerformance/ExamPerformance";
import { ModalExamsPerformance } from "./Modal";

type componentProps = {
    schoolClassPerformanceExams: Array<[]>;
    idealStudents: Array<[]>;
}
export function ExamsPerformance({ schoolClassPerformanceExams, idealStudents }: componentProps) {

    const [openIdealStudentsModal, openIdealStudentsModalHandler] = useDisclosure(false);

    return (
        <>
            <Accordion.Item value="examsPerformance">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Accordion.Control style={{ maxWidth: '75%' }}>
                        <Text>Desempenho em Provas</Text>
                    </Accordion.Control>
                    <AccordionButton
                        parentCallback={openIdealStudentsModalHandler.open}
                        label="Alunos que não precisam de reforço"
                    />
                </Box>

                <Accordion.Panel>
                    <Flex justify="space-around">
                        {schoolClassPerformanceExams &&
                            schoolClassPerformanceExams?.map((item, i) => (
                                <>
                                    <Box key={item.axisCode}>
                                        <ExamPerformance item={item} />
                                        {(i + 1) != schoolClassPerformanceExams.length &&
                                            <Divider orientation="vertical" variant="solid" />
                                        }
                                    </Box>
                                </>
                            ))
                        }
                    </Flex>
                </Accordion.Panel>
            </Accordion.Item>

            <ModalExamsPerformance
                opened={openIdealStudentsModal}
                onClose={openIdealStudentsModalHandler.close}
                students={idealStudents}
            />
        </>
    )
}