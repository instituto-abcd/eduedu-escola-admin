import {
  Modal,
  Table,
  Center,
  LoadingOverlay,
  Text,
  Anchor,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuditGet } from "~/api/audit";
import { Pagination } from "~/components/Pagination";
import { PATH } from "~/constants/path";
import { usePagination } from "~/hooks/usePagination";
import { errorNotification } from "~/utils/errorNotification";

type ModalProps = {
  opened: boolean;
  onClose: () => void;
};

export function AuditModal({ opened, onClose }: ModalProps) {
  const pagination = usePagination();
  const { data, isLoading } = useAuditGet({
    onError: (error) =>
      errorNotification("Erro durante a operação", error.message),

    page: pagination.page,
    pageSize: pagination.pageSize,
  });

  return (
    <Modal
      title="Gestão de Auditoria"
      opened={opened}
      onClose={onClose}
      size={843}
    >
      <LoadingOverlay visible={isLoading} m="md" />
      <Table horizontalSpacing="sm" verticalSpacing="md" mb={20}>
        <thead>
          <tr>
            <th>Id Usuário</th>
            <th>Entidade</th>
            <th>Operação</th>
            <th>Data/Hora</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((item) => (
            <tr key={item.id}>
              <td>
                <Anchor
                  component={Link}
                  to={`${PATH.USERS}/${item.userId}`}
                  size="sm"
                >
                  {item.userId}
                </Anchor>
              </td>
              <td>
                <Text size="sm">{item.entity}</Text>
              </td>
              <td>
                <Text size="sm">{item.action}</Text>
              </td>
              <td>
                <Text size="sm">
                  {new Date(item.createdAt).toLocaleString("pt-BR")}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data && (
        <Center>
          <Pagination
            paginationApi={data.pagination}
            paginationHook={pagination}
          />
        </Center>
      )}
    </Modal>
  );
}
