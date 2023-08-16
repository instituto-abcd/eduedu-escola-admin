import { useState } from "react";
import { SchoolClass, useSchoolClassGetAll, useStudentsBySchoolclass, useStudentsDestiny } from "~/api/school-class";
import { Group, Modal, Text, Divider, Button, Grid } from "@mantine/core";
import { MoveStudentsBox } from "./MoveStudentsBox";
import { successNotification } from "~/utils/successNotification";
import { errorNotification } from "~/utils/errorNotification";

type Props = {
    opened: boolean;
    onClose: () => void;
    originSchoolClass: SchoolClass;
}

export function Step02({ opened, onClose, originSchoolClass }: Props) {

    const { data: schoolClasses, isLoading: isLoadingClasses } = useSchoolClassGetAll({ pageSize: 999 });
    let schoolClassesOptions = schoolClasses?.items.filter((item) => item.id != originSchoolClass.id).map(({ name, id }) => ({
        label: name.toString(),
        value: id
    })) ?? []

    // getting data from child:
    const { mutate: moveStudents, isLoading: isMoveStudentsLoading } = useStudentsDestiny({
        onSuccess: () => {
            successNotification(
                "Operação realizada com sucesso",
                "Alunos movidos!"
            );
            onClose()
        },
        onError: (error) => {
            errorNotification(
                "Erro durante a operação",
                `${error.message} (cod: ${error.code})`
            );
        },
    });

    const [childData, setchildData] = useState({})
    function handleChildData(destinyId: string, studentsIds: string[]) {
        setchildData(
            {
                destinationId: destinyId,
                form: {
                    originId: originSchoolClass.id,
                    studentIds: studentsIds
                }
            }
        )
    }
    function save() {
        if (!childData) return
        moveStudents(childData)
    }
    return (
        <>
            <Modal
                title="Promover alunos"
                opened={opened}
                onClose={onClose}
                size="xl"
            >
                <>
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
                </>
                <MoveStudentsBox
                    schoolClasses={schoolClassesOptions}
                    schoolClassOrigin={originSchoolClass}
                    parentCallback={handleChildData}
                />
                <Divider my="xl" />
                <Group position="right">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button onClick={save}>
                        Salvar
                    </Button>
                </Group>
            </Modal>
        </>
    )
}