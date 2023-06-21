import { Center, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

type componentsProps = {
    tooltipText: string,
    text: string
}

export function InfoTooltip({ text, tooltipText }: componentsProps) {
    return (
        <>
            <Center>
                <Text mr={5}>{text}</Text>
                <Tooltip
                    label={tooltipText}
                    color="dark.3"
                    withArrow
                >
                    <IconInfoCircle size="20px" />
                </Tooltip>
            </Center>
        </>
    )
}