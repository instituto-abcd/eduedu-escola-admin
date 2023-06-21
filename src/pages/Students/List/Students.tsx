import { Link } from "react-router-dom";
import { PATH } from "~/constants/path";

// Components:
import {
  ActionIcon,
  Button,
  Checkbox,
  FileInput,
  Group,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { HorizontalRule } from "~/components/HorizontalRule";
import { PageHeader } from "~/components/PageHeader";
import { InfoTooltip } from "~/components/Tooltips/Info";

// Icons
import { IconEdit, IconEye, IconFileDownload, IconPaperclip } from "@tabler/icons-react";

export function StudentsListPage() {
  const theme = useMantineTheme();

  // Modals
  const openModalUploadStudent = () =>
    modals.openConfirmModal({
      title: "Upload de Aluno",
      children: (
        <>
          <Group mb={10}>
            <Text size="sm">
              Para fazer upload de aluno em lote é necessário seguir o template
              de cadastro de aluno.
            </Text>
            <Text c="blue.6" size="sm">
              Fazer download do template &#32;
              <IconFileDownload size={rem(18)} />
            </Text>
          </Group>

          <Group mb={10}>
            <Text size="sm">
              Selecione o arquivo do template de Cadastro de Aluno.
            </Text>
            <FileInput
              style={{ width: '100%' }}
              placeholder="Selecione o arquivo"
              rightSection={<IconPaperclip size={rem(14)} />}
            />
          </Group>

          <Group>
            <Text size="sm">
              Selecione a turma que deseja adicionar os alunos do template.
            </Text>
            <Select
              placeholder="Selecione a turma"
              data={[]}
              style={{ width: "100%" }}
            />
          </Group>
          <HorizontalRule />
        </>
      ),
      labels: { confirm: "Sim", cancel: "Não" }
    });

  const openModalAuthorizeNewTest = () => {
    modals.openConfirmModal({
      title: "Autorizar Nova Prova",
      children: (
        <>
          <Text size="sm">
            Deseja que o sistema permita o(s) aluno(s)
            selecionado(s) à realizarem uma nova prova?
          </Text>
          <HorizontalRule />
        </>
      ),
      labels: { confirm: "Sim", cancel: "Não" }
    })
  }
  const openModalDeleteStudent = () =>
    modals.openConfirmModal({
      title: 'Excluir',
      children: (
        <>
          <Text size="sm">
            Deseja excluir o(s) alunos(s) selecionado(s)?
          </Text>
          <HorizontalRule />
        </>
      ),
      labels: { confirm: "Sim", cancel: "Não" },
    })

  // TODO: get real data:
  const students = {
    items: [
      {
        id: "1",
        name: "Amanda Freitas Dias",
        status: "ACTIVE",
        class: "1º A",
        period: "Manhã",
        serie: "Infantil",
        cfo: "30%",
        sea: "30%",
        lct: "30%",
      },
    ],
    pagination: {
      totalPages: 1,
    },
  };

  return (
    <>
      <PageHeader title="Alunos">
        <Button
          variant="outline"
          onClick={openModalUploadStudent}
        >
          Upload aluno
        </Button>
        <Link to={`${PATH.STUDENTS}/novo-aluno`}>
          <Button>Novo aluno</Button>
        </Link>
      </PageHeader>

      <Group>
        <Button
          size="xs"
          variant="outline"
          color="red"
          onClick={openModalDeleteStudent}
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
              <Checkbox />
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
              <InfoTooltip text="SEA" tooltipText="Sistema de Escrita Alfabética" />
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              <InfoTooltip text="LCT" tooltipText="Leitura e Compreensão de Texto" />
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
          {students?.items.map((student) => (
            <tr key={student.id}>
              <td>
                <Checkbox />
              </td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.period}</td>
              <td>{student.serie}</td>
              <td>{student.cfo}</td>
              <td>{student.sea}</td>
              <td>{student.lct}</td>
              <td>{student.status === "ACTIVE" ? "Ativo" : "Inativo"}</td>
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

      {/* TODO: commented while backend is not ready */}
      {/* {students && <Pagination paginationApi={users.pagination} paginationHook={pagination} /> } */}
    </>
  );
}
