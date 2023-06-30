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
  Divider,
  Group,
  Select,
  Space,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { PATH } from "~/constants/path";
import { TableLoader } from "~/components/TableLoader";

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

  const pagination = usePagination();
  const { data: users, isLoading: loadingUsers } = useUserGetAll({
    search: {
      "page-number": pagination.page,
      "page-size": pagination.pageSize,
    },
    onError: (error) => errorNotification("Erro durante a operação", error.message),
  });

  const { mutate: deleteUser, isLoading: isDeleting } = useUserDelete({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        `${selected.length} Usuário(s) excluído(s)com sucesso!`
      );
      setSelected([]);
    },
    onError: (error) => {
      errorNotification("Erro durante a operação", `${error.message} (cod: ${error.code})`);
    },
  });

  const { mutate: inactivateUser, isLoading: isInactivating } =
    useUserInactivate({
      onSuccess: () => {
        successNotification(
          "Operação realizada com sucesso",
          `${selected.length} Usuário(s) inativado(s) com sucesso!`
        );
        setSelected([]);
      },
      onError: (error) => {
        errorNotification("Erro durante a operação", `${error.message} (cod: ${error.code})`);
      },
    });

  const openModalDeleteUser = () =>
    modals.openConfirmModal({
      title: "Excluir",
      children: (
        <>
          <Text mb={20}>Deseja excluir o(s) usuários(s) selecionado(s)?</Text>
          <Divider />
        </>
      ),
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => {
        deleteUser(selected);
      },
    });

  const openModalInactivateteUser = () =>
    modals.openConfirmModal({
      title: "Inativar",
      children: (
        <>
          <Text mb={20}>Deseja Inativar o(s) usuários(s) selecionado(s)?</Text>
          <Divider />
        </>
      ),
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
                onChange={(e) =>
                  e.currentTarget.checked
                    ? setSelected(users?.items.filter(u => !u.owner).map((u) => u.id) ?? [])
                    : setSelected([])
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
                  disabled={user.owner == true ? true : false}
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

      <TableLoader
        loading={loadingUsers}
        empty={!users || users.items.length === 0}
        link={{ to: PATH.NEW_USER, label: "Cadastrar novo usuário" }}
      />

      {users && (
        <Pagination
          paginationApi={users.pagination}
          paginationHook={pagination}
        />
      )}
    </>
  );
}
