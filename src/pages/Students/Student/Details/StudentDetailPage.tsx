import { Accordion } from "@mantine/core";
import { HeaderStudent, PerformancePerArea, SchoolClassPerformanceBy, StudentPerformanceBy, StudentReport } from "./components";
import { IconPlus } from "@tabler/icons-react";
import { PerformanceAtPlanets } from "./components/PerformanceAtPlanets";

export function StudentDetailPage() {
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
                <PerformancePerArea />
                <StudentReport />
                <StudentPerformanceBy />
                <SchoolClassPerformanceBy />
                <PerformanceAtPlanets />
            </Accordion>
        </>
    )
}