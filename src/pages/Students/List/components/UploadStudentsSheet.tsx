import {
  Anchor,
  Button,
  Divider,
  FileInput,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { IconFileDownload, IconPaperclip } from "@tabler/icons-react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { SchoolClassAPI, sheetDownloadUrl, useSchoolClassGetAll } from "~/api/school-class";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { useState } from "react";

type Props = {
  opened: boolean;
  onClose: () => void;
};

type FormData = {
  file: File,
  id: string
}

export function UploadStudentsSheet({ opened, onClose }: Props) {

  const [isLoading, setIsLoading] = useState(false)
  const { data: schoolClasses, isLoading: isLoadingSchoolClasses } = useSchoolClassGetAll({
    search: {
      "page-number": 1,
      "page-size": 999,
    },
  })

  const formUploadSheet = useForm<FormData>({
    validate: zodResolver(
      z.object({
        id: z
          .string()
          .min(1, { message: "Selecione uma turma" }),
        file: z.instanceof(File, { message: "Selecione um arquivo" })
      })
    ),
  });

  async function uploadSheet(values: FormData) {
    setIsLoading(true)
    try {
      await SchoolClassAPI.uploadStudentsSheet(values.file, values.id)
      successNotification("Operação realizada com sucesso", "Aluno(s) adicionado(s) com sucesso!")
      onClose()
    } catch (error) {
      errorNotification("Erro durante a operação", (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={isLoading ? () => { } : onClose}
      title="Upload de Aluno"
    >
      <form
        onSubmit={formUploadSheet.onSubmit((values) => {
          uploadSheet(values);
        })}
      >
        <Stack spacing={5}>
          <Group>
            <Text size="sm">
              Para fazer upload de aluno em lote é necessário seguir o template
              de cadastro de aluno.
            </Text>
            <Group align="center">
              <Anchor c="blue.6" size="sm" href={sheetDownloadUrl()}>
                Fazer download do template &#32;
                <IconFileDownload size={rem(18)} />
              </Anchor>
            </Group>
          </Group>

          <Group>
            <Text size="sm">
              Selecione o arquivo do template de Cadastro de Aluno.
            </Text>

            <FileInput
              {...formUploadSheet.getInputProps("file")}
              style={{ width: "100%" }}
              placeholder="Selecione o arquivo"
              rightSection={<IconPaperclip size={rem(14)} />}
            />
          </Group>

          <Group>
            <Text size="sm">
              Selecione a turma que deseja adicionar os alunos do template.
            </Text>
            <Select
              {...formUploadSheet.getInputProps("id")}
              placeholder="Selecione a turma"
              disabled={isLoadingSchoolClasses}
              data={
                isLoadingSchoolClasses
                  ? []
                  : schoolClasses.items.map(({ name, id }) => ({
                    label: name.toString(),
                    value: id,
                  }))
              }
              style={{ width: "100%" }}
            />
          </Group>

          <Divider my="xl" />

          <Group position="right">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Não
            </Button>
            <Button type="submit">Sim</Button>
          </Group>

        </Stack>
      </form>
      <LoadingOverlay visible={isLoading} />
    </Modal>
  );
}
