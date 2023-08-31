// Utils & Aux:
import {
  useGetExamsCharts,
  useGetExamsPerformance,
  useGetPlanetsPerformance,
  useGetSchoolClass,
  useGetStudentsExamsPerformance,
  useGetStudentsPlanetsPerformance
} from "~/api/school-class";
import { useParams } from "react-router-dom";

// Components:
import { Accordion } from "@mantine/core";
import { SchoolClassHeader } from "./components/Header";
import { PlanetsPerformance } from "./components/PlanetsPerformance";
import { ExamsPerformance } from "./components/ExamsPerformance";
import { StudentsPerformanceBy } from "./components/StudentsPerformance/StudentsPerformanceBy";
import { ExamsChart } from "./components/ExamsChart/ExamsChart";

// Icons:
import { IconPlus } from "@tabler/icons-react";

export function ClassDetailPage() {
  // Getting the id of the schoolClass:
  const params = useParams();

  // Getting info about the schoolClass:
  const { data: schoolClass } = useGetSchoolClass(params.classId ?? "", {});

  // Getting the info about performance at exams:
  const { data: schoolClassPerformanceExams } = useGetExamsPerformance(params.classId ?? "", {});
  const { data: schoolClassPerformancePlanets } = useGetPlanetsPerformance(params.classId ?? "", {});
  const { data: schoolClassExamsChart } = useGetExamsCharts(params.classId ?? "", {});
  const { data: studentsPerformanceByPlanet } = useGetStudentsPlanetsPerformance(params.classId ?? "", {});
  const { data: studentsPerformanceByExams } = useGetStudentsExamsPerformance(params.classId ?? "", {});

  return (
    <>
      <SchoolClassHeader schoolClass={schoolClass ?? {}} />

      <Accordion
        variant="separated"
        chevron={<IconPlus size="1rem" />}
        chevronPosition="left"
        multiple={true}
      >
        <ExamsPerformance schoolClassPerformanceExams={schoolClassPerformanceExams} />
        <PlanetsPerformance schoolClassPerformancePlanets={schoolClassPerformancePlanets} />
        <ExamsChart schoolClassExamsChart={schoolClassExamsChart} />
        <StudentsPerformanceBy
          studentsPerformanceByPlanet={studentsPerformanceByPlanet}
          studentsPerformanceByExams={studentsPerformanceByExams}
        />
      </Accordion >
    </>
  );
}
