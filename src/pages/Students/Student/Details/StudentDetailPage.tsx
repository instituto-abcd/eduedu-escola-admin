import { Accordion } from "@mantine/core";
import { HeaderStudent, PerformancePerArea, SchoolClassPerformanceBy, StudentPerformanceBy, StudentReport } from "./components";
import { IconPlus } from "@tabler/icons-react";
import { PerformanceAtPlanets } from "./components/PerformanceAtPlanets";
import { useParams } from "react-router-dom";
import { useGetDetailedSummary, useStudentGetOne } from "~/api/student";
import { errorNotification } from "~/utils/errorNotification";

export function StudentDetailPage() {
    // Getting student ID from params:
    const params = useParams();

    // Getting detailed-summary data:
    const { data: detailedSummary } = useGetDetailedSummary(
        params.studentId ?? "",
        {
            onError: (error) =>
                errorNotification("Erro durante a operação", error.message)
        }
    )

    // Getting info about student:
    const { data: student } = useStudentGetOne(params.studentId ?? "", {});

    return (
        <>
            <HeaderStudent />

            <Accordion
                variant="separated"
                chevron={<IconPlus size="1rem" />}
                chevronPosition="left"
                styles={{
                    chevron: {
                        "&[data-rotate]": {
                            transform: "rotate(45deg)",
                        },
                    },
                    item: {
                        backgroundColor: '#fff',
                        boxShadow: "4px 6px 15px -5px rgba(0,0,0,0.40)",
                    }
                }}
            >
                <PerformancePerArea performanceByArea={detailedSummary?.performanceByArea} />
                <StudentReport summaries={detailedSummary?.summaries} />
                <StudentPerformanceBy studentId={params?.studentId ?? ""} />
                <SchoolClassPerformanceBy schoolClassId={student?.schoolClassId ?? ""} />
                <PerformanceAtPlanets studentId={params?.studentId ?? ""} />
            </Accordion>
        </>
    )
}