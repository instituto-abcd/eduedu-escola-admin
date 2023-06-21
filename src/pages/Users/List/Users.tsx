import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserDelete, useUserGetAll, useUserInactivate } from "~/api/user";
import { PROFILE_SELECT, STATUS_SELECT, USER_PROFILE } from "~/constants";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { usePagination } from "~/hooks/usePagination";
import { Pagination } from "~/components/Pagination";
import { modals } from "@mantine/modals";
import { PageHeader } from "~/components/PageHeader";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Select,
  Space,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

export function UsersListPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const theme = useMantineTheme();

  function toggleSelected(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  const pagination = usePagination()
  const { data: users } = useUserGetAll({
    search: { "page-number": pagination.page, "page-size": pagination.pageSize },
    onError: (error) => errorNotification("Erro", error.message),
  });

  const { mutate: deleteUser, isLoading: isDeleting } = useUserDelete({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification(
        "Sucesso",
        `${selected.length} Usuário(s) inativado(s) com sucesso!`
      );
      setSelected([]);
    },
  });

  const { mutate: inactivateUser, isLoading: isInactivating } =
    useUserInactivate({
      onError: (error) => {
        errorNotification("Erro", `${error.message} (cod: ${error.code})`);
      },
      onSuccess: () => {
        successNotification(
          "Sucesso",
          `${selected.length} Usuário(s) inativado(s) com sucesso!`
        );
        setSelected([]);
      },
    });

  const openModalDeleteUser = () =>
    modals.openConfirmModal({
      title: "Excluir",
      children: <Text>Deseja excluir o(s) usuários(s) selecionado(s)?</Text>,
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => {
        deleteUser(selected);
      },
    });

  const openModalInactivateteUser = () =>
    modals.openConfirmModal({
      title: "Inativar",
      children: <Text>Deseja Inativar o(s) usuários(s) selecionado(s)?</Text>,
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => inactivateUser(selected),
    });

  return (
    <>
      <PageHeader
        title="Usuários"
        description={`${users?.pagination.totalItems} registros` ?? ""}
        mbDescription="0"
      >
        <Button component={Link} to="/usuarios/novo-usuario">
          Novo usuário
        </Button>
      </PageHeader>

      {selected.length > 0 ? (
        <Group>
          <Button
            size="xs"
            color="red"
            variant="outline"
            onClick={openModalDeleteUser}
            loading={isDeleting}
          >
            Excluir
          </Button>
          <Button
            size="xs"
            color="blue.6"
            variant="outline"
            onClick={openModalInactivateteUser}
            loading={isInactivating}
          >
            Inativar
          </Button>
        </Group>
      ) : (
        <Space h="xs" />
      )}

      <Table horizontalSpacing="sm" verticalSpacing="md">
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={() =>
                  setSelected(users?.items.map((u) => u.id) ?? [])
                }
              />
            </th>
            <th>
              Nome
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Email
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              CPF
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Perfil
              <Select data={PROFILE_SELECT} placeholder="Pesquisar" />
            </th>
            <th>
              Status
              <Select data={STATUS_SELECT} placeholder="Pesquisar" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.items.map((user) => (
            <tr key={user.id}>
              <td>
                <Checkbox
                  checked={selected.includes(user.id)}
                  onChange={() => toggleSelected(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.document}</td>
              <td>{USER_PROFILE[user.profile]}</td>
              <td>{user.status === "ACTIVE" ? "Ativo" : "Inativo"}</td>
              <td>
                <ActionIcon
                  component={Link}
                  to={`/usuarios/${user.id}`}
                  state={{ user }}
                >
                  <IconEdit color={theme.colors.blue[9]} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {users && <Pagination paginationApi={users.pagination} paginationHook={pagination} />}
    </>
  );
}
