import {
  Card,
  Flex,
  Stack,
  Group,
  Title,
  Text,
  useMantineTheme,
  Button,
  Collapse,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFileDescription, IconMinus, IconPlus, IconUsers } from "@tabler/icons-react";

type componentProps = {
  className?: string;
  classNumber?: string;
  classesQuantity?: string;
  studentsQuantity?: string;
  teachersQuantity?: string;
};

export function CardDashboardClass({
  classNumber,
  className,
  classesQuantity,
  studentsQuantity,
  teachersQuantity,
}: componentProps) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Card h="100%" pb={40}>
      <Card.Section>
        <Box p={20} pb={0}>
          <Title order={4} weight={400} mb={20} color={theme.colors.blue[9]}>
            {className}
          </Title>

          <Flex justify={"space-between"} mb={20}>
            <Stack spacing={3} align="center">
              <Text size="sm" color="dimmed">
                Turmas
              </Text>
              <Text weight={600}>{classesQuantity}</Text>
            </Stack>
            <Stack spacing={3} align="center">
              <Text size="sm" color="dimmed">
                Alunos
              </Text>
              <Text weight={600}>{studentsQuantity}</Text>
            </Stack>
            <Stack spacing={3} align="center">
              <Text size="sm" color="dimmed">
                Professores
              </Text>
              <Text weight={600}>{teachersQuantity}</Text>
            </Stack>
          </Flex>

          <Button
            fullWidth
            onClick={toggle}
            styles={{
              root: {
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                fontSize: "14px",
                color: opened ? theme.colors.blue[0] : theme.colors.blue[6],
                backgroundColor: opened ? theme.colors.blue[6] : theme.colors.blue[0],
                '&:hover': {
                  color: theme.colors.blue[0],
                }
              },
              label: {
                justifyContent: "space-between",
                width: "-webkit-fill-available"
              }
            }}
          >
            <Flex align="center">
              {opened ? <IconMinus size="0.9rem" /> : <IconPlus size="0.9rem" />}&nbsp;
              {classNumber}
            </Flex>

            <Flex align="center">
              {studentsQuantity}&nbsp;
              <IconUsers size="0.9rem" />
            </Flex>
          </Button>
        </Box>

        <Collapse in={opened} pt={10}>
          <Box
            pt={10}
            px={20}
            style={{ backgroundColor: `${theme.colors.gray[0]}` }}
          >
            <Group>
              <Text size="sm" fw={700}>
                Desempenho em Provas (%)
              </Text>
              <Text size="sm" c="dimmed">
                Consc. Fonológica&nbsp;
                <span style={{ color: theme.colors.orange[4] }}>85%</span>
              </Text>
              <Text size="sm" c="dimmed">
                Sistema de Escrita Alfab.&nbsp;
                <span style={{ color: theme.colors.green[9] }}>90%</span>
              </Text>
              <Text size="sm" c="dimmed">
                Leitura e Comp. de Texto&nbsp;
                <span style={{ color: theme.colors.red[9] }}>63%</span>
              </Text>
            </Group>
            <Group style={{ marginTop: "20px" }}>
              <Text size="sm" fw={700}>
                Desempenho em Planetas (%)
              </Text>
              <Text size="sm" c="dimmed">
                Consc. Fonológica&nbsp;
                <span style={{ color: theme.colors.orange[4] }}>85%</span>
              </Text>
              <Text size="sm" c="dimmed">
                Sistema de Escrita Alfab.&nbsp;
                <span style={{ color: theme.colors.green[9] }}>90%</span>
              </Text>
              <Text size="sm" c="dimmed">
                Leitura e Comp. de Texto&nbsp;
                <span style={{ color: theme.colors.red[9] }}>63%</span>
              </Text>
            </Group>

            <Flex my={20}>
              <Text
                mb={20}
                size="sm"
                fw={600}
                c="blue.6"
              >
                Mais Detalhes da Turma&nbsp;
              </Text>
              <IconFileDescription size="1.2rem" style={{ color: theme.colors.blue[6] }} />
            </Flex>
          </Box>
        </Collapse>
      </Card.Section>
    </Card>
  );
}
