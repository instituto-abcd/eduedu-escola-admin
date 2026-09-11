import {
  Alert,
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  BackupSchedule,
  useBackupSchedule,
  useBackupScheduleUpdate,
} from "~/api/backup";
import { HOUR_SELECT, WEEK_DAY_SELECT } from "~/constants";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

// Os Selects do Mantine trabalham com string, então dia e hora ficam como
// texto no formulário e voltam a número na hora de enviar.
type BackupScheduleFormValues = {
  enabled: boolean;
  dayOfWeek: string;
  hour: string;
  retentionCount: number;
};

const toFormValues = (
  schedule: BackupSchedule
): BackupScheduleFormValues => ({
  enabled: schedule.enabled,
  dayOfWeek: String(schedule.dayOfWeek),
  hour: String(schedule.hour),
  retentionCount: schedule.retentionCount,
});

const formatDateTime = (value: string | null | undefined) =>
  value ? new Date(value).toLocaleString("pt-BR") : null;

export function BackupScheduleForm() {
  const form = useForm<BackupScheduleFormValues>({
    initialValues: {
      enabled: false,
      dayOfWeek: "0",
      hour: "2",
      retentionCount: 4,
    },
  });

  const { data, isLoading } = useBackupSchedule({
    onSuccess: (schedule) => form.setValues(toFormValues(schedule)),
    onError: (error) =>
      errorNotification(
        "Erro ao carregar o backup automático",
        error.message
      ),
  });

  const { mutate, isLoading: isSaving } = useBackupScheduleUpdate({
    onSuccess: (schedule) => {
      form.setValues(toFormValues(schedule));
      successNotification(
        "Operação realizada com sucesso",
        "Agendamento do backup automático atualizado"
      );
    },
    onError: (error) =>
      errorNotification("Erro ao salvar o agendamento", error.message),
  });

  const onSubmit = form.onSubmit((values) =>
    mutate({
      enabled: values.enabled,
      dayOfWeek: Number(values.dayOfWeek),
      hour: Number(values.hour),
      retentionCount: values.retentionCount,
    })
  );

  const lastRunAt = formatDateTime(data?.lastRunAt);
  const nextRunAt = formatDateTime(data?.nextRunAt);

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing="xs">
        <Title order={4}>Backup automático</Title>

        <Text size="sm" color="dimmed" maw={540}>
          O backup é gerado uma vez por semana no próprio computador e não
          precisa de internet. Se a máquina estiver desligada no dia agendado, o
          backup daquela semana não é perdido: ele é feito automaticamente na
          próxima vez que ela for ligada.
        </Text>

        <Switch
          mt="xs"
          label="Fazer backup automaticamente toda semana"
          {...form.getInputProps("enabled", { type: "checkbox" })}
        />

        <Group align="start" spacing="md" mt="xs">
          <Select
            label="Dia da semana"
            data={WEEK_DAY_SELECT}
            disabled={!form.values.enabled}
            w={180}
            {...form.getInputProps("dayOfWeek")}
          />

          <Select
            label="Horário"
            data={HOUR_SELECT}
            disabled={!form.values.enabled}
            w={110}
            {...form.getInputProps("hour")}
          />

          <NumberInput
            label="Backups mantidos"
            description="Os mais antigos são apagados"
            min={1}
            max={52}
            disabled={!form.values.enabled}
            w={200}
            {...form.getInputProps("retentionCount")}
          />
        </Group>

        {data?.lastError && (
          <Alert
            color="red"
            title="A última tentativa de backup automático falhou"
            mt="xs"
            maw={540}
          >
            {data.lastError}
          </Alert>
        )}

        <Stack spacing={2} mt="xs">
          <Text size="sm">
            Último backup automático:{" "}
            <b>{lastRunAt ?? "nenhum ainda"}</b>
            {data?.lastRunFile ? ` — ${data.lastRunFile}` : ""}
          </Text>

          {data?.running && (
            <Text size="sm">Um backup automático está em andamento.</Text>
          )}

          {data?.enabled && !data.running && (
            <Text size="sm">
              {data.overdue
                ? "Há um backup em atraso; ele será feito automaticamente nos próximos minutos."
                : `Próximo backup previsto para ${nextRunAt}.`}
            </Text>
          )}
        </Stack>

        <Button type="submit" mt="md" w={140} loading={isSaving} disabled={isLoading}>
          Salvar
        </Button>
      </Stack>
    </form>
  );
}
