import {
  Card,
  Stack,
  LoadingOverlay,
  Grid,
  TextInput,
  Select,
  Divider,
  Group,
  Button,
  Title,
  Text,
  PasswordInput,
  NumberInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  SettingsUpdateInput,
  useSettingsGet,
  useSettingsUpdate,
} from "~/api/settings";
import { PATH } from "~/constants/path";
import { errorNotification } from "~/utils/errorNotification";

export function CreateSchoolForm() {
  const navigate = useNavigate();

  const { data, isLoading: fetching } = useSettingsGet({
    onSuccess: (data) => {
      form.setValues(data);
    },
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
      navigate(PATH.LOGIN);
    },
  });

  const { mutate, isLoading: mutating } = useSettingsUpdate();

  const form = useForm<SettingsUpdateInput>({
    initialValues: data,
    validate: zodResolver(
      z.object({
        schoolName: z
          .string()
          .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
          .max(255, { message: "Nome deve ter no máximo 255 caracteres" })
          .refine((v) => v !== "EduEdu Escola", {
            message: "Este nome é reservado",
          }),
      })
    ),
  });

  const isLoading = fetching || mutating;

  return (
    <Card>
      <form onSubmit={form.onSubmit((v) => mutate(v))}>
        <Stack>
          <LoadingOverlay visible={isLoading} />
          <Title order={4}>
            Olá, seja bem-vindo ao Portal Administrativo Edu Edu
          </Title>
          <TextInput
            label="Nome da Escola"
            placeholder="Nome da Escola"
            {...form.getInputProps("schoolName")}
          />

          <Text>
            Agora precisamos configurar as credenciais que serão utilizadas pelo
            mecanismo de e-mail.
          </Text>
          <Grid columns={4}>
            <Grid.Col span={2}>
              <TextInput
                label="Nome do Host de SMTP"
                placeholder="Host de SMTP"
                {...form.getInputProps("smtpHostName")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                label="Nome do Usuário de SMTP"
                placeholder="Usuário de SMTP"
                {...form.getInputProps("smtpUserName")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <PasswordInput
                label="Senha de SMTP"
                placeholder="Senha de SMTP"
                {...form.getInputProps("smtpPassword")}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Select
                withinPortal
                label="SSL"
                placeholder="Escolha um"
                data={[
                  { value: "Ativo", label: "Ativo" },
                  { value: "Inativo", label: "Inativo" },
                ]}
                onChange={(v) =>
                  form.setFieldValue(
                    "sslIsActive",
                    v === "Ativo" ? true : false
                  )
                }
                value={form.values.sslIsActive ? "Ativo" : "Inativo"}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <NumberInput
                label="Porta"
                placeholder="Porta SMTP"
                hideControls
                {...form.getInputProps("smtpPort")}
              />
            </Grid.Col>
          </Grid>

          <Divider />
          <Group position="right">
            <Button type="submit">Continuar</Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}
