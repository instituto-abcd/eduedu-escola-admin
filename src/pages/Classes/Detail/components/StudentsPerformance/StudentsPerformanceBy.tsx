import { Accordion, Box, Flex, Select } from "@mantine/core"
import { useState } from "react";
import { TablePlanet } from "./TablePlanet";
import { TableExams } from "./TableExams";

type componentProps = {
    studentsPerformanceByPlanet: Array<T>;
    studentsPerformanceByExams: Array<T>;
}
export function StudentsPerformanceBy({ studentsPerformanceByExams, studentsPerformanceByPlanet }: componentProps) {
    const [performanceType, setPerformanceType] = useState('Provas');
    const selectOptions = [
        {
            label: 'Provas',
            value: 'Provas'
        },
        {
            label: 'Planetas',
            value: 'Planetas'
        }
    ]

    return (
        <Accordion.Item value="studentsPerformance">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Accordion.Control>
                    <Flex align="center">
                        Desempenho de Alunos por &nbsp;
                        <Select
                            value={performanceType}
                            withinPortal
                            style={{ width: "100px" }}
                            data={selectOptions}
                        />
                    </Flex>
                </Accordion.Control>
            </Box>
            <Accordion.Panel>
                {performanceType == "Provas" &&
                    <TableExams data={studentsPerformanceByExams} />
                }
                {performanceType == "Planetas" &&
                    <TablePlanet data={studentsPerformanceByPlanet} />
                }
            </Accordion.Panel>
        </Accordion.Item>
    )
}