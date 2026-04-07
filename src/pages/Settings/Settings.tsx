import {
  Button,
  Divider,
  Grid,
  Group,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
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
import { z } from "zod";
import { useSyncPlanets, useSyncExams } from "~/api/sync";
import { SyncNotification } from "./components/SyncNotification";
import { usePlanetSync, useExamSync } from "~/stores/filter";

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
    validate: zodResolver(
      z.object({
        schoolName: z.string().min(1, { message: "Campo obrigatório" }),
        smtpHostName: z.string().nonempty({ message: "Campo obrigatório" }),
        smtpUserName: z.string().nonempty({ message: "Campo obrigatório" }),
        smtpPassword: z.string().nonempty({ message: "Campo obrigatório" }),
        smtpPort: z.number({
          required_error: "Campo obrigatório",
          invalid_type_error: "Digite apenas o número da porta",
        }),
        accessKey: z
          .string()
          .regex(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, {
            message: "Formato inválido. Use o formato XXXX-XXXX-XXXX-XXXX.",
          })
          .or(z.literal("")),
      })
    ),
  });

  const [auditModalOpen, auditModalHandlers] = useDisclosure(false);

  const { data: planetSyncState, update: updatePlanetSync } = usePlanetSync();
  const { data: examSyncState, update: updateExamSync } = useExamSync();

  const { mutate: mutateSyncPlanets } = useSyncPlanets();
  const { mutate: mutateSyncExams } = useSyncExams();

  const onClickSyncPlanetsButton = async () => {
    updatePlanetSync(true);
    mutateSyncPlanets();
  };

  const onClickSyncExamsButton = async () => {
    updateExamSync(true);
    mutateSyncExams();
  };

  return (
    <form onSubmit={form.onSubmit((v) => mutate(v))}>
      <Stack>
        <PageHeader title="Configurações">
          <Group noWrap>
            <Button
              variant="outline"
              onClick={onClickSyncPlanetsButton}
              loading={planetSyncState}
            >
              Sincronizar Planetas
            </Button>
            <Button
              variant="outline"
              onClick={onClickSyncExamsButton}
              loading={examSyncState}
            >
              Sincronizar Provas
            </Button>
            <Button variant="outline" onClick={auditModalHandlers.open}>
              Gestão de Auditoria
            </Button>
          </Group>
        </PageHeader>

        <Stack align="start">
          <SyncNotification />
        </Stack>

        <Grid columns={8}>
          <Grid.Col span={2}>
            <TextInput
              label="Nome da escola"
              placeholder={isLoading ? "Carregando..." : "Escola XYZ"}
              {...form.getInputProps("schoolName")}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select
              withinPortal
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

          <Grid.Col span={2}>
            <TextInput
              label="Chave de acesso"
              placeholder={isLoading ? "Carregando..." : "XXXX-XXXX-XXXX-XXXX"}
              {...form.getInputProps("accessKey")}
              value={form.values.accessKey || ""}
              onChange={(e) => {
                let value = e.currentTarget.value.toUpperCase();
                value = value.replace(/[^A-Z0-9]/g, "");
                value =
                  value
                    .match(/.{1,4}/g)
                    ?.join("-")
                    .slice(0, 19) || "";
                form.setFieldValue("accessKey", value);
              }}
              maxLength={19}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>

          <Grid.Col span={2} />

          <Grid.Col span={2}>
            <TextInput
              label="Nome do Host de SMTP"
              placeholder={isLoading ? "Carregando..." : "smtp.office365.com"}
              {...form.getInputProps("smtpHostName")}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <TextInput
              label="Nome do Usuário de SMTP"
              placeholder={
                isLoading ? "Carregando..." : "suporte@eduedu.com.br"
              }
              {...form.getInputProps("smtpUserName")}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <PasswordInput
              label="Senha de SMTP"
              {...form.getInputProps("smtpPassword")}
              disabled={isLoading || isMutating}
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
                form.setFieldValue("sslIsActive", v === "Ativo" ? true : false)
              }
              value={form.values.sslIsActive ? "Ativo" : "Inativo"}
              disabled={isLoading || isMutating}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <NumberInput
              label="Porta"
              hideControls
              {...form.getInputProps("smtpPort")}
              placeholder={isLoading ? "Carregando..." : "Porta SMTP"}
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
