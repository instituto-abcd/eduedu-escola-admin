import { ActionIcon, Table, Select, TextInput } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Rating } from "@mantine/core";

type componentProps = {
    data: Array<[]>;
}
export function TablePlanet({ data }: componentProps) {
    return (
        <Table horizontalSpacing="sm" verticalSpacing="md">
            <thead>
                <tr>
                    <th>
                        Nome
                        <TextInput size="sm" placeholder="Pesquisar" />
                    </th>
                    <th>
                        Última prova
                        <Select withinPortal data={[]} placeholder="Pesquisar" searchable />
                    </th>
                    <th>
                        CFO
                        <Select withinPortal data={[]} placeholder="Ordenar" searchable />
                    </th>
                    <th>
                        SEA
                        <Select withinPortal data={[]} placeholder="Ordenar" searchable />
                    </th>
                    <th>
                        LCT
                        <Select withinPortal data={[]} placeholder="Ordenar" searchable />
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data &&
                    data.map((item) => (
                        <tr>
                            <td>{item.studentName}</td>
                            <td>{item.lastExamDate}</td>
                            <td>
                                <Rating readOnly defaultValue={item?.cfo?.averageStars ?? 0} value={item?.cfo?.averageStars} key={Math.random()} style={{ width: '100px' }} />
                            </td>
                            <td>
                                <Rating readOnly defaultValue={item?.sea?.averageStars ?? 0} value={item?.sea?.averageStars} key={Math.random()} style={{ width: '100px' }} />
                            </td>
                            <td>
                                <Rating readOnly defaultValue={item?.lct?.averageStars ?? 0} value={item?.lct?.averageStars} key={Math.random()} style={{ width: '100px' }} />
                            </td>
                            <td>
                                <ActionIcon
                                    component={Link}
                                    to={`/alunos/${item.studentId}/detalhes`}
                                    color="blue.9"
                                >
                                    <IconEye />
                                </ActionIcon>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}