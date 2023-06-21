import { Button, Card, useMantineTheme } from '@mantine/core'
import { HeaderCard, ContentCard } from './commons'

type componentProps = {
    item?: any
}

export function Finished({ item }: componentProps) {
    const theme = useMantineTheme()
    return (
        <Card>
            <Card.Section>
                <HeaderCard year={item?.name} status="Finalizado" />
                <ContentCard
                    classesQuantity={item?.summary.totalSchoolClasses}
                    studentsQuantity={item?.summary.totalStudents}
                    teachersQuantity={item?.summary.totalTeachers}
                />
                <Button
                    mt={20}
                    size="xs"
                    color="blue.0"
                    fullWidth
                    style={{ color: theme.colors.blue[6] }}>
                    Ver Histórico
                </Button>
            </Card.Section>
        </Card>
    )
}