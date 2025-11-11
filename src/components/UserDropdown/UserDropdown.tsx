import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { USER_PROFILE } from "~/constants";
import { useUserStore } from "~/stores/user";
import { AccessKeyInput } from "../AccessKeyInput";
import { useForm, zodResolver } from "@mantine/form";
import { UpdatePasswordInput, useUserUpdatePassword } from "~/api/user";
import { z } from "zod";
import { successNotification } from "~/utils/successNotification";
import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Menu,
  Modal,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { errorNotification } from "~/utils/errorNotification";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserDropdown() {
  const { name: userName, profile } = useUserStore();
  const storeLogout = useUserStore((u) => u.signOut);
  const [updatePwModalOpen, updatePwModalHandlers] = useDisclosure(false);
  const [
    passwordStrengthValidationMessage,
    setpasswordStrengthValidationMessage,
  ] = useState("");

  const { mutate: updatePassword, isLoading } = useUserUpdatePassword({
    onSuccess: () => {
      updatePwModalHandlers.close();
      successNotification(
        "Operação realizada com sucesso",
        "Senha alterada com sucesso!",
      );
    },
    onError: (error) => {
      if (error.code == "WEAK_PASSWORD") {
        setpasswordStrengthValidationMessage(() => error.message);
      } else {
        errorNotification("Erro durante a operação", `${error.message}`);
      }
    },
  });

  const updatePwForm = useForm<UpdatePasswordInput>({
    initialValues: {
      newPassword: "",
      oldPassword: "",
    },

    validate: zodResolver(
      z.object({
        newPassword: z
          .string()
          .min(6, { message: "Senha deve ter ao menos 6 caracteres" }),
        oldPassword: z.string().min(1, {
          message: "Nova senha não pode ser igual a senha anterior",
        }),
      }),
    ),
  });

  /* Logout */
  function signOut() {
    storeLogout();
    location.replace("/login");
  }

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Button compact variant="white" color="dark">
          <Group noWrap align="baseline">
            <Group spacing={2} noWrap>
              <Text size="sm" weight={600}>
                {userName}&nbsp;
              </Text>
              <Text size="xs" weight={500}>
                ({USER_PROFILE[profile]})
              </Text>
            </Group>
            <IconChevronDown width={20} height={20} />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown p="md">
        <Stack spacing="md">
          <Text weight={700}>{userName}</Text>
          <AccessKeyInput styled />
          <Stack spacing={12} mt={12}>
            <Button
              size="xs"
              variant="outline"
              onClick={updatePwModalHandlers.open}
            >
              Redefinir Senha
            </Button>
            <Button size="xs" variant="outline" onClick={signOut}>
              Sair
            </Button>
          </Stack>
        </Stack>
      </Menu.Dropdown>

      <Modal
        opened={updatePwModalOpen}
        onClose={isLoading ? () => {} : updatePwModalHandlers.close}
        title="Alterar senha"
        size="sm"
      >
        <form
          onSubmit={updatePwForm.onSubmit((values) => {
            updatePassword(values);
          })}
        >
          <LoadingOverlay visible={isLoading} m={5} />
          <PasswordInput
            label="Senha Atual"
            placeholder="Senha"
            {...updatePwForm.getInputProps("oldPassword")}
            style={{ marginBottom: "20px" }}
          />
          <PasswordInput
            label="Nova Senha"
            placeholder="Senha"
            {...updatePwForm.getInputProps("newPassword")}
          />
          <Divider my="xl" />
          <Text
            size={14}
            dangerouslySetInnerHTML={{
              __html: passwordStrengthValidationMessage,
            }}
            color="red"
          />
          <Group position="right">
            <Button variant="outline" onClick={updatePwModalHandlers.close}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </Group>
        </form>
      </Modal>
    </Menu>
  );
}
