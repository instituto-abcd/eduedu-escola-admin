import { Accordion, Stack } from "@mantine/core";
import { SchoolClassHeader } from "./components/Header";
import { PlanetsPerformance } from "./components/planets-performance/PlanetsPerformance";
import { ExamsPerformance } from "./components/exams-performance/ExamsPerformance";
import { StudentsPerformanceBy } from "./components/StudentsPerformance/StudentsPerformanceBy";
import { ExamsChart } from "./components/ExamsChart/ExamsChart";
import { IconPlus } from "@tabler/icons-react";

export function ClassDetailPage() {
  return (
    <Stack>
      <SchoolClassHeader />

      <Accordion
        variant="separated"
        chevron={<IconPlus size="1rem" />}
        chevronPosition="left"
        multiple={true}
        defaultValue={["block-1", "block-2", "block-3", "block-4"]}
      >
        {/* Desempenho em provas */}
        <ExamsPerformance />

        {/* Desempenho em planetas */}
        <PlanetsPerformance />

        {/* Histórico de resultado de provas */}
        <ExamsChart />

        {/* Histórico de resultado de provas */}
        <StudentsPerformanceBy />
      </Accordion>
    </Stack>
  );
}
