import { Button, Card, useMantineTheme } from '@mantine/core'
import { HeaderCard, ContentCard } from './commons/index'

type componentProps = {
    item?: any
}

export function Active({ item }: componentProps) {
    const theme = useMantineTheme()
    return (
        <Card>
            <Card.Section>
                <HeaderCard year={item?.name} status="Ativo" />
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
                    Ver Detalhes
                </Button>
            </Card.Section>
        </Card>
    )
}