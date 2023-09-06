import { Accordion, Table, useMantineTheme } from "@mantine/core";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

type componentProps = {
    schoolClassPerformancePlanets: Array<[]>
}
export function PlanetsPerformance({ schoolClassPerformancePlanets }: componentProps) {
    const theme = useMantineTheme();

    const theads = [
        { name: 'Nome' },
        { name: 'Planetas Oferecidos' },
        { name: 'Planetas Realizados' },
        { name: 'Média Estrelas' }
    ]

    return (
        <Accordion.Item value="planetsPerformance">
            <Accordion.Control>Desempenho em Planetas</Accordion.Control>
            <Accordion.Panel>
                <Table horizontalSpacing="sm" verticalSpacing="md">
                    <thead>
                        <tr>
                            {theads.map((item) => <th>{item.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {schoolClassPerformancePlanets &&
                            schoolClassPerformancePlanets?.map((item) => (
                                <tr key={item.axisCode}>
                                    <td style={{ color: theme.colors.blue[6], cursor: 'pointer' }}>
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