// os brabo:
import { errorNotification } from '~/utils/errorNotification';
import { successNotification } from '~/utils/successNotification';
import { useSchoolYearActivate, useSchoolYearDelete } from '~/api/school-year';
// Components:
import { modals } from '@mantine/modals';
import { Card, Group, Text, Button } from '@mantine/core'
import { ContentCard, HeaderCard } from './commons';

type componentProps = {
    item?: any
}

export function Draft({ item }: componentProps) {
    const { mutate: activeSchoolYear, isLoading: isActiveLoading } = useSchoolYearActivate({
        onError: (error) => {
            errorNotification("Erro", `${error.message} (cod: ${error.code})`);
        },
        onSuccess: () => {
            successNotification("Sucesso", "Ano letivo ativado com sucesso!");
        },
    });

    const { mutate: deleteSchoolYear, isLoading: isDeleteLoading } = useSchoolYearDelete({
        onError: (error) => {
            errorNotification("Erro", `${error.message} (cod: ${error.code})`);
        },
        onSuccess: () => {
            successNotification("Sucesso", "Ano letivo deletado com sucesso!");
        },
    });

    // Modals
    const openModalAtivarAnoLetivo = (itemId: string) => modals.openConfirmModal({
        title: 'Ativar Ano Letivo',
        children: (
            <Text size="sm">
                Deseja ativar o ano letivo selecionado?
                Deseja continuar?
            </Text>
        ),
        labels: { confirm: 'Sim', cancel: 'Não' },
        onConfirm: () => activeSchoolYear((itemId)),
    })
    const openModalDeleteAnoLetivo = () => modals.openConfirmModal({
        title: 'Excluir',
        children: (
            <Text size="sm">
                Deseja excluir o ano letivo selecionado?
                Todas as informações cadastradas serão perdidas.
                Deseja continuar?
            </Text>
        ),
        labels: { confirm: 'Sim', cancel: 'Não' },
        onConfirm: () => deleteSchoolYear(),
    });

    return (
        <Card>
            <Card.Section>
                <HeaderCard year={item?.name} status="Inativo">
                    <Group position="apart">
                        <Button
                            size={'xs'}
                            variant="light"
                            color="red"
                            onClick={openModalDeleteAnoLetivo}>
                            Excluir
                        </Button>
                        <Button
                            size={'xs'}
                            variant="light"
                            onClick={() => openModalAtivarAnoLetivo(item?.id)}>
                            Ativar
                        </Button>
                    </Group>
                </HeaderCard>
                <ContentCard
                    classesQuantity={item?.summary.totalSchoolClasses}
                    studentsQuantity={item?.summary.totalStudents}
                    teachersQuantity={item?.summary.totalTeachers}
                />
            </Card.Section>
        </Card>
    )
}