import { Stack, Group, Text } from "@mantine/core";
import { ExamItem } from "./ExamItem";

type componentProps = {
    item: string
}
export function ExamPerformance({ item }: componentProps) {
    return (
        <>
            <Stack>
                <Text align="center">{item.axisName}</Text>
                <Group spacing="xl">
                    <ExamItem
                        title={item.axisName}
                        label="Muito Abaixo"
                        count={item.veryLow.count}
                        color="red.9"
                        students={item.veryLow.students}
                    />
                    <ExamItem
                        title={item.axisName}
                        color="orange.4"
                        count={item.below.count}
                        label="Abaixo"
                        students={item.below.students}
                    />
                    <ExamItem
                        title={item.axisName}
                        color="green.8"
                        count={item.expected.count}
                        label="Esperado"
                        students={item.expected.students}
                    />
                </Group>
            </Stack>
        </>
    )
}