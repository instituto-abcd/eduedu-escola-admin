import {
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
  Pagination,
  PasswordInput,
  Select,
  Stack,
  Table,
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

export function SettingsPage() {
  const { data, isLoading } = useSettingsGet({
    onError: (error) => errorNotification("Erro durante a operação", error.message),
    onSuccess: (data) => form.setValues(data),
  });

  const { mutate, isLoading: isMutating } = useSettingsUpdate({
    onSuccess: () =>
      successNotification("Operação realizada com sucesso", "Configurações atualizadas"),
  });

  const form = useForm<SettingsUpdateInput>({
    initialValues: data,
  });

  // Modal Audit:
  const [opened, { open, close }] = useDisclosure(false);
  // TODO: get real data here:
  const dataAudit = {
    items: [
      {
        id: 'a58c8d6e-4bf2-4d1e-81c3-1ab0f714484d',
        entity: 'Turma',
        operation: 'Criação',
        dateHour: '12/01/23 - 14:35',
      },
      {
        id: 'a58c8d6e-4bf2-4d1e-81c3-1ab0f714484d',
        entity: 'Turma',
        operation: 'Criação',
        dateHour: '12/01/23 - 14:35',
      },
      {
        id: 'a58c8d6e-4bf2-4d1e-81c3-1ab0f714484d',
        entity: 'Turma',
        operation: 'Criação',
        dateHour: '12/01/23 - 14:35',
      },
      {
        id: 'a58c8d6e-4bf2-4d1e-81c3-1ab0f714484d',
        entity: 'Turma',
        operation: 'Criação',
        dateHour: '12/01/23 - 14:35',
      },
      {
        id: 'a58c8d6e-4bf2-4d1e-81c3-1ab0f714484d',
        entity: 'Turma',
        operation: 'Criação',
        dateHour: '12/01/23 - 14:35',
      },
      {
        id: 'a58c8d6e-4bf2-4d1e-81c3-1ab0f714484d',
        entity: 'Turma',
        operation: 'Criação',
        dateHour: '12/01/23 - 14:35',
      },
    ]
  }

  return (
    <>
      <form onSubmit={form.onSubmit((v) => mutate(v))}>
        <Stack>
          <PageHeader title="Configurações">
            <Button variant="outline" onClick={open}>Gestão de Auditoria</Button>
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
      </form>
      <Modal
        title="Gestão de Auditoria"
        opened={opened}
        onClose={close}
        size="lg"
      >
        <Table
          horizontalSpacing="sm"
          verticalSpacing="md"
          mb={20}
        >
          <thead>
            <tr>
              <th>Id Usuário</th>
              <th>Entidade</th>
              <th>Operação</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            {dataAudit?.items.map((item) =>
              <tr>
                <td>{item.id}</td>
                <td>{item.entity}</td>
                <td>{item.operation}</td>
                <td>{item.dateHour}</td>
              </tr>
            )}
          </tbody>
        </Table>
        {
          dataAudit && (
            <Center>
              <Pagination
                total={5}
              />
            </Center>
          )
        }
      </Modal>
    </>
  );
}
