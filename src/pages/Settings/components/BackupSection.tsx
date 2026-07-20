import {
  Anchor,
  Button,
  FileInput,
  Grid,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useUserStore } from "~/stores/user";

export function BackupSection() {
  const profile = useUserStore((state) => state.profile);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (profile !== "DIRECTOR") {
    return null;
  }

  return (
    <Stack>
      <Title order={3}>Opções de backup</Title>

      <Grid columns={8}>
        <Grid.Col span={2}>
          <Stack align="start">
            <Select
              withinPortal
              label="Restaurar aplicativo por data"
              placeholder="Data"
              data={[]}
              value={selectedDate}
              onChange={setSelectedDate}
              w="100%"
            />
            <Button disabled={!selectedDate}>Restaurar</Button>
          </Stack>
        </Grid.Col>
        <Grid.Col span={2}>
          <Stack align="start">
            <FileInput
              label="Restaurar aplicativo por arquivo"
              placeholder="Selecionar arquivo"
              accept=".zip"
              value={selectedFile}
              onChange={setSelectedFile}
              w="100%"
            />
            <Button disabled={!selectedFile}>Restaurar</Button>
          </Stack>
        </Grid.Col>
      </Grid>

      <Anchor size="sm" mt="md">
        Criar backup do aplicativo atual
      </Anchor>
    </Stack>
  );
}
