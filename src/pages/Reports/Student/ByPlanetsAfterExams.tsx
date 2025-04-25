import { Box, Title } from "@mantine/core";
import { useState } from "react";
import { useExamsPerformancePlanets, useGetExamExecutions } from "~/api/student";
import { monthsAbbreviation } from "~/constants";
import { errorNotification } from "~/utils/errorNotification";
import { TablePerformancePlanets } from "../../Students/Student/Details/components/performance-planets/Table";

type componentProps = {
    studentId: string;
    report?: boolean;
}

export function ByPlanetsAfterExams({ studentId, report }: componentProps) {
    // Get and manage the list of exams executed:
    const [dateExam, setDateExam] = useState('-');
    const [dateExamText, setDateExamText] = useState('-');

    const [examsPerformanceData, setExamsPerformanceData] = useState([])
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
                data?.forEach(element => {
                    let d = new Date(element.examDate)
                    let month = monthsAbbreviation[d.getMonth()];
                    let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();

                    element.label = `${day}/${month}`;
                    element.value = element.id
                });

                if (data[0]) {
                    setDateExam(data[0].id)
                    setDateExamText(data[0].label || '')
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

    return (
        <Box mt={40}>
            <Title order={4} pb={20}>{`Desempenho nos planetas disponibilizados após a prova em${report ? ` ${dateExamText}` : ''}:`}</Title>

            {examsPerformanceData.length != 0 &&
                <TablePerformancePlanets
                    examsPerformanceData={examsPerformanceData}
                    studentId={studentId}
                    dateExamList={dateExamList}
                    dateExam={dateExam}
                />
            }
        </Box>
    )
}