import { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useSchoolClassGetAll } from "~/api/school-class";
import { useDisclosure } from "@mantine/hooks";
import { Step02 } from "./Step02";
import { Button, Divider, Group, Modal, Select, Text } from "@mantine/core";

type Props = {
    opened: boolean;
    onClose: () => void;
}

export function PromoteStudentsModal({ opened, onClose }: Props) {
    const { data: schoolClasses, isLoading: isLoadingClasses } =
        useSchoolClassGetAll({
            pageSize: 999,
        });

    const promoteStudentForm = z.object({
        schoolClassId: z.string().nonempty({ message: "Campo obrigatório" }),
    });

    const form = useForm({
        initialValues: {
            schoolClassId: "",
        },
        validate: zodResolver(promoteStudentForm),
    });

    const [originSchoolClass, setOriginSchoolClassHandlers] = useState({})
    const [MoveStudents, MoveStudentsHandlers] = useDisclosure(false)
    function openMoveStudents(values: string) {
        MoveStudentsHandlers.open()
        onClose()
    }
    return (
        <>
            <Modal
                title="Promover alunos"
                opened={opened}
                onClose={onClose}
            >
                <form onSubmit={form.onSubmit((values) => {
                    let originSchool = schoolClasses?.items.filter((item) => item.id == values.schoolClassId)
                    setOriginSchoolClassHandlers(originSchool[0])
                    openMoveStudents(values.schoolClassId)
                }
                )}>
                    <Text size="sm" mb={20}>Para promover os alunos de turma é necessário seguir algumas etapas.</Text>
                    <Text size="sm" mb={20}>Selecione a turma que deseja promover.</Text>
                    <Select
                        withinPortal
                        data={
                            schoolClasses?.items.map((item) => ({
                                value: item.id,
                                label: item.name,
                            })) ?? []
                        }
                        placeholder="Selecione"
                        disabled={isLoadingClasses}
                        {...form.getInputProps("schoolClassId")}
                    />
                    <Divider my="xl" />
                    <Group position="right">
                        <Button
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Continuar
                        </Button>
                    </Group>
                </form>
            </Modal>

            <Step02
                opened={MoveStudents}
                onClose={MoveStudentsHandlers.close}
                originSchoolClass={originSchoolClass}
            />
        </>
    )
}