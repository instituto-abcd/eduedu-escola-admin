import { Accordion, Text, useMantineTheme } from "@mantine/core";

type componentProps = {
    summaries: Array<{}>;
}

export function StudentReport({ summaries }: componentProps) {
    const theme = useMantineTheme();
    return (
        <Accordion.Item value="studentReport">
            <Accordion.Control
                style={{
                    color: theme.colors.indigo[9],
                    maxWidth: '85%'
                }}
            >
                <Text>Relatório do aluno</Text>
            </Accordion.Control>

            <Accordion.Panel>
                {summaries &&
                    summaries.map((item) => (
                        <Text
                            key={item?.axisCode}
                            dangerouslySetInnerHTML={{ __html: `${item?.summary}` }}
                            pb={20}
                        />
                    ))
                }
            </Accordion.Panel>
        </Accordion.Item>
    )
}