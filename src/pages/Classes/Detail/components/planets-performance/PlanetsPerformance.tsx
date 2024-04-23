import { Accordion } from "@mantine/core";
import "@smastrom/react-rating/style.css";
import { PlanetPerformanceTable } from "./Table";

export function PlanetsPerformance() {
  return (
    <Accordion.Item value="block-2">
      <Accordion.Control>Desempenho em Planetas</Accordion.Control>
      <Accordion.Panel>
        <PlanetPerformanceTable />
      </Accordion.Panel>
    </Accordion.Item>
  );
}