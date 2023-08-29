import { Stack, Group, Text } from "@mantine/core";
import { ExamItem } from "./ExamItem";

type componentProps = {
    item: string
}
export function ExamPerformance({ item }: componentProps) {
    return (
        <Stack>
            <Text align="center">{item.axisName}</Text>
            <Group spacing="xl">
                <ExamItem
                    count={item.veryLow.count}
                    label="Muito Abaixo"
                    color="red.9"
                />
                <ExamItem
                    count={item.below.count}
                    color="orange.4"
                    label="Abaixo"
                />
                <ExamItem
                    count={item.expected.count}
                    color="green.8"
                    label="Esperado"
                />
            </Group>
        </Stack>
    )
}