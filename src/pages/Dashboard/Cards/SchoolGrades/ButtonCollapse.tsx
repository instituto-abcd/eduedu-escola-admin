import { useDisclosure } from "@mantine/hooks";
import { AXIS_ENUM } from "~/constants";
import { Box, Button, Collapse, Flex, Group, useMantineTheme, Text, createStyles, Rating } from "@mantine/core";
import { IconFileDescription, IconMinus, IconPlus, IconUsers } from "@tabler/icons-react";
import { PATH } from "~/constants/path";
import { Link } from "react-router-dom";

type componentsProps = {
    schoolClass: any;
}

type PerformanceItem = {
    axis: string;
    percentage: number;
  };

const useStyles = createStyles({
    linkDetailClass: {
        color: '#000',
        fontWeight: 'bold',
        textDecoration: 'none'
    }
})

export function ButtonCollapse({ schoolClass }: componentsProps) {
    const theme = useMantineTheme();
    const { classes } = useStyles();

    const [opened, { toggle }] = useDisclosure(false);

    const renderDesempenho = (
        title: string,
        performanceData: PerformanceItem[] | null,
        type: string,
      ) => {
        return (
            <Group style={performanceData ? {} : { display: "none" }} pb={20}>
                <Text size="sm" fw={700}>
                    {title}
                </Text>
                {performanceData.map((item) => (
                    <Text size="sm" c="dimmed" key={item.axis}>
                        <Box style={{ display:'flex' }}>
                            {AXIS_ENUM[`${item.axis}_ABREV`]}&nbsp;
                            {type === 'Provas' ? (
                            <span style={{ color: theme.colors.orange[4] }}>
                                {item.percentage}%
                            </span>
                            ): 
                                <Rating readOnly defaultValue={item.percentage ?? 0} value={item.percentage} style={{alignItems:'center'}} />
                            }
                        </Box>
                    </Text>
                ))}
                {!performanceData || performanceData.length === 0 && (
                    <Text size="sm" c="dimmed">Nenhum dado disponível.</Text>
                )}
            </Group>
        );
    }

    return (
        <Box mb={20}>
            <Button
                fullWidth
                onClick={toggle}
                styles={{
                    root: {
                        paddingLeft: "0.8rem",
                        paddingRight: "0.8rem",
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
                    <IconUsers size="1rem" />
                </Flex>
            </Button>

            <Collapse in={opened} pt={10} style={{ backgroundColor: `${theme.colors.gray[0]}` }}>
                <Box
                    pt={10}
                    px={20}
                >
                    {renderDesempenho('Desempenho em Provas (%)', schoolClass.examPerformance, 'Provas')}
                    {renderDesempenho('Desempenho em Planetas (%)', schoolClass.planetPerformance, 'Planetas')}

                    <Link
                        to={`${PATH.CLASSES}/${schoolClass.id}`}
                        search=""
                        className={classes.linkDetailClass}
                    >
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
                    </Link>
                </Box>
            </Collapse>
        </Box>
    )
}