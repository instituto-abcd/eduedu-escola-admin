import { Box, Title, Text } from "@mantine/core";

type componentProps = {
    summaries: Array<{}>;
}

export function TextReport({ summaries }: componentProps) {
    return (
        <Box mt={40}>
            <Title order={4} pb={20}>Relatório do aluno:</Title>

            {summaries &&
                summaries.map((item) => (
                    <Text
                        key={item?.axisCode}
                        dangerouslySetInnerHTML={{ __html: `${item?.summary}` }}
                        pb={20}
                    />
                ))
            }
        </Box>
    )
}