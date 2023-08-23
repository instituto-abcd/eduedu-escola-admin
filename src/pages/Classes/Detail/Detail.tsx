import {
  Accordion,
  Button,
  Flex,
  Select,
  useMantineTheme,
  Divider,
  ActionIcon,
  Box,
  Text,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { DetailsHeader } from "~/components/Classes/Details/DetailsHeader";
import {
  StudentsPerformance,
  TestPerformance,
  TestResultsHistory,
} from "~/components/Classes/Details/TestsPerformance";

import { PlanetsPerformance } from "./components/PlanetsPerformance";

export function ClassDetailPage() {
  const theme = useMantineTheme();

  return (
    <>
      <DetailsHeader />

      <Accordion
        variant="separated"
        chevron={<IconPlus size="1rem" />}
        chevronPosition="left"
        styles={{
          chevron: {
            "&[data-rotate]": {
              transform: "rotate(45deg)",
            },
          },
          item: {
            backgroundColor: '#fff',
            boxShadow: "4px 6px 15px -5px rgba(0,0,0,0.40)",
          }
        }}
      >
        <Accordion.Item value="testPerformance">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Accordion.Control
              style={{
                color: theme.colors.indigo[9],
                maxWidth: '85%'
              }}
            >
              <Text>Desempenho em Provas</Text>
            </Accordion.Control>

            <ActionIcon>
              <Button
                size="xs"
                style={{
                  color: theme.colors.blue[6],
                  backgroundColor: theme.colors.blue[0],
                }}
              >
                Alunos que não precisam de reforço
              </Button>
            </ActionIcon>
          </Box>

          <Accordion.Panel>
            <Flex justify="space-around">
              <TestPerformance examType="Consciência Fonológica" />
              <Divider orientation="vertical" variant="solid" />
              <TestPerformance examType="Sistema de Escrita Alfabética" />
              <Divider orientation="vertical" variant="solid" />
              <TestPerformance examType="Leitura e Compreensão de Texto" />
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="planetsPerformance">
          <Accordion.Control>Desempenho em Planetas</Accordion.Control>
          <Accordion.Panel>
            <PlanetsPerformance />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="testResultsHistory">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Accordion.Control style={{ width: '40%' }}>
              Histórico de Resultado de Provas
            </Accordion.Control>
            <Flex>
              <Box style={{ display: 'flex' }}>
                <Box style={{ width: '20px', height: '20px', backgroundColor: '#66d9e8', margin: '0 5px 0 15px' }}></Box>
                <Text fz="sm">Consciência fonológica</Text>
              </Box>
              <Box style={{ display: 'flex' }}>
                <Box style={{ width: '20px', height: '20px', backgroundColor: '#d0bfff', margin: '0 5px 0 15px' }}></Box>
                <Text fz="sm">Sistema de Escrita Alfabética</Text>
              </Box>
              <Box style={{ display: 'flex' }}>
                <Box style={{ width: '20px', height: '20px', backgroundColor: '#ffc078', margin: '0 5px 0 15px' }}></Box>
                <Text fz="sm">Leitura e Compreensão de Texto</Text>
              </Box>
            </Flex>
          </Box>
          <Accordion.Panel>
            <TestResultsHistory />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="studentsPerformance">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Accordion.Control style={{ width: '90%' }}>
              <Flex>
                Desempenho de Alunos por &nbsp;
              </Flex>
            </Accordion.Control>
            <Select withinPortal style={{ width: "100px" }} data={[]} />
          </Box>
          <Accordion.Panel>
            <StudentsPerformance />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
