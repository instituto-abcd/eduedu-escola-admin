import { ActionIcon, Modal, Table, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { PATH } from "~/constants/path";

type componentProps = {
    opened: boolean;
    onClose(): void;
    students: Array<[]>;
    title: string;
    color: string;
}
export function ModalExamPerformance({ opened, onClose, title, students, color }: componentProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={title}
            size="md"
        >
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Última prova</th>
                        <th>Desempenho</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {students &&
                        students.map((student) => (
                            <tr>
                                <td>{student.name}</td>
                                <td style={{ textAlign: 'center' }}>{student?.lastExamDate ?? '-'}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Text c={color}>
                                        {student.percent}%
                                    </Text>
                                </td>
                                <td>
                                    <ActionIcon
                                        component={Link}
                                        to={`${PATH.STUDENTS}/${student.studentId}/detalhes`}
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
        </Modal>
    )
}