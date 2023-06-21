import { Flex, Stack, Text } from '@mantine/core'

type componentProps = {
    classesQuantity?: string;
    studentsQuantity?: string;
    teachersQuantity?: string;
};

export function Content({ classesQuantity, studentsQuantity, teachersQuantity }: componentProps) {
    return (
        <Flex justify={'space-between'}>
            <Stack>
                <Text size="sm" color="dimmed">Turmas</Text>
                <Text weight={600}>{classesQuantity}</Text>
            </Stack>

            <Stack>
                <Text size="sm" color="dimmed">Alunos</Text>
                <Text weight={600}>{studentsQuantity}</Text>
            </Stack>

            <Stack>
                <Text size="sm" color="dimmed">Professores</Text>
                <Text weight={600}>{teachersQuantity}</Text>
            </Stack>
        </Flex>
    )
}
