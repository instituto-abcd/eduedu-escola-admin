import {
  Grid,
  Group,
  Card,
  Select,
  TextInput,
  Title,
  Text,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SchoolYear, useSchoolYearGetAll } from "~/api/school-year";
import { PATH } from "~/constants/path";

type Props = {
  onYearChanged: (y: SchoolYear) => void;
};

export function DashboardHeader({ onYearChanged }: Props) {
  const [activeYear, setActiveYear] = useState<SchoolYear>();

  const { data: years, isLoading } = useSchoolYearGetAll({
    pageSize: 999,
    initialData: [],
    onSuccess(data) {
      const sortYears = (d: SchoolYear[]) =>
        d.sort((a, b) => (a.name < b.name ? 1 : -1));

      const activeYears = data.filter((item) => item.status === "ACTIVE");
      if (activeYears.length) {
        const sorted = sortYears(activeYears);
        setActiveYear(sorted[0]);
        onYearChanged(sorted[0]);
      } else {
        const sorted = sortYears(data);
        setActiveYear(sorted[0]);
        onYearChanged(sorted[0]);
      }
    },
  });

  return (
    <Card mb={20} withBorder>
      <Card.Section p={20}>
        <Grid columns={4}>
          {years?.length == 0 && !isLoading && (
            <Grid.Col span={4}>
              <Stack align="center">
                <Text>
                  Sem ano letivo cadastrado. Clique no link abaixo para
                  cadastrar um ano letivo:
                </Text>
                <Link to={PATH.SCHOOL_YEAR} style={{ textDecoration: "none" }}>
                  Cadastrar Ano Letivo
                </Link>
              </Stack>
            </Grid.Col>
          )}

          <Grid.Col span={1}>
            <Group>
              <Title order={4}>Ano Letivo</Title>
              <Select
                withinPortal
                maw={120}
                placeholder={"Selecione"}
                data={
                  isLoading
                    ? [
                      {
                        value: "",
                        label: "Carregando...",
                      },
                    ]
                    : years?.map(({ name, id }) => ({
                      label: name.toString(),
                      value: id,
                    })) ?? []
                }
                onChange={(v) => setActiveYear(years!.find((y) => y.id === v))}
                value={activeYear?.id ?? ""}
              />
            </Group>
          </Grid.Col>

          <Grid.Col span={1}>
            <Group>
              <Title order={4}>Professores</Title>
              <TextInput
                maw={60}
                placeholder="-"
                disabled
                value={activeYear?.summary.totalStudents}
              />
            </Group>
          </Grid.Col>
          <Grid.Col span={1}>
            <Group>
              <Title order={4}>Turmas</Title>
              <TextInput
                maw={60}
                placeholder="-"
                disabled
                value={activeYear?.summary.totalSchoolClasses}
              />
            </Group>
          </Grid.Col>
          <Grid.Col span={1}>
            <Group>
              <Title order={4}>Alunos</Title>
              <TextInput
                maw={60}
                placeholder="-"
                value={activeYear?.summary.totalStudents}
                disabled
              />
            </Group>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  );
}