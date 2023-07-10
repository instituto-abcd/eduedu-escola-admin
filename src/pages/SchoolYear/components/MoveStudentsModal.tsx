import { Group, Modal, Text, Divider, Select, Button, Grid, Stack, Input, Tooltip, Checkbox, ScrollArea } from "@mantine/core";
import { IconChevronRight, IconChevronsRight } from "@tabler/icons-react";
import { useSchoolClassGetAll } from "~/api/school-class";

type Props = {
    opened: boolean;
    onClose: () => void;
    schoolClassId: string;
}

export function MoveStudentsModal({ opened, onClose, schoolClassId }: Props) {
    const { data: schoolClasses, isLoading: isLoadingClasses } =
        useSchoolClassGetAll({
            pageSize: 999,
        });

    const studentsList = [
        { name: 'Amanda' },
        { name: 'Amanda II' },
        { name: 'Amanda III' },
        { name: 'Amanda IV' },
        { name: 'Amanda V' },
        { name: 'Amanda VI' },
        { name: 'Amanda VII' },
        { name: 'Amanda VIII' },
        { name: 'Amanda IX' },
        { name: 'Amanda X' },
    ]
    return (
        <>
            <Modal
                title="Promover alunos"
                opened={opened}
                onClose={onClose}
                size="xl"
            >
                <form>
                    <Text size="sm" mb={20}>
                        1- Selecione os alunos que deseja promover na coluna da esquerda.
                    </Text>
                    <Text size="sm" mb={20}>
                        2- Em seguida, selecione para qual turma deseja promover os alunos selecionados na coluna da direita.
                    </Text>
                    <Text size="sm" mb={20}>
                        3- Após as duas seleções serem feitas, basta pressionar a seta e mover os alunos de uma lista para a outra.
                    </Text>
                    <Text size="sm" mb={20}>
                        Para transferir alunos para diferentes turmas, basta selecionar outra turma na coluna da direita.
                    </Text>

                    <Grid columns={2}>
                        <Grid.Col span={1}>
                            <Select
                                data={[]}
                                placeholder="Selecione"
                                disabled
                            />
                            <Stack mt={20}>
                                <Input
                                    placeholder="Selecione"
                                    rightSection={
                                        <>
                                            <Tooltip label="Mova os alunos para a próxima turma" position="top-end" withArrow>
                                                <div>
                                                    <IconChevronRight size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                                </div>
                                            </Tooltip>
                                            <Tooltip label="Mova os alunos para a próxima turma" position="top-end" withArrow>
                                                <div>
                                                    <IconChevronsRight size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                                </div>
                                            </Tooltip>
                                        </>
                                    }
                                />
                                <ScrollArea h={150} type="auto">
                                    {studentsList &&
                                        studentsList.map((item) => (
                                            <Checkbox label={item.name} mb={10} />
                                        ))
                                    }
                                </ScrollArea>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Select
                                data={
                                    schoolClasses?.items.map((item) => ({
                                        value: item.id,
                                        label: item.name,
                                    })) ?? []
                                }
                                placeholder="Selecione"
                                disabled={isLoadingClasses}
                            />
                            <Stack mt={20}>
                                <Input
                                    placeholder="Selecione"
                                    rightSection={
                                        <>
                                            <Tooltip label="Mova os alunos para a próxima turma" position="top-end" withArrow>
                                                <div>
                                                    <IconChevronRight size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                                </div>
                                            </Tooltip>
                                            <Tooltip label="Mova os alunos para a próxima turma" position="top-end" withArrow>
                                                <div>
                                                    <IconChevronsRight size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                                </div>
                                            </Tooltip>
                                        </>
                                    }
                                />
                                <ScrollArea h={150} type="auto">
                                    {studentsList &&
                                        studentsList.map((item) => (
                                            <Checkbox label={item.name} mb={10} />
                                        ))
                                    }
                                </ScrollArea>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                    <Divider my="xl" />
                    <Group position="right">
                        <Button
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Salvvar
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    )
}