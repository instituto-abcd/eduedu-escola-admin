import { useParams } from "react-router-dom";
import {
  useGetExamsCharts,
  useGetExamsPerformance,
  useGetPlanetsPerformance,
  useGetSchoolClass,
} from "~/api/school-class";
import { Box, Divider, Flex, Grid, Title, Text, Image } from "@mantine/core";
import { PlanetPerformanceTable } from "../../Classes/Detail/components/planets-performance/Table";
import { Chart } from "../../Classes/Detail/components/ExamsChart/Chart";
import { ExamPerformance } from "~/components/ExamPerformance/ExamPerformance";
import eduEduLogo from "~/assets/logos/eduedu-preta.svg";
import { useEffect } from "react";

export function SchoolClassReport() {
  const params = useParams();
  const { data: schoolClass } = useGetSchoolClass(params.classId ?? "", {});
  const { data: schoolClassPerformanceExams } = useGetExamsPerformance(
    params.classId ?? "",
    {},
  );
  const { data: schoolClassPerformancePlanets } = useGetPlanetsPerformance(
    params.classId ?? "",
    {},
  );
  const { data: schoolClassExamsChart } = useGetExamsCharts(
    params.classId ?? "",
    {},
  );

  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 2000);
  }, []);

  return (
    <Box p={20} style={{ maxWidth: "900px" }}>
      <Grid columns={6} pb={30}>
        <Grid.Col span={1}>
          <Image src={eduEduLogo} width={90} />
        </Grid.Col>

        <Grid.Col span={5} my="auto">
          <Box>
            <Title order={3}>Relatório de turma</Title>
            <Grid pt={10}>
              <Grid.Col span="content">
                <Flex>
                  <Text fz="sm" fw={600} pr={5}>
                    Turma:
                  </Text>
                  <Text fz="sm">
                    {schoolClass?.name} - {schoolClass?.schoolYear?.name}
                  </Text>
                </Flex>
              </Grid.Col>

              <Grid.Col span="content">
                <Flex>
                  <Text fz="sm" fw={600} pr={5}>
                    Professores:
                  </Text>
                  {schoolClass?.teachers &&
                    schoolClass?.teachers.map((teacher) => (
                      <Text fz="sm">{teacher.name}</Text>
                    ))}
                </Flex>
              </Grid.Col>
            </Grid>
          </Box>
        </Grid.Col>
      </Grid>

      <Box pb={30}>
        <Title order={4} p={30} pl={0}>
          Desempenho da turma em provas
        </Title>
        <Flex justify="space-around">
          {schoolClassPerformanceExams &&
            schoolClassPerformanceExams?.map((item, i) => (
              <>
                <Box key={item.axisCode}>
                  <ExamPerformance item={item} />
                  {i + 1 != schoolClassPerformanceExams.length && (
                    <Divider orientation="vertical" variant="solid" />
                  )}
                </Box>
              </>
            ))}
        </Flex>
      </Box>

      <Box pb={30}>
        <Title order={4} p={30} pl={0}>
          Desempenho da turma em planetas
        </Title>
        <PlanetPerformanceTable
          schoolClassPerformancePlanets={schoolClassPerformancePlanets}
        />
      </Box>

      <Box>
        <Title order={4} p={30} pl={0}>
          Histórico do resultado de provas da turma
        </Title>
        <Chart schoolClassExamsChart={schoolClassExamsChart} maxWidth="900px" />
      </Box>
    </Box>
  );
}