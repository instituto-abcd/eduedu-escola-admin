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
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SchoolYear, useSchoolYearGetAll } from "~/api/school-year";
import { PATH } from "~/constants/path";
import { useSchoolClassFilterStore } from "~/stores/filter";

type Props = {
  /** Ano letivo pedido na URL (`/dashboard/:year`), ex.: "2025". */
  year?: string;
  onYearChanged: (y: SchoolYear) => void;
};

// Ano aberto quando o usuário ainda não escolheu nenhum: o da URL, se existir;
// senão o ativo mais recente; senão o mais recente.
function getDefaultYear(years: SchoolYear[], year?: string) {
  const fromUrl = years.find((item) => item.name.toString() === year);
  if (fromUrl) return fromUrl;

  const activeYears = years.filter((item) => item.status === "ACTIVE");
  return [...(activeYears.length ? activeYears : years)].sort(
    (a, b) => b.name - a.name,
  )[0];
}

export function DashboardHeader({ year, onYearChanged }: Props) {
  const [selectedYearId, setSelectedYearId] = useState<string>();

  const { data: years, isLoading } = useSchoolYearGetAll({
    pageSize: 999,
    initialData: [],
  });

  const activeYear = useMemo(
    () =>
      years?.find((item) => item.id === selectedYearId) ??
      getDefaultYear(years ?? [], year),
    [years, selectedYearId, year],
  );

  // Cards de séries e filtro da listagem de turmas acompanham o ano exibido.
  useEffect(() => {
    if (!activeYear) return;

    onYearChanged(activeYear);
    const { data: schoolClassFilter, update } =
      useSchoolClassFilterStore.getState();
    update({
      ...schoolClassFilter,
      schoolYearName: activeYear.name.toString(),
    });
  }, [activeYear, onYearChanged]);

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
                onChange={(v) => setSelectedYearId(v ?? undefined)}
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
                value={activeYear?.summary.totalTeachers}
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