import { ActionIcon, Table, Select, TextInput, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";

type componentProps = {
    data: Array<[]>;
}
export function TableExams({ data }: componentProps) {
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
                                <Text color={item.cfo.color}>
                                    {item.cfo.percent}
                                </Text>
                            </td>
                            <td>
                                <Text color={item.sea.color}>
                                    {item.sea.percent}
                                </Text>
                            </td>
                            <td>
                                <Text color={item.lct.color}>
                                    {item.lct.percent}
                                </Text>
                            </td>
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