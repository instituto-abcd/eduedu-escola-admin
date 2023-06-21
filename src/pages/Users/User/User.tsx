import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { User, UserInput, useGetAccessKey, useUpdateAccessKey, useUserCreate, useUserUpdate } from "~/api/user";
import { PATH } from "~/constants/path";
import { PROFILE_SELECT, STATUS_SELECT } from "~/constants";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import {
  Button,
  Grid,
  Group,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconRefresh } from "@tabler/icons-react";
import { PageHeader } from "~/components/PageHeader";

const userInputValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
    .max(255, { message: "Nome deve ter no máximo 255 caracteres" }),
  document: z
    .string()
    .length(11, { message: "CPF deve ter 11 caracteres" })
    .regex(/^\d+$/, { message: "CPF deve conter apenas números" }),

  email: z.string().email({ message: "Insira um e-mail válido" }),

  profile: z.enum(["DIRECTOR", "TEACHER"]),
});

export function UserPage() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const editingUser = useLocation().state?.user as User | undefined;

  const { mutate: createUser, isLoading: isCreateLoading } = useUserCreate({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification("Sucesso", "Usuário criado com sucesso!");
      navigate(PATH.USERS);
    },
  });

  const { mutate: updateUser, isLoading: isUpdateLoading } = useUserUpdate({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification("Sucesso", "Usuário atualizado com sucesso!");
    },
  });

  const [accessKey, setAccessKey] = useState<string>();

  // TODO: solve here the "commponent is changing an uncontrolled input to be controlled"
  const { mutate: getAccessKey, isLoading: isGetAccessKey } = useGetAccessKey({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: (data) => {
      setAccessKey(data?.accessKey)
      successNotification("Sucesso", "Código de acesso atualizado com sucesso!");
    },
  })
  // getAccessKey(editingUser?.id)

  const { mutate: updateAccessKey, isLoading: isUpdateAccessKey } = useUpdateAccessKey({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: (data) => {
      setAccessKey(data?.accessKey)
      successNotification("Sucesso", "Código de acesso atualizado com sucesso!");
    },
  })

  const form = useForm<UserInput>({
    initialValues: {
      name: editingUser?.name ?? "",
      document: editingUser?.document ?? "",
      email: editingUser?.email ?? "",
      profile: editingUser?.profile ?? ("" as "DIRECTOR" | "TEACHER"),
    },
    validate: zodResolver(userInputValidation),
  });

  return (
    <>
      <PageHeader title={editingUser ? editingUser.name : "Novo usuário"}>
        <Link to="/usuarios" style={{ textDecoration: "none" }}>
          Retornar a página de Usuários
        </Link>
      </PageHeader>

      <form
        onSubmit={form.onSubmit((values) => {
          if (editingUser) {
            updateUser({ userId: editingUser.id, input: values });
          } else {
            createUser(values);
          }
        })}
      >
        <Grid columns={4}>
          <Grid.Col span={1}>
            <TextInput
              label="Nome"
              placeholder="Nome"
              {...form.getInputProps("name")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <TextInput
              label="CPF"
              placeholder="CPF"
              {...form.getInputProps("document")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <TextInput
              label="Email"
              placeholder="Email"
              {...form.getInputProps("email")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <Select
              data={PROFILE_SELECT}
              label="Perfil"
              placeholder="Selecione"
              {...form.getInputProps("profile")}
            />
          </Grid.Col>

          {/* --- Editing user exclusive inputs --- */}
          {editingUser && (
            <>
              <Grid.Col span={1}>
                <Select
                  data={STATUS_SELECT}
                  label="Status"
                  placeholder="Selecione"
                  value={editingUser?.status}
                  disabled
                />
              </Grid.Col>
              {editingUser.profile === "TEACHER" && (
                <Grid.Col span={2}>
                  <TextInput
                    label="Salas Associadas"
                    value="1º A - 2023, 1º B - 2023, 1º C - 2023"
                    disabled
                  />
                </Grid.Col>
              )}
              <Grid.Col span={1}>
                <div style={{ position: "relative" }}>
                  <TextInput
                    label="Código de Acesso"
                    value={accessKey}
                    disabled
                  />
                  <IconRefresh
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "3%",
                      width: "20px",
                    }}
                    color={theme.colors.blue[9]}
                    onClick={() => { updateAccessKey(editingUser?.id) }}
                  />
                </div>
              </Grid.Col>
            </>
          )}
        </Grid>
        <Group position="right" mt={30}>
          <Link to="/usuarios">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button
            type="submit"
            disabled={
              Object.values(form.values).includes("") || !form.isDirty()
            }
            loading={isUpdateLoading || isCreateLoading}
          >
            Salvar
          </Button>
        </Group>
      </form>
    </>
  );
}
