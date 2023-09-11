import { Button, useMantineTheme } from "@mantine/core";

type componentProps = {
    label: string;
    mr?: string;
    parentCallback?: () => void;
}
export function AccordionButton({ label, mr, parentCallback }: componentProps) {
    const theme = useMantineTheme();
    return (
        <Button
            mr={mr}
            size="xs"
            style={{
                color: theme.colors.blue[6],
                backgroundColor: theme.colors.blue[0],
            }}
            onClick={parentCallback}
        >
            {label}
        </Button>
    )
}