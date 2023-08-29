import { ActionIcon, Checkbox, Table, Select, TextInput } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";

type componentProps = {
    data: Array<[]>;
}
export function TablePlanet({ data }: componentProps) {
    return (
        <Table horizontalSpacing="sm" verticalSpacing="md">
            <thead>
                <tr>
                    <th></th>
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
                            <td>
                                <Checkbox />
                            </td>
                            <td>{item.studentName}</td>
                            <td>{item.lastExamDate}</td>
                            <td>{item.cfo.averageStars}</td>
                            <td>{item.sea.averageStars}</td>
                            <td>{item.lct.averageStars}</td>
                            <td>
                                <ActionIcon
                                    component={Link}
                                    to={`/`}
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