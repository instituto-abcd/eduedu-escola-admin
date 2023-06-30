import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useStudentDelete } from "~/api/student";
import { errorNotification } from "~/utils/errorNotification";

type Props = {
  opened: boolean;
  onClose: () => void;
  studentIds: string[];
};

export function DeleteStudentModal({ opened, onClose, studentIds }: Props) {
  const { mutate, isLoading } = useStudentDelete({
    onSuccess: onClose,
    onError: (error) => errorNotification("Erro durante a operação", error.message),
  });

  return (
    <Modal
      opened={opened}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={isLoading ? () => { } : onClose}
      title="Excluir"
    >
      <Stack spacing={0}>
        <Text>Deseja excluir o(s) alunos(s) selecionado(s) ?</Text>

        <Text color="dimmed" size="xs">
          {studentIds.length} alunos serão excluídos.
        </Text>

        <Divider my="xl" />
        <Group position="right">
          <Button variant="outline" onClick={onClose}>
            Não
          </Button>
          <Button onClick={() => mutate(studentIds)}>Sim</Button>
        </Group>
        <LoadingOverlay visible={isLoading} />
      </Stack>
    </Modal>
  );
}
