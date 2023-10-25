import { Box } from "@mantine/core";
import { HeaderReport } from "./Header";
import { ByArea } from "./ByArea";
import { TextReport } from "./TextReport";
import { ByExam } from "./ByExam";
import { ByPlanet } from "./ByPlanet";
import { ByPlanetsAfterExams } from "./ByPlanetsAfterExams";

type ComponentProps = {
    student: Array<{}>;
    detailedSummary: Array<{}>;
}
export function StudentReport({ student, detailedSummary }: ComponentProps) {


    return (
        <Box p={40}>
            <HeaderReport student={student} />
            <ByArea performanceByArea={detailedSummary?.performanceByArea} />
            <TextReport summaries={detailedSummary?.summaries} />

            {student?.id &&
                <Box>
                    <ByExam studentId={student?.id} />
                    <ByPlanet studentId={student?.id} />
                    <ByPlanetsAfterExams studentId={student?.id} />
                </Box>
            }
        </Box>
    )
}