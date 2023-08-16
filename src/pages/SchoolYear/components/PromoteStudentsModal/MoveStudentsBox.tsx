import { Grid, LoadingOverlay, Select, SelectItem, TransferList, TransferListData, TransferListItem } from "@mantine/core";
import { useEffect, useState } from "react";
import { SchoolClass, useStudentsBySchoolclass } from "~/api/school-class";

type ComponentProps = {
    schoolClasses: Array<SelectItem>;
    schoolClassOrigin?: SchoolClass;
    parentCallback: (destinyId: string, studentsIds: string[]) => void;
}
export function MoveStudentsBox({ schoolClasses, schoolClassOrigin, parentCallback }: ComponentProps) {
    const [destinyId, setDestinyId] = useState('')

    const [origin, setOrigin] = useState<TransferListItem[]>([])
    const [destiny, setDestiny] = useState<TransferListItem[]>([])
    const [data, setData] = useState<TransferListData>([origin, destiny])

    useEffect(() => {
        setData([origin, destiny])
    }, [origin, destiny])

    const { isFetching: isLoadingStudentsOrigin } = useStudentsBySchoolclass(schoolClassOrigin?.id ?? "",
        {
            onSuccess(data) {
                setOrigin(data?.items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })))
            },
        });
    const { isFetching: isLoadingStudentsDestiny } = useStudentsBySchoolclass(destinyId, {
        enabled: destinyId !== "",
        onSuccess(data) {
            setDestiny(data.items.map((item) => ({
                value: item.id,
                label: item.name,
            })))
        },
    });

    const isLoading = isLoadingStudentsOrigin || isLoadingStudentsDestiny

    function onChangeSend(value: TransferListData) {
        if (destinyId == '') return
        parentCallback(destinyId, value[1].map((item) => item.value))
        setData(value)
    }
    return (
        <Grid columns={2}>
            <Grid.Col span={1}>
                <Select
                    placeholder={schoolClassOrigin?.name}
                    data={schoolClassOrigin ? [{ value: schoolClassOrigin.id, label: schoolClassOrigin.name }] : []}
                    disabled={!!schoolClassOrigin}
                />
            </Grid.Col>
            <Grid.Col span={1}>
                <Select
                    placeholder={"Selecione"}
                    data={schoolClasses}
                    onChange={(value) => value ? setDestinyId(value) : {}}
                />
            </Grid.Col>
            <Grid.Col span={2}>
                <TransferList
                    value={data}
                    onChange={onChangeSend}
                    searchPlaceholder="Procurar..."
                    nothingFound="Nenhum aluno na turma"
                    titles={['Origem', 'Destino']}
                    breakpoint="sm"
                />
                <LoadingOverlay visible={isLoading} />
            </Grid.Col>
        </Grid>
    )
}