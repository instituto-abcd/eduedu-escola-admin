import { Accordion, Box, Button, Divider, Flex, Select, Text, useMantineTheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { useAuthorizeNewExam, useExamsPerformancePlanets, useGetExamExecutions } from "~/api/student";
import { monthsAbbreviation } from "~/constants";
import { errorNotification } from "~/utils/errorNotification";
import { TablePerformancePlanets } from "./performance-planets/Table";
import { successNotification } from "~/utils/successNotification";

type componentProps = {
    studentId: string;
}

export function PerformanceAtPlanets({ studentId }: componentProps) {
    const theme = useMantineTheme();

    // Get and manage the list of exams executed:
    const [dateExam, setDateExam] = useState('');

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
            },
            onError: (error) => {
                errorNotification("Erro durante a operação", error.message);
            }
        }
    )

    const [examsPerformanceData, setExamsPerformanceData] = useState([])
    const { mutate: examsPerformancePlanets, isLoading: isExamsPerformancePlanetsLoading } = useExamsPerformancePlanets({
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
                        color: theme.colors.indigo[9],
                        maxWidth: '70%'
                    }}
                >
                    <Flex align="center">
                        <Text pr={10}>Desempenho nos planetas disponibilizados após a prova realizada em</Text>
                        <Select
                            withinPortal
                            data={dateExamList?.length ? dateExamList : []}
                            placeholder="Pesquisar"
                            searchable
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
                    <Button
                        size="xs"
                        style={{
                            margin: '0 10px 0 0',
                            color: theme.colors.blue[6],
                            backgroundColor: theme.colors.blue[0],
                        }}
                    >
                        Liberar mais planetas
                    </Button>
                    <Button
                        size="xs"
                        style={{
                            color: theme.colors.blue[6],
                            backgroundColor: theme.colors.blue[0],
                        }}
                        onClick={openModalAuthorizeNewExam}
                    >
                        Autorizar nova prova
                    </Button>
                </Flex>
            </Box>

            <Accordion.Panel>
                <TablePerformancePlanets
                    examsPerformanceData={examsPerformanceData}
                    studentId={studentId}
                    dateExamList={dateExamList}
                    dateExam={dateExam}
                />
            </Accordion.Panel>
        </Accordion.Item>
    )
}