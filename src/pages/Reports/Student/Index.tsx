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
import { useEffect, useState } from "react";

export function StudentReport() {
  const [isPlanetsExamsReady, setIsPlanetsExamsReady] = useState(false);
  // Getting student ID from params:
  const params = useParams();

  // Getting detailed-summary data:
  const { data: detailedSummary } = useGetDetailedSummary(
    params.studentId ?? "",
    {
      onError: (error) =>
        errorNotification("Erro ao obter detalhes do estudante", error.message),
    },
  );

  // Getting info about student:
  const { data: student } = useStudentGetOne(params.studentId ?? "", {});

  const studentId = student?.id;
  const performanceByArea = detailedSummary?.performanceByArea;

  useEffect(() => {
    let IDTimeout: any = null;
    if (student && performanceByArea && isPlanetsExamsReady) {
      IDTimeout = setTimeout(() => {
        window.print();
      }, 500);
    } else {
      clearTimeout(IDTimeout);
    }
    return () => {
      clearTimeout(IDTimeout);
    };
  }, [student, performanceByArea, isPlanetsExamsReady]);
  
  return (
    <>
      {studentId && (
        <Box p={20} style={{ maxWidth: "900px" }}>
          <HeaderReport student={student} />

          {performanceByArea && (
            <>
              <ByArea performanceByArea={detailedSummary?.performanceByArea} />
              <TextReport summaries={detailedSummary?.summaries} />
            </>
          )}

          <ByExam studentId={student?.id} maxWidth="900px" />
          <ByPlanet studentId={student?.id} maxWidth="900px" />
          <ByPlanetsAfterExams studentId={student?.id} report onReady={() => setIsPlanetsExamsReady(true)} />
        </Box>
      )}

      {/* In case user use the URL to find some student and misstype the ID */}
      {!studentId && (
        <>
          <h2>Oooops!</h2>
          <p>Aluno inexistente.</p>
        </>
      )}
    </>
  );
}