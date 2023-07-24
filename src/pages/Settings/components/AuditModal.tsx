import {
  Modal,
  Table,
  Center,
  LoadingOverlay,
  Text,
  Anchor,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuditGet } from "~/api/audit";
import { Pagination } from "~/components/Pagination";
import { TableHeader } from "~/components/TableHeader";
import { TableLoader } from "~/components/TableLoader";
import { PATH } from "~/constants/path";
import { usePagination } from "~/hooks/usePagination";
import { errorNotification } from "~/utils/errorNotification";

type ModalProps = {
  opened: boolean;
  onClose: () => void;
};

export function AuditModal({ opened, onClose }: ModalProps) {
  const [search, setSearch] = useState({});
  const pagination = usePagination();

  const { data, isLoading } = useAuditGet({
    onError: (error) =>
      errorNotification("Erro durante a operação", error.message),

    page: pagination.page,
    pageSize: pagination.pageSize,
    search,
  });

  return (
    <Modal
      title="Gestão de Auditoria"
      opened={opened}
      onClose={onClose}
      size={843}
    >
      <Table horizontalSpacing="sm" verticalSpacing="md" mb={20}>
        <thead>
          <TableHeader
            columns={[
              { label: "Id Usuário", type: "text", searchTerm: "userId" },
              { label: "Entidade", type: "text", searchTerm: "entity" },
              { label: "Operação", type: "text", searchTerm: "action" },
              { label: "Data", type: "date", searchTerm: "createdAt" },
            ]}
            onValueChange={setSearch}
          />
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

      <TableLoader
        loading={isLoading}
        empty={!data || data.items.length === 0}
      />

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
