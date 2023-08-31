import { ActionIcon, Modal, Table } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { monthsAbbreviation } from "~/constants";
import { PATH } from "~/constants/path";


type componentProps = {
    opened: boolean;
    onClose(): void;
    students: Array<[]>;
};

export function ModalExamsPerformance({ opened, onClose, students }: componentProps) {
    function configDate(examDate) {
        let d = new Date(examDate)
        let month = monthsAbbreviation[d.getMonth()];
        let day = d.getDay();

        return `${day}/${month}`;
    }
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Alunos que não precisam de reforço"
            size="md"
        >
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Última Prova</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {students &&
                        students.map((student) => (
                            <tr>
                                <td>{student.name}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {configDate(student.lastExamDate)}
                                </td>
                                <td>
                                    <ActionIcon
                                        component={Link}
                                        to={`${PATH.STUDENTS}/${student.id}/detalhes`}
                                        color="blue.9"
                                    >
                                        <IconEye />
                                    </ActionIcon>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

        </Modal>
    )
}