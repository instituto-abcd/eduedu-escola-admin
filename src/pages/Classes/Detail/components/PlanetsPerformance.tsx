import { Accordion, Table, useMantineTheme } from "@mantine/core";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

type componentProps = {
    schoolClassPerformancePlanets: Array<[]>
}
export function PlanetsPerformance({ schoolClassPerformancePlanets }: componentProps) {
    const theme = useMantineTheme();

    return (
        <Accordion.Item value="planetsPerformance">
            <Accordion.Control>Desempenho em Planetas</Accordion.Control>
            <Accordion.Panel>
                <Table horizontalSpacing="sm" verticalSpacing="md">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Planetas Oferecidos</th>
                            <th>Planetas Realizados</th>
                            <th>Média Estrelas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schoolClassPerformancePlanets &&
                            schoolClassPerformancePlanets?.map((item) => (
                                <tr key={item.axisCode}>
                                    <td style={{ color: theme.colors.blue[6] }}>
                                        {item.axisName}
                                    </td>
                                    <td>{item.offeredPlanets}</td>
                                    <td>{item.accomplishedPlanets}</td>
                                    <td>
                                        <Rating readOnly value={item.averageStars} key={Math.random()} style={{ width: '100px' }} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Accordion.Panel>
        </Accordion.Item>
    )
}