import { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Stack } from "@mantine/core";
import { SchoolGradeCard } from "./Cards";
import { DashboardHeader } from "./components/DashboardHeader";
import { SchoolYear } from "~/api/school-year";
import { useGetDashboard } from "~/api/dashboard";

export function DashboardPage() {
  // Preenchido quando a página é aberta por "Ver Detalhes" / "Ver Histórico".
  const { year } = useParams();
  const [schoolYear, setSchoolYear] = useState<SchoolYear>();
  const { data: report } = useGetDashboard(schoolYear?.name.toString() ?? "", {
    enabled: !!schoolYear,
  });

  return (
    <Stack>
      {/* key: trocar de ano pela URL descarta a escolha feita no seletor */}
      <DashboardHeader key={year} year={year} onYearChanged={setSchoolYear} />

      <Grid columns={4}>
        {report?.schoolGrades.map((item) => (
          <Grid.Col span={2} md={1} key={item.id}>
            <SchoolGradeCard grade={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
