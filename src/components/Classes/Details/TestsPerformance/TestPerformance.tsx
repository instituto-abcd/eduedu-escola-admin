import { Stack, Flex, Group, Text, useMantineTheme } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";

type componentProps = {
    examType: string
}
export function TestPerformance({ examType }: componentProps) {
    const theme = useMantineTheme()
    return (
        <Stack>
            <Text align="center">{examType}</Text>
            <Group>
                <Stack>
                    <Flex justify="center">
                        <Text weight={600} color="blue.6">03</Text>
                        <IconUsers color={theme.colors.blue[6]} />
                    </Flex>
                    <Text weight={700} color="red.9">Muito Abaixo</Text>
                </Stack>

                <Stack>
                    <Flex justify="center">
                        <Text weight={600} color="blue.6">37</Text>
                        <IconUsers color={theme.colors.blue[6]} />
                    </Flex>
                    <Text weight={700} color="orange.4">Abaixo</Text>
                </Stack>

                <Stack>
                    <Flex justify="center">
                        <Text weight={600} color="blue.6">00</Text>
                        <IconUsers color={theme.colors.blue[6]} />
                    </Flex>
                    <Text weight={700} color="green.8">Esperado</Text>
                </Stack>
            </Group>
        </Stack>
    )
}