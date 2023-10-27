import { Box } from "@mantine/core";
import { HeaderReport } from "./Header";
import { ByArea } from "./ByArea";
import { TextReport } from "./TextReport";
import { ByExam } from "./ByExam";
import { ByPlanet } from "./ByPlanet";
import { ByPlanetsAfterExams } from "./ByPlanetsAfterExams";
import { useParams } from "react-router-dom";
import { useGetDetailedSummary, useStudentGetOne } from "~/api/student";
import { errorNotification } from "~/utils/errorNotification";
import { useEffect } from "react";

export function StudentReport() {
    // Getting student ID from params:
    const params = useParams();

    // Getting detailed-summary data:
    const { data: detailedSummary } = useGetDetailedSummary(
        params.studentId ?? "",
        {
            onError: (error) =>
                errorNotification("Erro ao obter detalhes do estudante", error.message)
        }
    )

    // Getting info about student:
    const { data: student } = useStudentGetOne(params.studentId ?? "", {});

    const studentId = student?.id;
    const performanceByArea = detailedSummary?.performanceByArea;

    useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 2000);
    }, []);
    return (
        <>
            {studentId &&
                <Box p={40}>
                    <HeaderReport student={student} />

                    {performanceByArea &&
                        <>
                            <ByArea performanceByArea={detailedSummary?.performanceByArea} />
                            <TextReport summaries={detailedSummary?.summaries} />
                        </>
                    }

                    <ByExam studentId={student?.id} />
                    <ByPlanet studentId={student?.id} />
                    <ByPlanetsAfterExams studentId={student?.id} />
                </Box>
            }

            {/* In case user use the URL to find some student and misstype the ID */}
            {!studentId &&
                <>
                    <h2>Oooops!</h2>
                    <p>Aluno inexistente.</p>
                </>
            }
        </>
    )
}