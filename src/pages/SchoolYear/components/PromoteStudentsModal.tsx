import { Button, Divider, Group, Modal, Select, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useSchoolClassGetAll } from "~/api/school-class";
import { MoveStudentsModal } from "./MoveStudentsModal";
import { useDisclosure } from "@mantine/hooks";

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

    const [MoveStudents, MoveStudentsHandlers] = useDisclosure(false)
    function openMoveStudents(values) {
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
                <form onSubmit={form.onSubmit((values) => openMoveStudents(values))}>
                    <Text size="sm" mb={20}>Para promover os alunos de turma é necessário seguir algumas etapas.</Text>
                    <Text size="sm" mb={20}>Selecione a turma que deseja promover.</Text>
                    <Select
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

            <MoveStudentsModal
                opened={MoveStudents}
                onClose={MoveStudentsHandlers.close}
                schoolClassId={form.schoolClassId}
            />
        </>
    )
}