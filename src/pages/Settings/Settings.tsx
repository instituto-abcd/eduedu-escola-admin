import { Grid, Select, TextInput } from "@mantine/core";
import { PageHeader } from "~/components/PageHeader";

export function SettingsPage() {
  return (
    <>
      <PageHeader title="Configurações" />

      <Grid columns={4}>
        <Grid.Col span={1}>
          <TextInput mb={20} label="Nome da escola" placeholder="Escola XYZ" />
        </Grid.Col>
        <Grid.Col span={1}>
          <Select
            label="Sincronização de planetas"
            placeholder="Escolha um"
            data={[
              { value: 'Ativo', label: 'Ativo' },
              { value: 'Inativo', label: 'Inativo' },
            ]}
          />
        </Grid.Col>
      </Grid>

      <Grid columns={4}>
        <Grid.Col span={1}>
          <TextInput mb={20} label="Nome do Host de SMTP" placeholder="smtp.office365.com" />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput mb={20} label="Nome do Usuário de SMTP" placeholder="suporte@eduedu.com.br" />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput mb={20} label="Senha de SMTP" placeholder="**********" />
        </Grid.Col>
        <Grid.Col span={1}>
          <Select
            label="SSL"
            placeholder="Escolha um"
            data={[
              { value: 'Ativo', label: 'Ativo' },
              { value: 'Inativo', label: 'Inativo' },
            ]}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
