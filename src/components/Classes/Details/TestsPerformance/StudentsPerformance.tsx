import { ActionIcon, Checkbox, Select, Table, TextInput } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function StudentsPerformance() {
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
                        <Select data={[]} placeholder="Pesquisar" searchable />
                    </th>
                    <th>
                        CFO
                        <Select data={[]} placeholder="Ordenar" searchable />
                    </th>
                    <th>
                        SEA
                        <Select data={[]} placeholder="Ordenar" searchable />
                    </th>
                    <th>
                        LCT
                        <Select data={[]} placeholder="Ordenar" searchable />
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Checkbox />
                    </td>
                    <td>Amanda Freitas Dias</td>
                    <td>01/02</td>
                    <td>30%</td>
                    <td>70%</td>
                    <td>67%</td>
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
            </tbody>
        </Table>
    )
}