import { Accordion, Box, Button, Divider, Flex, Select, Text, useMantineTheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { useAuthorizeNewExam, useExamsPerformancePlanets, useGetExamExecutions } from "~/api/student";
import { monthsAbbreviation } from "~/constants";
import { errorNotification } from "~/utils/errorNotification";
import { TablePerformancePlanets } from "./performance-planets/Table";
import { successNotification } from "~/utils/successNotification";
import { AccordionButton } from "~/components/AccordionButton/AccordionButton";

type componentProps = {
    studentId: string;
}

export function PerformanceAtPlanets({ studentId }: componentProps) {
    const theme = useMantineTheme();

    // Get and manage the list of exams executed:
    const [dateExam, setDateExam] = useState('-');

    const [examsPerformanceData, setExamsPerformanceData] = useState([])
    const { mutate: examsPerformancePlanets } = useExamsPerformancePlanets({
        onSuccess: (data) => {
            setExamsPerformanceData(data)
        },
        onError: (error) => {
            errorNotification(
                "Erro durante a operação",
                `${error.message} (cod: ${error.code})`
            );
        },
    });

    const { data: dateExamList } = useGetExamExecutions(
        studentId,
        {
            onSuccess: (data) => {
                data?.forEach(element => {
                    let d = new Date(element.examDate)
                    let month = monthsAbbreviation[d.getMonth()];
                    let day = d.getDay();

                    element.label = `${day}/${month}`;
                    element.value = element.id
                });

                if (data[0]) {
                    setDateExam(data[0].id)
                    examsPerformancePlanets({
                        id: data[0].studentId,
                        studentExamId: data[0].id,
                    })
                }
            },
            onError: (error) => {
                errorNotification("Erro durante a operação", error.message);
            }
        }
    )

    const { mutate: authorizeNewExam } = useAuthorizeNewExam({
        onSuccess: () => {
            successNotification(
                "Operação realizada com sucesso",
                "Nova prova autorizada para o aluno!"
            );
        },
        onError: (error) => {
            errorNotification(
                "Erro durante a operação",
                `${error.message} (cod: ${error.code})`
            );
        },
    });

    const openModalAuthorizeNewExam = () => {
        modals.openConfirmModal({
            title: "Autorizar Nova Prova",
            children: (
                <>
                    <Text size="sm">
                        Deseja que o sistema permita o aluno
                        realizar uma nova prova?
                    </Text>
                    <Divider mt={20} />
                </>
            ),
            labels: { confirm: "Sim", cancel: "Não" },
            onConfirm: () => {
                authorizeNewExam([studentId]);
            },
        });
    };

    return (
        <Accordion.Item value="planetsPerformance">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Accordion.Control
                    style={{
                        maxWidth: '70%'
                    }}
                >
                    <Flex align="center">
                        <Text
                            color={theme.colors.indigo[9]}
                            pr={10}
                        >
                            Desempenho nos planetas disponibilizados após a prova realizada em
                        </Text>
                        <Select
                            withinPortal
                            data={dateExamList?.length ? dateExamList : []}
                            value={dateExam}
                            style={{
                                width: '150px'
                            }}
                            onChange={(value) => {
                                setDateExam(value)
                                examsPerformancePlanets({
                                    id: studentId,
                                    studentExamId: value,
                                })
                            }}
                        />
                    </Flex>
                </Accordion.Control>

                <Flex>
                    <AccordionButton
                        parentCallback={() => openModalAuthorizeNewExam()}
                        label="Autorizar nova prova"
                        mr={10}
                    />

                    <AccordionButton label="Liberar mais planetas" />
                </Flex>
            </Box>

            <Accordion.Panel>
                {examsPerformanceData.length != 0 &&
                    <TablePerformancePlanets
                        examsPerformanceData={examsPerformanceData}
                        studentId={studentId}
                        dateExamList={dateExamList}
                        dateExam={dateExam}
                    />
                }
            </Accordion.Panel>
        </Accordion.Item>
    )
}