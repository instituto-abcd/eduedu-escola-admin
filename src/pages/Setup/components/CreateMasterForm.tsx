import {
  Stack,
  Grid,
  TextInput,
  Select,
  Divider,
  Group,
  Button,
  Text,
  Title,
  LoadingOverlay,
  Card,
  PasswordInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useSettingsCreateOwner } from "~/api/settings";
import { UserInput } from "~/api/user";
import { PROFILE_SELECT, USER_PROFILE } from "~/constants";
import { errorNotification } from "~/utils/errorNotification";

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

export function CreateMasterForm() {
  const { mutate, isLoading } = useSettingsCreateOwner({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
  });

  const form = useForm<UserInput>({
    initialValues: {
      name: "",
      email: "",
      document: "",
      profile: "DIRECTOR",
    },
    validate: zodResolver(userInputValidation),
  });

  return (
    <Card>
      <form onSubmit={form.onSubmit((v) => mutate(v))}>
        <Stack spacing="lg">
          <LoadingOverlay visible={isLoading} />
          <Title order={4}>
            Olá, seja bem-vindo ao Portal Administrativo Edu Edu
          </Title>
          <Text size="sm">
            É necessário cadastrar algumas informações obrigatórias para o
            correto funcionamento do portal.
          </Text>
          <Grid columns={3}>
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
                label="E-mail"
                placeholder="E-mail"
                {...form.getInputProps("email")}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Select
                withinPortal
                data={PROFILE_SELECT}
                disabled
                label="Perfil"
                value="DIRECTOR"
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <PasswordInput
                label="Senha"
                placeholder="Senha"
                {...form.getInputProps("password")}
              />
            </Grid.Col>
          </Grid>

          <Text size="sm">
            Seu perfil será cadastrado como ”{USER_PROFILE.DIRECTOR}” que é o
            perfil com maior permissão do portal.
          </Text>
          <Divider />
          <Group position="right">
            <Button type="submit">Continuar</Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}
