import { Link, useLocation, useParams } from "react-router-dom";
import { PROFILE_SELECT, STATUS_SELECT } from "~/constants";
import { User, useUserCreate, useUserGetById, useUserUpdate } from "~/api/user";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { z } from "zod";
import { Anchor, Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AccessKeyInput } from "~/components/AccessKeyInput";
import { PageHeader } from "~/components/PageHeader";
import { useGetClassesByUser } from "~/api/school-class";
import { useUserStore } from "~/stores/user";
import { ResetPasswordModal } from "./ResetPasswordModal";

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

  profile: z.enum(["DIRECTOR", "TEACHER"], {
    errorMap: () => {
      return { message: "Por favor, selecione uma opção" };
    },
  }),
});

export function UserPage() {
  const params = useParams();
  const editingUser = useLocation().state?.user as User | undefined;
  const shouldFetchUser = Boolean(!editingUser && params.userId);

  const { data, isFetching: isLoadingUser } = useUserGetById(
    params.userId ?? "",
    {
      enabled: shouldFetchUser,
      onSuccess: (data) => {
        form.setValues(data);
        form.resetDirty();
      },
      onError: (error) => {
        errorNotification("Erro", error.message);
      },
    },
  );

  const finalUser = shouldFetchUser ? data : editingUser;

  const { mutate: createUser, isLoading: isCreateLoading } = useUserCreate({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        "Usuário criado com sucesso!",
      );
      form.reset();
    },
    onError: (error) => {
      errorNotification("Erro durante a operação", `${error.message}`);
    },
  });

  const { mutate: updateUser, isLoading: isUpdateLoading } = useUserUpdate({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        "Usuário alterado com sucesso!",
      );
    },
    onError: (error) => {
      errorNotification("Erro durante a operação", `${error.message}`);
    },
  });

  const { data: userClasses, isLoading: loadingUserClasses } =
    useGetClassesByUser(finalUser?.id ?? "", {
      enabled: !!finalUser,
    });

  const currentUserProfile = useUserStore((state) => state.profile);
  const [
    resetPasswordOpened,
    { open: openResetPassword, close: closeResetPassword },
  ] = useDisclosure(false);
  const canResetTeacherPassword =
    !!finalUser &&
    finalUser.profile === "TEACHER" &&
    currentUserProfile === "DIRECTOR";

  const form = useForm<z.infer<typeof userInputValidation>>({
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
        <Grid columns={4} align="flex-start">
          <Grid.Col span={1}>
            <TextInput
              label="Nome"
              description={<>&nbsp;</>}
              placeholder={isLoadingUser ? "Carregando..." : "Nome"}
              disabled={isLoadingUser}
              {...form.getInputProps("name")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <TextInput
              label="CPF"
              description="* Apenas números"
              placeholder={isLoadingUser ? "Carregando..." : "CPF"}
              disabled={isLoadingUser}
              inputMode="numeric"
              type="number"
              maxLength={11}
              {...form.getInputProps("document")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <TextInput
              label="Email"
              description={<>&nbsp;</>}
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
              description={<>&nbsp;</>}
              placeholder={isLoadingUser ? "Carregando..." : "Selecione"}
              disabled={
                isLoadingUser ? true : finalUser?.owner == true ? true : false
              }
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
                    value={
                      loadingUserClasses
                        ? "Carregando..."
                        : (userClasses?.names ?? "Sem turmas associadas")
                    }
                    disabled
                  />
                </Grid.Col>
              )}
              <Grid.Col span={1}>
                <AccessKeyInput userId={finalUser?.id ?? ""} />
              </Grid.Col>

              {canResetTeacherPassword && (
                <Grid.Col span={4}>
                  <Anchor
                    component="button"
                    type="button"
                    onClick={openResetPassword}
                  >
                    Redefinir senha
                  </Anchor>
                </Grid.Col>
              )}
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

      {finalUser && (
        <ResetPasswordModal
          opened={resetPasswordOpened}
          onClose={closeResetPassword}
          userId={finalUser.id}
        />
      )}
    </>
  );
}
