import { Accordion, Box, Flex, Select } from "@mantine/core";
import { useState } from "react";
import { TablePlanet } from "./TablePlanet";
import { TableExams } from "./TableExams";

export function StudentsPerformanceBy() {
  const [performanceType, setPerformanceType] = useState<string | null>(
    "Provas",
  );
  const selectOptions = [
    {
      label: "Provas",
      value: "Provas",
    },
    {
      label: "Planetas",
      value: "Planetas",
    },
  ];

  return (
    <Accordion.Item value="block-4">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Accordion.Control>
          <Flex align="center">
            Desempenho de Alunos por &nbsp;
            <Select
              onClick={(event) => event.stopPropagation()}
              onChange={(value) => setPerformanceType(value)}
              value={performanceType}
              withinPortal
              style={{ width: "100px" }}
              data={selectOptions}
            />
          </Flex>
        </Accordion.Control>
      </Box>
      <Accordion.Panel>
        {performanceType == "Provas" && <TableExams />}
        {performanceType == "Planetas" && <TablePlanet />}
      </Accordion.Panel>
    </Accordion.Item>
  );
}