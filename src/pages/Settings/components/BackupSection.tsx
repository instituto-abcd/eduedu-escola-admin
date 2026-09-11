import {
  Anchor,
  Button,
  Divider,
  FileInput,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { useUserStore } from "~/stores/user";
import {
  useBackupCreate,
  useBackupDownload,
  useBackupFiles,
  useBackupRestoreByFile,
} from "~/api/backup";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { BackupScheduleForm } from "./BackupScheduleForm";

export function BackupSection() {
  const profile = useUserStore((state) => state.profile);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: createBackup, isLoading: isCreatingBackup } = useBackupCreate(
    {
      onSuccess: (fileName) =>
        successNotification(
          "Backup criado com sucesso",
          `Arquivo gerado: ${fileName}`
        ),
      onError: (error) =>
        errorNotification("Erro ao criar backup", error.message),
    }
  );

  const { data: backupFiles } = useBackupFiles();

  const { mutate: downloadBackup, isLoading: isDownloading } =
    useBackupDownload({
      onError: (error) =>
        errorNotification("Erro ao baixar backup", error.message),
    });

  const { mutate: restoreByFile, isLoading: isRestoringByFile } =
    useBackupRestoreByFile({
      onSuccess: () => {
        successNotification(
          "Backup restaurado com sucesso",
          "O aplicativo foi restaurado para o estado do backup enviado. Lembre-se de sincronizar Planetas e Provas para recuperar as imagens, áudios e vídeos."
        );
        setSelectedFile(null);
      },
      onError: (error) =>
        errorNotification("Erro ao restaurar backup", error.message),
    });

  const openRestoreByFileConfirmModal = () =>
    modals.openConfirmModal({
      title: "Restaurar backup",
      children: (
        <>
          <Text mb={20}>
            Esta ação irá substituir todos os dados atuais do aplicativo pelos
            dados do arquivo de backup selecionado. Essa ação não pode ser
            desfeita. Deseja continuar?
          </Text>
          <Divider />
        </>
      ),
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => {
        if (selectedFile) restoreByFile(selectedFile);
      },
    });

  if (profile !== "DIRECTOR") {
    return null;
  }

  return (
    <Stack>
      <Title order={3}>Opções de backup</Title>

      <Stack align="start" w={220}>
        <FileInput
          label="Restaurar aplicativo por arquivo"
          placeholder="Selecionar arquivo"
          accept=".zip"
          value={selectedFile}
          onChange={setSelectedFile}
          disabled={isRestoringByFile}
          w="100%"
        />
        <Button
          disabled={!selectedFile}
          loading={isRestoringByFile}
          onClick={openRestoreByFileConfirmModal}
        >
          Restaurar
        </Button>
      </Stack>

      <Anchor
        size="sm"
        mt="md"
        onClick={() => createBackup()}
        sx={{
          pointerEvents: isCreatingBackup ? "none" : undefined,
          opacity: isCreatingBackup ? 0.6 : 1,
        }}
      >
        {isCreatingBackup
          ? "Criando backup..."
          : "Criar backup do aplicativo atual"}
      </Anchor>

      {backupFiles && backupFiles.length > 0 && (
        <Stack spacing={4} mt="md">
          <Text size="sm" weight={500}>
            Backups guardados neste computador
          </Text>
          <Text size="xs" color="dimmed">
            Baixe e guarde em outro lugar (pen drive, nuvem): estes arquivos
            ficam nesta máquina e os mais antigos são apagados
            automaticamente.
          </Text>
          {backupFiles.map((fileName) => (
            <Group key={fileName} position="apart" spacing="xs" noWrap>
              <Text size="xs" sx={{ wordBreak: "break-all" }}>
                {fileName}
              </Text>
              <Anchor
                size="xs"
                onClick={() => downloadBackup(fileName)}
                sx={{
                  whiteSpace: "nowrap",
                  pointerEvents: isDownloading ? "none" : undefined,
                  opacity: isDownloading ? 0.6 : 1,
                }}
              >
                Baixar
              </Anchor>
            </Group>
          ))}
        </Stack>
      )}

      <Divider mt="md" />

      <BackupScheduleForm />
    </Stack>
  );
}
