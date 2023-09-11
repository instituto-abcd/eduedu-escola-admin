
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { PATH } from "~/constants/path";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  PasswordInput,
} from "@mantine/core";
import { UpdatePasswordInput, useUserUpdatePassword } from "~/api/user";
import { Text } from "@mantine/core";
import { useState } from "react";

type Props = {
  opened: boolean;
  onClose(): void;
  token: string;
};

export function ChangePasswordLoggedModal({ opened, onClose, token }: Props) {
  const navigate = useNavigate();
  const [passwordStrengthValidationMessage, setpasswordStrengthValidationMessage] = useState('');

  const { mutate: changePassword, isLoading } = useUserUpdatePassword({
    onSuccess: () => {
      successNotification("Operação realizada com sucesso", "Senha alterada com sucesso!");
      navigate(PATH.LOGIN);
      onClose()
    },
    onError: (error) => {
      console.log(error);
      if (error.code == 'WEAK_PASSWORD') {
        setpasswordStrengthValidationMessage(() => (
          error.message
        ));
      } else {
        errorNotification("Erro durante a operação", `${error.message}`);
      }
    },
  });

  const formChangePassword = useForm<UpdatePasswordInput>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validate: zodResolver(
      z.object({
        passwordConfirmation: z
          .string()
          .min(1, { message: "Senha Inválida" }),
        password: z.string().min(1, { message: "Senha Inválida" }),
      })
    ),
  });

  return (
    <Modal
      opened={opened}
      onClose={isLoading ? () => { } : onClose}
      title="Redefinir Senha"
      size="sm"
    >
      <form
        onSubmit={formChangePassword.onSubmit((values) => {
          changePassword(values);
        })}
      >
        <LoadingOverlay visible={isLoading} m={5} />
        <PasswordInput
          label="Senha Atual"
          placeholder="Senha"
          {...formChangePassword.getInputProps("password")}
          style={{ marginBottom: "20px" }}
        />
        <PasswordInput
          label="Nova Senha"
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
          {/* TODO: set the "saveBtn" as disabled while empty inputs */}
          <Button type="submit">Salvar</Button>
        </Group>
      </form>
    </Modal>
  );
}
