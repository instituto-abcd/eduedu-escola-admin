import { useState } from "react";
import { Grid } from "@mantine/core";
import { CardDashboard, SchoolGradeCard } from "./Cards";

export function DashboardPage() {

  const [schoolReport, setSchoolReport] = useState({});
  const getReportData = (schoolReport: string) => {
    setSchoolReport(schoolReport);
  };

  return (
    <>
      <CardDashboard getReportData={getReportData} />

      <Grid columns={4}>
        {schoolReport &&
          schoolReport.schoolGrades?.map((item) => (
            <Grid.Col span={1}>
              <SchoolGradeCard schoolGrade={item} />
            </Grid.Col>
          ))
        }
      </Grid>
    </>
  );
}
