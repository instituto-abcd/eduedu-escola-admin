import { useState } from "react";
import { Grid, Stack } from "@mantine/core";
import { SchoolGradeCard } from "./Cards";
import { DashboardHeader } from "./components/DashboardHeader";
import { SchoolYear } from "~/api/school-year";
import { useGetDashboard } from "~/api/dashboard";

export function DashboardPage() {
  const [schoolYear, setSchoolYear] = useState<SchoolYear>();
  const { data: report } = useGetDashboard(schoolYear?.name.toString() ?? "", {
    enabled: !!schoolYear,
  });

  return (
    <Stack>
      <DashboardHeader onYearChanged={setSchoolYear} />

      <Grid columns={4}>
        {report?.schoolGrades.map((item) => (
          <Grid.Col span={1} key={item.id}>
            <SchoolGradeCard grade={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
