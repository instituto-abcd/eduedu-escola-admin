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
import { SCHOOL_GRADE, SCHOOL_PERIOD } from "~/constants";

export function ClassesListPage() {
  const [selected, setSelected] = useState<string[]>([]);
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
          <tr>
            <th>
              <Checkbox
                onChange={(e) =>
                  e.currentTarget.checked
                    ? setSelected(schoolClasses?.items.map((u) => u.id) ?? [])
                    : setSelected([])
                }
              />
            </th>
            <th>
              Nome
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Ano Letivo
              <Select data={[]} placeholder="Pesquisar" searchable />
            </th>
            <th>
              Série
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Período
              <Select data={[]} placeholder="Pesquisar" searchable />
            </th>
            <th>
              Professores
              <Select data={[]} placeholder="Pesquisar" searchable />
            </th>
            <th></th>
          </tr>
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
