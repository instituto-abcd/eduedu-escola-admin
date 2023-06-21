// os brabo:
import { useSchoolYearCreate } from '~/api/school-year';
import { errorNotification } from '~/utils/errorNotification';
import { successNotification } from '~/utils/successNotification';

// Components:
import { Card, Text, Button } from '@mantine/core'
import { modals } from '@mantine/modals';
import { HorizontalRule } from "~/components/HorizontalRule";

type componentProps = {
    disabled?: boolean
}

export function NewSchoolYear({ disabled }: componentProps) {

    const { mutate: createSchoolYear, isLoading: isCreateLoading } = useSchoolYearCreate({
        onError: (error) => {
            errorNotification("Erro", `${error.message} (cod: ${error.code})`);
        },
        onSuccess: () => {
            successNotification("Sucesso", "Ano letivo criado com sucesso!");
        },
    });

    // Modals:
    const openModalNovoAnoLetivo = () => modals.openConfirmModal({
        title: 'Novo Ano Letivo',
        children: (
            <>
                <Text size="sm">
                    Ao adicionar um novo ano letivo, o ano letivo atual terá todas as turmas clonadas.
                    Caso seu novo ano letivo tenha mais ou menos turmas, edite-as no menu turmas.
                </Text>
                <HorizontalRule />
            </>
        ),
        labels: { confirm: 'Sim', cancel: 'Não' },
        onConfirm: () => createSchoolYear(),
    });

    return (
        <Card>
            <Card.Section>
                <Button
                    size={'sm'}
                    variant="outline"
                    disabled={disabled}
                    onClick={openModalNovoAnoLetivo}
                >
                    Adicionar Novo Ano Letivo +
                </Button>
            </Card.Section>
        </Card>
    )
}