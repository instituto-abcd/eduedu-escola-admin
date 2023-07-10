import {
  Button,
  Divider,
  Grid,
  Group,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import {
  SettingsUpdateInput,
  useSettingsGet,
  useSettingsUpdate,
} from "~/api/settings";
import { PageHeader } from "~/components/PageHeader";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { AuditModal } from "./components/AuditModal";

export function SettingsPage() {
  const { data, isLoading } = useSettingsGet({
    onError: (error) =>
      errorNotification("Erro durante a operação", error.message),
    onSuccess: (data) => form.setValues(data),
  });

  const { mutate, isLoading: isMutating } = useSettingsUpdate({
    onSuccess: () =>
      successNotification(
        "Operação realizada com sucesso",
        "Configurações atualizadas"
      ),
  });

  const form = useForm<SettingsUpdateInput>({
    initialValues: data,
  });

  const [auditModalOpen, auditModalHandlers] = useDisclosure(false);

  return (
    <form onSubmit={form.onSubmit((v) => mutate(v))}>
      <Stack>
        <PageHeader title="Configurações">
          <Button variant="outline" onClick={auditModalHandlers.open}>
            Gestão de Auditoria
          </Button>
        </PageHeader>

        <Grid columns={4}>
          <Grid.Col span={1}>
            <TextInput
              label="Nome da escola"
              placeholder={isLoading ? "Carregando..." : "Escola XYZ"}
              {...form.getInputProps("schoolName")}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Select
              label="Sincronização de planetas"
              placeholder={isLoading ? "Carregando..." : "Escolha um"}
              data={[
                { value: "Ativo", label: "Ativo" },
                { value: "Inativo", label: "Inativo" },
              ]}
              {...form.getInputProps("synchronizationPlanets")}
              onChange={(v) =>
                form.setFieldValue(
                  "synchronizationPlanets",
                  v === "Ativo" ? true : false
                )
              }
              value={form.values.synchronizationPlanets ? "Ativo" : "Inativo"}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>

          <Grid.Col span={1} />
          <Grid.Col span={1} />

          <Grid.Col span={1}>
            <TextInput
              label="Nome do Host de SMTP"
              placeholder={isLoading ? "Carregando..." : "smtp.office365.com"}
              {...form.getInputProps("smtpHostName")}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <TextInput
              label="Nome do Usuário de SMTP"
              placeholder={
                isLoading ? "Carregando..." : "suporte@eduedu.com.br"
              }
              {...form.getInputProps("smtpUserName")}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <PasswordInput
              label="Senha de SMTP"
              {...form.getInputProps("smtpPassword")}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Select
              label="SSL"
              placeholder="Escolha um"
              data={[
                { value: "Ativo", label: "Ativo" },
                { value: "Inativo", label: "Inativo" },
              ]}
              onChange={(v) =>
                form.setFieldValue("sslIsActive", v === "Ativo" ? true : false)
              }
              value={form.values.sslIsActive ? "Ativo" : "Inativo"}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>
        </Grid>
        <Divider my="xl" />
        <Group position="right">
          <Button variant="outline" component={Link} to="..">
            Cancelar
          </Button>
          <Button disabled={!form.isDirty()} loading={isMutating} type="submit">
            Salvar
          </Button>
        </Group>
      </Stack>
      <AuditModal opened={auditModalOpen} onClose={auditModalHandlers.close} />
    </form>
  );
}
