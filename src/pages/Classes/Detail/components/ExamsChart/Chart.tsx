import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Box, Text, useMantineTheme } from "@mantine/core";
import { processChartData } from "~/utils/chartMap";
import { useParams } from "react-router-dom";
import { useGetExamsCharts } from "~/api/school-class";

type Props = {
  maxWidth?: string;
};

export function Chart({ maxWidth }: Props) {
  const params = useParams();
  const schoolClassId = params.classId ?? "";

  const { data } = useGetExamsCharts(schoolClassId);

  const theme = useMantineTheme();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  );

  const options = {
    aspectRatio: 4,
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          callback: function(value: any) {
            return value + "%";
          },
        },
      },
    },
  };

  const [examsChart, setExamsChart] = useState({
    labels: data?.labels ?? [],
    datasets: processChartData(data?.datasets, theme) ?? [],
  });

  useEffect(() => {
    setExamsChart({
      labels: data?.labels ?? [],
      datasets: processChartData(data?.datasets, theme) ?? [],
    });
  }, [data]);

  return (
    <Box>
      {examsChart.datasets.length !== 0 && (
        <div
          className="chart-container"
          style={{ position: "relative", height: "35vh", width: "100%" }}
        >
          <Line
            options={options}
            data={examsChart}
            style={{ maxWidth: maxWidth ?? "auto" }}
          />
        </div>
      )}
      {!examsChart.datasets.length && (
        <Text my={20} align="center">
          Sem dados registrados em Histórico de Resultado de Provas.
        </Text>
      )}
    </Box>
  );
}