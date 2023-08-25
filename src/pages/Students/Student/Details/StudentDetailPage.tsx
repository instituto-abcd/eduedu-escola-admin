import { Accordion } from "@mantine/core";
import { HeaderStudent, PerformancePerArea, SchoolClassPerformanceBy, StudentPerformanceBy, StudentReport } from "./components";
import { IconPlus } from "@tabler/icons-react";
import { PerformanceAtPlanets } from "./components/PerformanceAtPlanets";
import { useParams } from "react-router-dom";
import { useGetDetailedSummary } from "~/api/student";
import { errorNotification } from "~/utils/errorNotification";

export function StudentDetailPage() {
    // Getting student ID:
    const params = useParams();
    console.log('student: \n', params.studentId);

    // Getting detailed-summary data:
    const { data: detailedSummary } = useGetDetailedSummary(
        params.studentId ?? "",
        {
            onError: (error) =>
                errorNotification("Erro durante a operação", error.message)
        }
    )
    console.log(detailedSummary)

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
                <StudentPerformanceBy />
                <SchoolClassPerformanceBy />
                <PerformanceAtPlanets />
            </Accordion>
        </>
    )
}