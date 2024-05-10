import { ActionIcon, Table } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { Rating } from "@mantine/core";
import { useGetStudentsPlanetsPerformance } from "~/api/school-class";
import { TableHeader } from "~/components/TableHeader";
import { SORT_VALUE_SELECT } from "~/constants";
import { useStudentPerfFilterStore } from "~/stores/filter";
import { useEffect } from "react";

export function TablePlanet() {
  const params = useParams();
  const schoolClassId = params.classId ?? "";

  const { data: search, update } = useStudentPerfFilterStore();
  const { data } = useGetStudentsPlanetsPerformance(schoolClassId, { search });

  const sortProps = {
    placeholder: "Ordenar",
    data: SORT_VALUE_SELECT,
    noExtraOptions: true,
  };

  useEffect(() => {
    return () => {
      update({});
    };
  }, []);

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
              <Rating
                readOnly
                defaultValue={item?.cfo?.averageStars ?? 0}
                value={item?.cfo?.averageStars}
                key={Math.random()}
                style={{ width: "100px" }}
              />
            </td>
            <td>
              <Rating
                readOnly
                defaultValue={item?.sea?.averageStars ?? 0}
                value={item?.sea?.averageStars}
                key={Math.random()}
                style={{ width: "100px" }}
              />
            </td>
            <td>
              <Rating
                readOnly
                defaultValue={item?.lct?.averageStars ?? 0}
                value={item?.lct?.averageStars}
                key={Math.random()}
                style={{ width: "100px" }}
              />
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