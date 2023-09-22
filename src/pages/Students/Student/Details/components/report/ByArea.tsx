import { Box, Divider, Flex, Title, Text } from "@mantine/core";

type componentProps = {
    performanceByArea: Array<{}>;
}
export function ByArea({ performanceByArea }: componentProps) {
    return (
        <Box mt={40}>
            <Title order={4} pb={20}>Desempenho do aluno área:</Title>

            <Flex justify="space-around">
                {performanceByArea &&
                    performanceByArea.map((item, i) => (
                        <Box key={item?.axisCode}>
                            <Text>{item?.axisName}: <span style={{ color: `${item?.color}` }}>{item?.description}</span></Text>
                            {(i + 1) != performanceByArea.length &&
                                <Divider orientation="vertical" variant="solid" />
                            }
                        </Box>
                    ))
                }
            </Flex>
        </Box>
    )
}