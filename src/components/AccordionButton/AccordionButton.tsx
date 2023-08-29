import { Button, useMantineTheme } from "@mantine/core";

type componentProps = {
    label: string;
}
export function AccordionButton({ label }: componentProps) {
    const theme = useMantineTheme();
    return (
        <Button
            size="xs"
            style={{
                color: theme.colors.blue[6],
                backgroundColor: theme.colors.blue[0],
            }}
        >
            {label}
        </Button>
    )
}