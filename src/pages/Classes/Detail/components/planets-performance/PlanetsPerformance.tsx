import { Accordion } from "@mantine/core";
import '@smastrom/react-rating/style.css'
import { PlanetPerformanceTable } from "./Table";

type componentProps = {
    schoolClassPerformancePlanets: Array<[]>
}
export function PlanetsPerformance({ schoolClassPerformancePlanets }: componentProps) {
    return (
        <Accordion.Item value="planetsPerformance">
            <Accordion.Control>Desempenho em Planetas</Accordion.Control>
            <Accordion.Panel>
                <PlanetPerformanceTable schoolClassPerformancePlanets={schoolClassPerformancePlanets} />
            </Accordion.Panel>
        </Accordion.Item>
    )
}