import { Box, useMantineTheme } from "@mantine/core";

export function HorizontalRule() {
    const theme = useMantineTheme();
    return (
        <Box style={{ border: `1px dashed ${theme.colors.gray[3]}`, margin: '20px 0' }}></Box>
    )
}