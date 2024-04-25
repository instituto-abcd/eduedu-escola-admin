import { ActionIcon, Table, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { useGetStudentsExamsPerformance } from "~/api/school-class";
import { TableHeader } from "~/components/TableHeader";
import { SORT_VALUE_SELECT } from "~/constants";
import { useStudentPerfFilterStore } from "~/stores/filter";

export function TableExams() {
  const params = useParams();
  const schoolClassId = params.classId ?? "";
  const { data: search, update } = useStudentPerfFilterStore();

  const { data } = useGetStudentsExamsPerformance(schoolClassId, {
    search,
  });

  const sortProps = {
    placeholder: "Ordenar",
    data: SORT_VALUE_SELECT,
    noExtraOptions: true,
  };

  return (
    <Table horizontalSpacing="sm" verticalSpacing="md">
      <thead>
        <TableHeader
          columns={[
            { label: "Nome", type: "text", searchTerm: "studentName" },
            { label: "Última prova", type: "text", searchTerm: "examDate" },
            {
              label: "CFO",
              type: "select",
              searchTerm: "cfo",
              inputProps: sortProps,
            },
            {
              label: "SEA",
              type: "select",
              searchTerm: "sea",
              inputProps: sortProps,
            },
            {
              label: "LCT",
              type: "select",
              searchTerm: "lct",
              inputProps: sortProps,
            },
            {
              label: "",
              type: "empty",
              searchTerm: "",
            },
          ]}
          initialValues={search}
          onValueChange={update}
        />
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.studentId}>
            <td>{item.studentName}</td>
            <td>{item.lastExamDate}</td>
            <td>
              <Text color={item.cfo.color}>{item.cfo.percent}</Text>
            </td>
            <td>
              <Text color={item.sea.color}>{item.sea.percent}</Text>
            </td>
            <td>
              <Text color={item.lct.color}>{item.lct.percent}</Text>
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
        ))}
      </tbody>
    </Table>
  );
}