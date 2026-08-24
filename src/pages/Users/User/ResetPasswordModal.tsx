import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useUserResetPasswordByDirector } from "~/api/user";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

const schema = z.object({
  newPassword: z.string().min(1, { message: "Informe a nova senha" }),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  opened: boolean;
  onClose: () => void;
  userId: string;
};

export function ResetPasswordModal({ opened, onClose, userId }: Props) {
  const form = useForm<FormValues>({
    initialValues: { newPassword: "" },
    validate: zodResolver(schema),
  });

  const { mutate, isLoading } = useUserResetPasswordByDirector({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        "Usuário alterado com sucesso!",
      );
      form.reset();
      onClose();
    },
    onError: (error) => {
      errorNotification("Erro durante a operação", error.message);
    },
  });

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Redefinir senha"
      size="sm"
      centered
    >
      <form
        onSubmit={form.onSubmit((values) =>
          mutate({ userId, newPassword: values.newPassword }),
        )}
      >
        <Stack spacing="md">
          <Text size="sm">Digite a nova senha no campo abaixo</Text>

          <PasswordInput
            placeholder="Nova senha"
            autoFocus
            {...form.getInputProps("newPassword")}
          />

          <Group position="right" spacing="sm">
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading}>
              Salvar
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
