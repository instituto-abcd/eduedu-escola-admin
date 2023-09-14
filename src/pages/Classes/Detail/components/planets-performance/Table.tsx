import { Table } from "@mantine/core";
import { Rating } from '@smastrom/react-rating'

type componentProps = {
    schoolClassPerformancePlanets: Array<[]>
}

export function PlanetPerformanceTable({ schoolClassPerformancePlanets }: componentProps) {

    const theads = [
        { name: 'Nome' },
        { name: 'Planetas Oferecidos' },
        { name: 'Planetas Realizados' },
        { name: 'Média Estrelas' }
    ];
    return (
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
                            <td>
                                {item.axisName}
                            </td>
                            <td>{item.offeredPlanets}</td>
                            <td>{item.accomplishedPlanets}</td>
                            <td>
                                <Rating readOnly value={item.averageStars} key={Math.random()} style={{ width: '100px' }} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}
