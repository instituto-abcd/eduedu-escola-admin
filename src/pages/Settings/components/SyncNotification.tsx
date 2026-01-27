import { Group, Notification } from "@mantine/core";
import { usePlanetLastSync, useExamLastSync, LastSyncResponse } from "~/api/sync";

function SyncReminderNotification({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: LastSyncResponse;
}) {
  return (
    <Notification
      color="yellow"
      title={title}
      withCloseButton={false}
      w={450}
    >
      {description}
      {data.syncedAt && (
        <>
          <br />
          &bull;&nbsp;A última sincronização foi feita em:&nbsp;
          <b>{new Date(data.syncedAt).toLocaleDateString("pt-BR")}</b>
        </>
      )}
      {data.syncedAt && (
        <>
          <br />
          &bull;&nbsp;Dias desde a última sincronização:&nbsp;
          {data.daysSinceLastSync ?? 0}
        </>
      )}
    </Notification>
  );
}

export function SyncNotification() {
  const { data: planetData } = usePlanetLastSync();
  const { data: examData } = useExamLastSync();

  const showPlanetReminder = planetData?.showReminder;
  const showExamReminder = examData?.showReminder;

  if (!showPlanetReminder && !showExamReminder) return null;

  return (
    <Group spacing="md">
      {showPlanetReminder && planetData && (
        <SyncReminderNotification
          title="Aviso sobre sincronização de Planetas"
          description="Recomendamos que seja feito a sincronização de Planetas novos com a base de dados."
          data={planetData}
        />
      )}
      {showExamReminder && examData && (
        <SyncReminderNotification
          title="Aviso sobre sincronização de Provas"
          description="Recomendamos que seja feito a sincronização de Provas novas com a base de dados."
          data={examData}
        />
      )}
    </Group>
  );
}
