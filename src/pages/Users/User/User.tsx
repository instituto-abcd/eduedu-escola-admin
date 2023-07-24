import { Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import {
  User,
  UserInput,
  useUserCreate,
  useUserGetById,
  useUserUpdate,
} from "~/api/user";
import { AccessKeyInput } from "~/components/AccessKeyInput";
import { PageHeader } from "~/components/PageHeader";
import { PROFILE_SELECT, STATUS_SELECT } from "~/constants";
import { PATH } from "~/constants/path";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

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
  const navigate = useNavigate();

  const editingUser = useLocation().state?.user as User | undefined;
  const params = useParams();
  const shouldFetchUser = Boolean(!editingUser && params.userId);

  const { data, isFetching: isLoadingUser } = useUserGetById(
    params.userId ?? "",
    {
      enabled: shouldFetchUser,
      onSuccess: (data) => {
        form.setValues(data);
        form.resetDirty();
      },
    }
  );

  const finalUser = shouldFetchUser ? data : editingUser;

  const { mutate: createUser, isLoading: isCreateLoading } = useUserCreate({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        "Usuário criado com sucesso!"
      );
      navigate(PATH.USERS);
    },
    onError: (error) => {
      errorNotification(
        "Erro durante a operação",
        `${error.message} (cod: ${error.code})`
      );
    },
  });

  const { mutate: updateUser, isLoading: isUpdateLoading } = useUserUpdate({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        "Usuário alterado com sucesso!"
      );
    },
    onError: (error) => {
      errorNotification(
        "Erro durante a operação",
        `${error.message} (cod: ${error.code})`
      );
    },
  });

  const form = useForm<UserInput>({
    initialValues: {
      name: finalUser?.name ?? "",
      document: finalUser?.document ?? "",
      email: finalUser?.email ?? "",
      profile: finalUser?.profile ?? ("" as "DIRECTOR" | "TEACHER"),
    },
    validate: zodResolver(userInputValidation),
  });

  return (
    <>
      <PageHeader title={finalUser ? finalUser.name : "Novo usuário"} />

      <form
        onSubmit={form.onSubmit((values) => {
          if (finalUser) {
            updateUser({ userId: finalUser.id, input: values });
          } else {
            createUser(values);
          }
        })}
      >
        <Grid columns={4}>
          <Grid.Col span={1}>
            <TextInput
              label="Nome"
              placeholder={isLoadingUser ? "Carregando..." : "Nome"}
              disabled={isLoadingUser}
              {...form.getInputProps("name")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <TextInput
              label="CPF"
              placeholder={isLoadingUser ? "Carregando..." : "CPF"}
              disabled={isLoadingUser}
              {...form.getInputProps("document")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <TextInput
              label="Email"
              placeholder={isLoadingUser ? "Carregando..." : "Email"}
              disabled={isLoadingUser}
              {...form.getInputProps("email")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <Select
              withinPortal
              data={PROFILE_SELECT}
              label="Perfil"
              placeholder={isLoadingUser ? "Carregando..." : "Selecione"}
              disabled={isLoadingUser}
              {...form.getInputProps("profile")}
            />
          </Grid.Col>

          {/* --- Editing user exclusive inputs --- */}
          {finalUser && (
            <>
              <Grid.Col span={1}>
                <Select
                  withinPortal
                  data={STATUS_SELECT}
                  label="Status"
                  placeholder="Selecione"
                  value={editingUser?.status}
                  disabled
                />
              </Grid.Col>
              {finalUser.profile === "TEACHER" && (
                <Grid.Col span={2}>
                  <TextInput
                    label="Salas Associadas"
                    value="1º A - 2023, 1º B - 2023, 1º C - 2023"
                    disabled
                  />
                </Grid.Col>
              )}
              <Grid.Col span={1}>
                <AccessKeyInput userId={finalUser?.id ?? ""} />
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
            disabled={!form.isDirty()}
            loading={isUpdateLoading || isCreateLoading}
          >
            Salvar
          </Button>
        </Group>
      </form>
    </>
  );
}
