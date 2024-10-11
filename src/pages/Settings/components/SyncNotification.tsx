import { Notification } from "@mantine/core";
import { useLastSync } from "~/api/sync";

export function SyncNotification() {
  const { data } = useLastSync();

  if (!data || !data.showReminder) return null;

  return (
    <Notification
      color="yellow"
      title="Aviso sobre sincronização"
      withCloseButton={false}
      w={450}
    >
      Recomendamos que seja feito a sincronização de Planetas novos com a base
      de dados.
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
