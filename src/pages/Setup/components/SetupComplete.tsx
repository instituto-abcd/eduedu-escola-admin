import {
  Button,
  Card,
  Divider,
  FileInput,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBackupRestoreByFile } from "~/api/backup";
import { PATH } from "~/constants/path";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

export function SetupComplete() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // A instalação acabou de nascer: não há dados a perder, então aqui o
  // restore vai direto, sem o modal de confirmação que a tela de
  // Configurações usa.
  const { mutate: restoreByFile, isLoading: isRestoringByFile } =
    useBackupRestoreByFile({
      onSuccess: () => {
        successNotification(
          "Backup restaurado com sucesso",
          "O aplicativo foi restaurado para o estado do backup enviado. Lembre-se de sincronizar Planetas e Provas para recuperar as imagens, áudios e vídeos."
        );
        navigate(PATH.USERS);
      },
      onError: (error) =>
        errorNotification("Erro ao restaurar backup", error.message),
    });

  return (
    <Card>
      <Stack spacing="lg">
        <Title order={4}>Agora sim, está tudo pronto!</Title>
        <Text>
          As informações preenchidas podem ser alteradas no menu&nbsp;
          <strong>”Configurações”</strong>.
        </Text>
        <Text>
          Você está pronto para iniciar o uso do Portal, basta cadastrar os
          usuários com os devidos perfis de acesso e iniciar a sua jornada pelo
          mundo EduEdu.
        </Text>

        <Stack spacing={4}>
          <Text weight={500}>Restaurar aplicativo por arquivo</Text>
          <Text size="sm" color="dimmed">
            Caso possua um backup anterior, você pode restaurar o aplicativo
            utilizando o arquivo .zip correspondente.
          </Text>
          <Group align="flex-start" spacing="sm" noWrap mt="xs">
            <FileInput
              placeholder="Selecionar arquivo"
              accept=".zip"
              value={selectedFile}
              onChange={setSelectedFile}
              disabled={isRestoringByFile}
              sx={{ flex: 1 }}
            />
            <Button
              variant="outline"
              disabled={!selectedFile}
              loading={isRestoringByFile}
              onClick={() => {
                if (selectedFile) restoreByFile(selectedFile);
              }}
            >
              Restaurar
            </Button>
          </Group>
        </Stack>

        <Divider />
        <Group position="right">
          <Button
            component={Link}
            to={PATH.USERS}
            disabled={isRestoringByFile}
            onClick={(event: MouseEvent) => {
              // O `disabled` do Mantine só pinta o link; sem isto dá para
              // sair da tela no meio de uma restauração.
              if (isRestoringByFile) event.preventDefault();
            }}
          >
            Começar
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
