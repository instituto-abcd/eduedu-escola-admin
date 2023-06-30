import {
  Modal,
  Stack,
  Divider,
  Group,
  Button,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useSchoolClassDelete } from "~/api/school-class";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

type Props = {
  opened: boolean;
  onClose(): void;
  classIds: string[];
};

export function DeleteClassModal({ opened, onClose, classIds }: Props) {
  const { mutate, isLoading } = useSchoolClassDelete({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        "Turma(s) excluída(s) com sucesso!"
      );
      onClose();
    },
    onError: () => {
      errorNotification(
        "Erro durante a operação",
        "Ocorreu um erro durante o processo, por favor refaça a operação."
      );
      onClose();
    },
  });

  return (
    <Modal
      opened={opened}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={isLoading ? () => { } : onClose}
      title="Excluir"
      radius="md"
    >
      <Stack>
        <Text size="sm">Deseja excluir a(s) turmas(s) selecionada(s)?</Text>
        <Text color="dimmed">{classIds.length} turmas serão excluídas.</Text>

        <Divider />
        <Group position="right">
          <Button variant="outline" onClick={onClose}>
            Não
          </Button>
          <Button onClick={() => mutate(classIds)}>Sim</Button>
        </Group>
        <LoadingOverlay visible={isLoading} />
      </Stack>
    </Modal>
  );
}
