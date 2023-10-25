import { Accordion, Box, Divider, Flex, Select, Text, useMantineTheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { useAuthorizeNewExam, useExamsPerformancePlanets, useGetExamExecutions, usePutReleasePlanets } from "~/api/student";
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

    const [examsPerformanceData, setExamsPerformanceData] = useState([]);
    const [dateExam, setDateExam] = useState('-');

    const { mutate: examsPerformancePlanets } = useExamsPerformancePlanets({
        onSuccess: (data) => {
            setExamsPerformanceData(data)
        },
        onError: (error) => {
            errorNotification(
                "Erro durante a operação",
                `${error.message}`
            );
        },
    });
    const { data: dateExamList } = useGetExamExecutions(
        studentId,
        {
            onSuccess: (data) => {
                const formattedData = data.map(element => {
                    let d = new Date(element.examDate);
                    let month = monthsAbbreviation[d.getMonth()];
                    let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();

                    return {
                        label: `${day}/${month}`,
                        value: element.id
                    };
                });

                if (formattedData.length > 0) {
                    setDateExam(formattedData[0].value);
                    examsPerformancePlanets({
                        id: studentId,
                        studentExamId: formattedData[0].value,
                    });
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
                `${error.message}`
            );
        },
    });
    const { mutate: releasePlanets } = usePutReleasePlanets({
        onSuccess: () => {
            successNotification(
                "Operação realizada com sucesso",
                "Planetas liberados."
            );
        },
        onError: (error) => {
            errorNotification(
                "Erro durante a operação",
                `${error.message}`
            );
        },
    })

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
                <Accordion.Control style={{ maxWidth: '70%' }}>
                    <Flex align="center">
                        <Text
                            color={theme.colors.indigo[9]}
                            pr={10}
                        >
                            Desempenho nos planetas disponibilizados após a prova realizada em
                        </Text>
                        <Select
                            onClick={event => event.stopPropagation()}
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

                    <AccordionButton
                        parentCallback={() => releasePlanets(studentId)}
                        label="Liberar mais planetas"
                    />
                </Flex>
            </Box>

            <Accordion.Panel>
                {examsPerformanceData.length !== 0 &&
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