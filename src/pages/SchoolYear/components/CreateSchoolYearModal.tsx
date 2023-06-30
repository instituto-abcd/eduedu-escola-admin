import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useSchoolYearCreate } from "~/api/school-year";
import { errorNotification } from "~/utils/errorNotification";

type ModalProps = {
  opened: boolean;
  onClose: () => void;
};

export function CreateSchoolYearModal({ opened, onClose }: ModalProps) {
  const { mutate: createSchoolYear, isLoading } = useSchoolYearCreate({
    onError: (error) => {
      errorNotification("Erro durante a operação", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: onClose,
  });

  return (
    <Modal
      opened={opened}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={isLoading ? () => { } : onClose}
      size={589}
      px={24}
      py={12}
      title="Novo Ano Letivo"
    >
      <Stack spacing={12}>
        <LoadingOverlay visible={isLoading} />
        <Text size="sm" mb={12}>
          Ao adicionar um novo ano letivo, o ano letivo atual terá todas as turmas clonadas.
          Caso seu novo ano letivo tenha mais ou menos turmas, edite-as no menu turmas.
        </Text>
        <Text size="sm">Deseja continuar e adicionar um novo ano letivo?</Text>
        <Divider mt={20} />
        <Group position="right">
          <Button size="sm" variant="outline" onClick={onClose}>
            Não
          </Button>
          <Button size="sm" onClick={() => createSchoolYear()}>
            Sim
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
