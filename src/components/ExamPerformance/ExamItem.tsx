import { Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";

type componentProps = {
    count: number;
    label: string;
    color: string;
}
export function ExamItem({ count, label, color }: componentProps) {
    const theme = useMantineTheme();

    return (
        <Stack>
            <Flex justify="center">
                <Text
                    weight={600}
                    color="blue.6"
                >
                    {count}
                </Text>
                <IconUsers color={theme.colors.blue[6]} />
            </Flex>
            <Text
                weight={700}
                color={color}
            >
                {label}
            </Text>
        </Stack>
    )
}