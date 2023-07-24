import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Select,
  Space,
  Stack,
  Table,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSchoolClassGetAll } from "~/api/school-class";
import { PageHeader } from "~/components/PageHeader";
import { Pagination } from "~/components/Pagination";
import { TableLoader } from "~/components/TableLoader";
import { PATH } from "~/constants/path";
import { usePagination } from "~/hooks/usePagination";
import { errorNotification } from "~/utils/errorNotification";
import { DeleteClassModal } from "./components/DeleteClassModal";
import {
  SCHOOL_GRADE,
  SCHOOL_GRADE_SELECT,
  SCHOOL_PERIOD,
  SCHOOL_PERIOD_SELECT,
} from "~/constants";
import { TableHeader } from "~/components/TableHeader";

export function ClassesListPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState({});

  function toggleSelected(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  const pagination = usePagination();
  const { data: schoolClasses, isLoading } = useSchoolClassGetAll({
    search: {
      ...search,
      "page-number": pagination.page,
      "page-size": pagination.pageSize,
    },
    onError: (error) =>
      errorNotification("Erro durante a operação", error.message),
  });

  const [deleteModalOpen, deleteModalHandlers] = useDisclosure(false);

  return (
    <Stack>
      <PageHeader
        title="Turmas"
        gap={0}
        description={`${schoolClasses?.items.length ?? 0} registros`}
      >
        <Button component={Link} to={PATH.NEW_CLASS}>
          Nova turma
        </Button>
      </PageHeader>

      {selected.length > 0 ? (
        <Group>
          <Button
            size="xs"
            variant="outline"
            color="red"
            onClick={deleteModalHandlers.open}
          >
            Excluir
          </Button>
        </Group>
      ) : (
        <Space h={30} />
      )}

      <Table horizontalSpacing="sm" verticalSpacing="md">
        <thead>
          <TableHeader
            columns={[
              { label: "Nome", type: "text", searchTerm: "name" },
              {
                label: "Ano Letivo",
                type: "text",
                searchTerm: "schoolYearName ",
              },
              {
                label: "Série",
                type: "select",
                searchTerm: "schoolGrade",
                inputProps: { data: SCHOOL_GRADE_SELECT },
              },
              {
                label: "Período",
                type: "select",
                searchTerm: "schoolPeriod",
                inputProps: { data: SCHOOL_PERIOD_SELECT },
              },
              {
                label: "Professores",
                type: "text",
                searchTerm: "teacherName",
              },
              { label: "", type: "empty", searchTerm: "" },
            ]}
            onCheckAll={(checked) =>
              checked
                ? setSelected(schoolClasses?.items.map((u) => u.id) ?? [])
                : setSelected([])
            }
            onValueChange={setSearch}
          />
        </thead>
        <tbody>
          {schoolClasses?.items.map((schoolClass) => (
            <tr key={schoolClass.id}>
              <td>
                <Checkbox
                  checked={selected.includes(schoolClass.id)}
                  onChange={() => toggleSelected(schoolClass.id)}
                />
              </td>
              <td>{schoolClass.name}</td>
              <td>{schoolClass.schoolYear.name}</td>
              <td>{SCHOOL_GRADE[schoolClass.schoolGrade]}</td>
              <td>{SCHOOL_PERIOD[schoolClass.schoolPeriod]}</td>
              <td>
                {schoolClass.teachers
                  .map((t) => t.name.split(" ")[0])
                  .join(", ")}
              </td>
              <td>
                <Group noWrap spacing="xs">
                  <ActionIcon
                    color="blue.9"
                    component={Link}
                    to={`${PATH.EDIT_CLASS}/${schoolClass.id}`}
                    state={{ schoolClass }}
                  >
                    <IconEdit />
                  </ActionIcon>

                  <ActionIcon
                    color="blue.9"
                    component={Link}
                    to={schoolClass.id}
                  >
                    <IconEye />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TableLoader
        loading={isLoading}
        empty={schoolClasses ? schoolClasses.items.length === 0 : false}
        link={{
          label: "Criar nova turma",
          to: PATH.NEW_CLASS,
        }}
      />

      {schoolClasses && (
        <Pagination
          paginationApi={schoolClasses.pagination}
          paginationHook={pagination}
        />
      )}

      <DeleteClassModal
        opened={deleteModalOpen}
        onClose={deleteModalHandlers.close}
        classIds={selected}
      />
    </Stack>
  );
}
