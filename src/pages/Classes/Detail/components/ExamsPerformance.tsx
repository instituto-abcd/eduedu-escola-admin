import { Accordion, Box, Divider, Flex, Text } from "@mantine/core";
import { AccordionButton } from "~/components/AccordionButton/AccordionButton";
import { ExamPerformance } from "~/components/ExamPerformance/ExamPerformance";

type componentProps = {
    schoolClassPerformanceExams: Array<[]>;
}
export function ExamsPerformance({ schoolClassPerformanceExams }: componentProps) {

    return (
        <Accordion.Item value="examsPerformance">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Accordion.Control style={{ maxWidth: '75%' }}>
                    <Text>Desempenho em Provas</Text>
                </Accordion.Control>
                <AccordionButton label="Alunos que não precisam de reforço" />
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
    )
}