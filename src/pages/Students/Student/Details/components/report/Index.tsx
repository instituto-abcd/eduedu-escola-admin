import { Box } from "@mantine/core";
import { ByArea } from "./ByArea";
import { TextReport } from "./TextReport";
import { ByExam } from "./ByExam";
import { ByPlanet } from "./ByPlanet";
import { ByPlanetsAfterExams } from "./ByPlanetsAfterExams";
import { HeaderReport } from "./Header";

type componentProps = {
    student: Array<{}>;
    detailedSummary: Array<{}>;
}
export function StudentReport({ student, detailedSummary }: componentProps) {
    return (
        <Box p={40}>
            <HeaderReport student={student} />

            <ByArea performanceByArea={detailedSummary?.performanceByArea} />

            <TextReport summaries={detailedSummary?.summaries} />

            <ByExam studentId={student?.id} />

            <ByPlanet studentId={student?.id} />

            <ByPlanetsAfterExams studentId={student?.id} />
        </Box>
    )
}