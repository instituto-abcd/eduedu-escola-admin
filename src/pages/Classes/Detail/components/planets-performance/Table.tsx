import { Table } from "@mantine/core";
import { Rating } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetPlanetsPerformance } from "~/api/school-class";

export function PlanetPerformanceTable() {
  const params = useParams();
  const schoolClassId = params.classId ?? "";

  const { data } = useGetPlanetsPerformance(schoolClassId, {
    initialData: [],
  });

  const theads = [
    { name: "Nome" },
    { name: "Planetas Oferecidos" },
    { name: "Planetas Realizados" },
    { name: "Média Estrelas" },
  ];

  return (
    <Table horizontalSpacing="sm" verticalSpacing="md">
      <thead>
        <tr>
          {theads.map((item) => (
            <th key={item.name}>{item.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.axisCode}>
            <td>{item.axisName}</td>
            <td>{item.offeredPlanets}</td>
            <td>{item.accomplishedPlanets}</td>
            <td>
              <Rating
                readOnly
                defaultValue={item.averageStars ?? 0}
                value={item.averageStars}
                key={Math.random()}
                style={{ width: "100px" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
