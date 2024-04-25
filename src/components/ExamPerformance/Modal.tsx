import { ActionIcon, Modal, Table, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { IdealStudent } from "~/api/school-class";
import { monthsAbbreviation } from "~/constants";
import { PATH } from "~/constants/path";

type Props = {
  opened: boolean;
  onClose(): void;
  students: IdealStudent[];
  title: string;
  color: string;
};

export function ModalExamPerformance({
  opened,
  onClose,
  title,
  students,
  color,
}: Props) {
  function configDate(examDate: Date) {
    let d = new Date(examDate);
    let month = monthsAbbreviation[d.getMonth()];
    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

    return `${day}/${month}`;
  }
  return (
    <Modal opened={opened} onClose={onClose} title={title} size="md">
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
              <tr key={student.studentId}>
                <td>{student.name}</td>
                <td style={{ textAlign: "center" }}>
                  {student?.lastExamDate
                    ? configDate(student.lastExamDate)
                    : "-"}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Text c={color}>{student.percent ?? "-"}%</Text>
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
            ))}
        </tbody>
      </Table>
    </Modal>
  );
}