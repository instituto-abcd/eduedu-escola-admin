import { Button, Grid, Group, MultiSelect, Select, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { HorizontalRule } from "~/components/HorizontalRule";
import { PageHeader } from "~/components/PageHeader";
import { PATH } from "~/constants/path";

export function FormPage() {
  return (
    <>
      <PageHeader title="Nova Turma">
        <Link to={PATH.CLASSES}>Retornar a página de turmas</Link>
      </PageHeader>

      <Grid columns={5}>
        <Grid.Col span={1}>
          <TextInput label="Nome" placeholder="Digite aqui" />
        </Grid.Col>
        <Grid.Col span={1}>
          <Select
            label="Ano Letivo"
            placeholder="Selecione"
            data={[
              { value: "2023", label: "2023" },
              { value: "2022", label: "2022" },
              { value: "2021", label: "2021" },
              { value: "2020", label: "2020" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Select
            label="Série"
            placeholder="Selecione"
            data={[{ value: "1234", label: "1º Ano Fund 1" }]}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Select
            label="Período"
            placeholder="Selecione"
            data={[{ value: "1234", label: "Manhã" }]}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <MultiSelect
            label="Professor(es)"
            placeholder="Selecione"
            data={[
              { value: "1", label: "Luis Figueiredo" },
              { value: "2", label: "Fernanda Fontes" },
              { value: "3", label: "Alice Dias" },
            ]}
          />
        </Grid.Col>
      </Grid>

      <HorizontalRule />

      <Group position="right">
        <Button variant="outline">Cancelar</Button>
        <Button disabled>Salvar</Button>
      </Group>
    </>
  );
}
