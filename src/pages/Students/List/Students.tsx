import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Group,
  Select,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconEdit,
  IconEye
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudentGetAll } from "~/api/student";
import { PageHeader } from "~/components/PageHeader";
import { Pagination } from "~/components/Pagination";
import { TableLoader } from "~/components/TableLoader";
import { InfoTooltip } from "~/components/Tooltips/Info";
import { PATH } from "~/constants/path";
import { usePagination } from "~/hooks/usePagination";
import { DeleteStudentModal } from "../Student/components/DeleteStudentModal";
import { useDisclosure } from "@mantine/hooks";
import { UploadStudentsSheet } from "./components/UploadStudentsSheet";

export function StudentsListPage() {
  const theme = useMantineTheme();

  const [selected, setSelected] = useState<string[]>([]);
  function toggleSelected(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  const { data, isLoading } = useStudentGetAll();
  const pagination = usePagination();
  const [deleteModalOpen, deleteModalHandlers] = useDisclosure(false);
  const [uploadSheetModalOpen, uploadSheetModalHandlers] = useDisclosure(false);

  // Modals
  const openModalAuthorizeNewTest = () => {
    modals.openConfirmModal({
      title: "Autorizar Nova Prova",
      children: (
        <>
          <Text size="sm">
            Deseja que o sistema permita o(s) aluno(s) selecionado(s) à
            realizarem uma nova prova?
          </Text>
          <Divider mt={20} />
        </>
      ),
      labels: { confirm: "Sim", cancel: "Não" },
    });
  };

  return (
    <>
      <PageHeader
        title="Alunos"
        description={`${data?.items.length ?? 0} registros`}
        gap={0}
      >
        <Group noWrap>
          <Button variant="outline" onClick={uploadSheetModalHandlers.open}>
            Upload aluno
          </Button>
          <Button component={Link} to={`${PATH.STUDENTS}/novo-aluno`}>
            Novo aluno
          </Button>
        </Group>
      </PageHeader>

      <Group>
        <Button
          size="xs"
          variant="outline"
          color="red"
          onClick={deleteModalHandlers.open}
        >
          Excluir
        </Button>
        <Button
          size="xs"
          color="blue.0"
          style={{ color: theme.colors.blue[6] }}
          onClick={openModalAuthorizeNewTest}
        >
          Autorizar Nova Prova
        </Button>
      </Group>

      <Table horizontalSpacing="sm" verticalSpacing="md">
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={(e) =>
                  e.currentTarget.checked
                    ? setSelected(data?.items.map((u) => u.id) ?? [])
                    : setSelected([])
                }
              />
            </th>
            <th>
              Nome
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Turma
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              Período
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              Série
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              <InfoTooltip text="CFO" tooltipText="Consciência Fonológica" />
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              <InfoTooltip
                text="SEA"
                tooltipText="Sistema de Escrita Alfabética"
              />
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              <InfoTooltip
                text="LCT"
                tooltipText="Leitura e Compreensão de Texto"
              />
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              Status
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((student) => (
            <tr key={student.id}>
              <td>
                <Checkbox
                  checked={selected.includes(student.id)}
                  onChange={() => toggleSelected(student.id)}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.schoolClassName}</td>
              <td>{student.schoolPeriod}</td>
              <td>{student.schoolGrade}</td>
              <td>{student.cfo}</td>
              <td>{student.sea}</td>
              <td>{student.lct}</td>
              <td>{student.status}</td>
              <td>
                <Group noWrap spacing="xs">
                  <ActionIcon
                    component={Link}
                    to={`${PATH.STUDENTS}/${student.id}`}
                    color="blue.9"
                  >
                    <IconEye />
                  </ActionIcon>
                  <ActionIcon
                    component={Link}
                    to={`${PATH.STUDENTS}/${student.id}`}
                    state={{ student }}
                    color="blue.9"
                  >
                    <IconEdit />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TableLoader
        loading={isLoading}
        empty={data ? data.items.length === 0 : false}
        link={{
          label: "Cadastrar aluno",
          to: `${PATH.STUDENTS}/novo-aluno`,
        }}
      />

      {data && (
        <Pagination
          paginationApi={data.pagination}
          paginationHook={pagination}
        />
      )}

      <DeleteStudentModal
        opened={deleteModalOpen}
        onClose={deleteModalHandlers.close}
        studentIds={selected}
      />

      <UploadStudentsSheet
        opened={uploadSheetModalOpen}
        onClose={uploadSheetModalHandlers.close}
      />
    </>
  );
}
