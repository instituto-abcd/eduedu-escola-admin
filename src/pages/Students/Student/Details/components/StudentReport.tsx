import { Accordion, Text, useMantineTheme } from "@mantine/core";

export function StudentReport() {
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
                <Text>
                    De acordo com a atividade realizada, percebemos que Amanda teve alto desempenho em Consciência Fonológica, sendo capaz de identificar e manipular os sons das palavras.
                </Text>

                <Text>
                    Além disso, em relação ao sistema de rescrita alfabética (SEA), Amanda alcançou o nível desejado para seu ano escolar. O sistema de escrita alfabética refere-se ao domínio das regras e convenções da língua portuguesa.
                </Text>

                <Text>
                    Amanda ainda está no início do processo de letramento e alfabetização. Para um bom desempenho em leitura, é necessário compreender o sentido do texto. Ler e contar histórias para a criança e conversar com ela sobre acontecimentos diários são maneiras de ajudá-la a desenvolver essas habilidades.
                </Text>
            </Accordion.Panel>
        </Accordion.Item>
    )
}