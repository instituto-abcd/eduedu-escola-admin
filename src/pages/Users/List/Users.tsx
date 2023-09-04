import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllUsersMutation, useUserActivate, useUserDelete, useUserGetAll, useUserInactivate } from "~/api/user";
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
  Space,
  Table,
  Text,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { PATH } from "~/constants/path";
import { TableLoader } from "~/components/TableLoader";
import { TableHeader } from "~/components/TableHeader";

export function UsersListPage() {

  const theme = useMantineTheme();
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
  const [users, setUsers] = useState({});

  const { mutate: getUsersMutation, isLoading: loadingUsers } = useGetAllUsersMutation({
    search: {
      ...search,
      "page-number": pagination.page,
      "page-size": pagination.pageSize,
    },
    onSuccess(data, variables, context) {
      setUsers(data)
    },
  })

  const { mutate: deleteUser, isLoading: isDeleting } = useUserDelete({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        `${selected.length} Usuário(s) excluído(s)com sucesso!`
      );
      setSelected([]);
    },
    onError: (error) => {
      errorNotification(
        "Erro durante a operação",
        `${error.message} (cod: ${error.code})`
      );
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
        getUsersMutation({
          search: {
            ...search,
            "page-number": pagination.page,
            "page-size": pagination.pageSize,
          },
        })
      },
      onError: (error) => {
        errorNotification(
          "Erro durante a operação",
          `${error.message} (cod: ${error.code})`
        );
      },
    });

  const { mutate: activateUser, isLoading: isActivating } =
    useUserActivate({
      onSuccess: () => {
        successNotification(
          "Operação realizada com sucesso",
          `${selected.length} Usuário(s) ativado(s) com sucesso!`
        );
        setSelected([]);
        getUsersMutation({
          search: {
            ...search,
            "page-number": pagination.page,
            "page-size": pagination.pageSize,
          },
        })
      },
      onError: (error) => {
        errorNotification(
          "Erro durante a operação",
          `${error.message} (cod: ${error.code})`
        );
      },
    });

  useEffect(() => {
    getUsersMutation({
      search: {
        ...search,
        "page-number": pagination.page,
        "page-size": pagination.pageSize,
      },
    })
  }, []);

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

  const openModalActivateteUser = () =>
    modals.openConfirmModal({
      title: "Inativar",
      children: (
        <>
          <Text mb={20}>Deseja ativar o(s) usuários(s) selecionado(s)?</Text>
          <Divider />
        </>
      ),
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => {
        selected.forEach(element => {
          activateUser(element)
        });
      },
    });

  return (
    <Stack>
      <PageHeader
        title="Usuários"
        description={`${users?.pagination?.totalItems} registros` ?? ""}
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
          <Button
            size="xs"
            color="blue.6"
            variant="outline"
            onClick={openModalActivateteUser}
            loading={isActivating}
          >
            Ativar
          </Button>
        </Group>
      ) : (
        <Space h="xs" />
      )}

      <Table horizontalSpacing="sm" verticalSpacing="md">
        <thead>
          <TableHeader
            onValueChange={setSearch}
            columns={[
              {
                label: "Nome",
                type: "text",
                searchTerm: "name",
              },
              {
                label: "E-mail",
                type: "text",
                searchTerm: "email",
              },
              {
                label: "CPF",
                type: "text",
                searchTerm: "document",
              },
              {
                label: "Perfil",
                type: "select",
                searchTerm: "profile",
                inputProps: {
                  data: PROFILE_SELECT,
                },
              },
              {
                label: "Status",
                type: "select",
                searchTerm: "status",
                inputProps: {
                  data: STATUS_SELECT,
                },
              },
              {
                label: "",
                type: "empty",
                searchTerm: "",
              },
            ]}
            onCheckAll={(checked) =>
              checked
                ? setSelected(
                  users?.items?.filter((u) => !u.owner).map((u) => u.id) ?? []
                )
                : setSelected([])
            }
          />
        </thead>
        <tbody>
          {users?.items?.map((user) => (
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
        empty={!users || users?.items?.length === 0}
        link={{ to: PATH.NEW_USER, label: "Cadastrar novo usuário" }}
      />

      {users?.pagination && (
        <Pagination
          paginationApi={users?.pagination}
          paginationHook={pagination}
        />
      )}
    </Stack>
  );
}
