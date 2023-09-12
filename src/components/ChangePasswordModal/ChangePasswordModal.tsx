import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  PasswordInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { UserChangePassword, useUserChangePassword } from "~/api/auth";
import { PATH } from "~/constants/path";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { Text } from "@mantine/core";
import { useState } from "react";

type Props = {
  opened: boolean;
  onClose(): void;
  token: string;
};

export function ChangePasswordModal({ opened, onClose, token }: Props) {
  const navigate = useNavigate();
  const [passwordStrengthValidationMessage, setpasswordStrengthValidationMessage] = useState('');

  const { mutate: changePassword, isLoading } = useUserChangePassword({
    onSuccess: () => {
      successNotification("Operação realizada com sucesso", "Senha alterada com sucesso!");
      navigate(PATH.LOGIN);
      onClose()
    },
    onError: (error) => {
      if (error.code == 'WEAK_PASSWORD') {
        setpasswordStrengthValidationMessage(() => (
          error.message
        ));
      } else {
        errorNotification("Erro durante a operação", `${error.message}`);
      }
    },
  });

  const formChangePassword = useForm<UserChangePassword>({
    initialValues: {
      password: "",
      passwordConfirmation: "",
      token,
    },
    validate: zodResolver(
      z.object({
        passwordConfirmation: z
          .string()
          .min(1, { message: "Insira uma senha" }),
        password: z.string().min(1, { message: "Insira uma senha" }),
      })
    ),
  });

  return (
    <Modal
      opened={opened}
      onClose={isLoading ? () => { } : onClose}
      title="Redefinir Senha"
      size="sm"
      withCloseButton={false}
      closeOnEscape={false}
    >
      <form
        onSubmit={formChangePassword.onSubmit((values) => {
          changePassword(values);
        })}
      >
        <LoadingOverlay visible={isLoading} m={5} />
        <PasswordInput
          label="Nova senha"
          placeholder="Senha"
          {...formChangePassword.getInputProps("password")}
          style={{ marginBottom: "20px" }}
        />
        <PasswordInput
          label="Repita a senha"
          placeholder="Senha"
          {...formChangePassword.getInputProps("passwordConfirmation")}
        />
        <Divider my="xl" />
        <Text
            size={14}
            dangerouslySetInnerHTML={{ __html: passwordStrengthValidationMessage }}
            color="red"
        />
        <Group position="right">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </Group>
      </form>
    </Modal>
  );
}
