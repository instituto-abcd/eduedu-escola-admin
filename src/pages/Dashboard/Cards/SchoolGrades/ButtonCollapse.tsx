import { useDisclosure } from "@mantine/hooks";
import { AXIS_ENUM } from "~/constants";
import { Box, Button, Collapse, Flex, Group, useMantineTheme, Text } from "@mantine/core";
import { IconFileDescription, IconMinus, IconPlus, IconUsers } from "@tabler/icons-react";

type componentsProps = {
    schoolClass: any;
}
export function ButtonCollapse({ schoolClass }: componentsProps) {
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <Box mb={20}>
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
                    {schoolClass.name}
                </Flex>

                <Flex align="center">
                    {schoolClass.studentsCounter}&nbsp;
                    <IconUsers size="0.9rem" />
                </Flex>
            </Button>

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
                        {schoolClass.examPerformance.map((exam) => (
                            <Text size="sm" c="dimmed">
                                {AXIS_ENUM[exam.axis]}
                                &nbsp;
                                <span style={{ color: theme.colors.orange[4] }}>
                                    {exam.percentage}
                                </span>
                            </Text>
                        ))}
                    </Group>

                    <Group style={{ marginTop: "20px" }}>
                        <Text size="sm" fw={700}>
                            Desempenho em Planetas (%)
                        </Text>
                        {schoolClass.planetPerformance.map((planet) => (
                            <Text size="sm" c="dimmed">
                                {AXIS_ENUM[planet.axis]}&nbsp;
                                <span style={{ color: theme.colors.orange[4] }}>
                                    {planet.percentage}
                                </span>
                            </Text>
                        ))}
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
        </Box>
    )
}