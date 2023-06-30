import {
  Button,
  Card,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarPause } from "@tabler/icons-react";
import {
  SchoolYear,
  useSchoolYearActivate,
  useSchoolYearDelete,
} from "~/api/school-year";
import { errorNotification } from "~/utils/errorNotification";

type SchoolYearCardProps = {
  data: SchoolYear;
};

export function SchoolYearCard({ data }: SchoolYearCardProps) {
  const theme = useMantineTheme();

  const colorByStatus: Record<SchoolYear["status"], string> = {
    ACTIVE: theme.colors.indigo[9],
    DRAFT: theme.colors.yellow[6],
    INACTIVE: theme.colors.red[4],
  };

  const labelByStatus: Record<SchoolYear["status"], string> = {
    ACTIVE: "Ativo",
    DRAFT: "Rascunho",
    INACTIVE: "Finalizado",
  };

  const [deleteModalOpen, deleteModalHandlers] = useDisclosure(false);

  const { mutate: deleteSchoolYear, isLoading: isDeleting } =
    useSchoolYearDelete({
      onError: (error) => {
        errorNotification("Erro durante a operação", `${error.message} (cod: ${error.code})`);
      },
      onSuccess: deleteModalHandlers.close,
    });

  const { mutate: activate, isLoading: isActivateLoading } =
    useSchoolYearActivate({
      onError: (error) => {
        errorNotification("Erro durante a operação", `${error.message} (cod: ${error.code})`);
      },
    });

  return (
    <Card px={20} py={16} h={163}>
      <Stack h="100%" spacing={10}>
        {/* Header */}
        <Group position="apart" noWrap>
          <Group spacing={10} noWrap>
            {/* TODO: dynamic icon */}
            <IconCalendarPause size={20} color={colorByStatus[data.status]} />
            <Text
              size="sm"
              color={colorByStatus[data.status]}
              weight={500}
              inline
            >
              {new Date(data.createdAt).getFullYear()}
            </Text>
          </Group>
          {data.status === "DRAFT" && (
            <Group noWrap>
              <Button
                size="xs"
                variant="light"
                color="red"
                onClick={deleteModalHandlers.open}
              >
                Excluir
              </Button>
              <Button
                size="xs"
                variant="light"
                onClick={() => activate(data.id)}
                disabled={!data.summary.buttonEnabled}
              >
                Ativar
              </Button>
            </Group>
          )}

          {data.status !== "DRAFT" && (
            <Text weight={500} size="sm" color={colorByStatus[data.status]}>
              {labelByStatus[data.status]}
            </Text>
          )}
        </Group>

        {/* Summaries */}
        <Group noWrap position="apart" mb={6}>
          <Stack align="center" spacing={6}>
            <Text size="sm" color="gray.6">
              Turmas
            </Text>
            <Text size="sm" color="gray.9" weight={500}>
              {data.summary.totalSchoolClasses}
            </Text>
          </Stack>
          <Stack align="center" spacing={6}>
            <Text size="sm" color="gray.6">
              Alunos
            </Text>
            <Text size="sm" color="gray.9" weight={500}>
              {data.summary.totalStudents}
            </Text>
          </Stack>
          <Stack align="center" spacing={6}>
            <Text size="sm" color="gray.6">
              Professores
            </Text>
            <Text size="sm" color="gray.9" weight={500}>
              {data.summary.totalTeachers}
            </Text>
          </Stack>
        </Group>

        {/* Action */}
        {data.status === "INACTIVE" && (
          <Button fullWidth size="sm" compact variant="light" radius="sm">
            Ver Histórico
          </Button>
        )}
        {data.status === "ACTIVE" && (
          <Button fullWidth size="sm" compact variant="light" radius="sm">
            Ver Detalhes
          </Button>
        )}
      </Stack>

      {/* Delete Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={deleteModalHandlers.close}
        title="Excluir"
        radius="md"
      >
        <Stack>
          <Text size="sm">
            Deseja excluir o ano letivo selecionado?
            <br />
            Todas as informações cadastradas serão perdidas.
            <br />
            Deseja continuar?
          </Text>
          <Divider />
          <Group position="right">
            <Button variant="outline" onClick={deleteModalHandlers.close}>
              Não
            </Button>
            <Button onClick={() => deleteSchoolYear()}>Sim</Button>
          </Group>
          <LoadingOverlay visible={isDeleting} />
        </Stack>
      </Modal>

      {/* Activation loader */}
      <LoadingOverlay visible={isActivateLoading} />
    </Card>
  );
}
