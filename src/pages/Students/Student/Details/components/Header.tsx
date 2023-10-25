import { Button, Grid, Group, Title, Text } from "@mantine/core";
import { SCHOOL_GRADE, SCHOOL_PERIOD } from "~/constants";
import { StudentReport } from "./report/Index";
import { Print } from "~/utils/pdfDownload";

type componentProps = {
    student: Array<{}>;
    detailedSummary: Array<{}>;
}

export function HeaderStudent({ student, detailedSummary }: componentProps) {
    // Desestruturação de propriedades:
    const { name, registry, schoolGrade, schoolClassName, schoolPeriod } = student || {};

    // Componentes separados:
    const InfoItem = ({ label, value }) => (
        <Grid.Col span="content">
            <Group>
                <Title order={5}>{label}:</Title>
                <Text>{value}</Text>
            </Group>
        </Grid.Col>
    );
    return (
        <Grid columns={6} align="center" justify="space-between">
            <InfoItem label="Nome" value={name} />
            <InfoItem label="Série" value={registry} />
            <InfoItem label="Turma" value={schoolClassName} />
            <InfoItem label="Matrícula" value={SCHOOL_GRADE[schoolGrade ?? "Indisponível"]} />
            <InfoItem label="Matrícula" value={SCHOOL_PERIOD[schoolPeriod ?? "Indisponível"]} />

            <Grid.Col span={1}>
                <Button onClick={Print}>Gerar relatório</Button>
                <div id='printablediv' style={{ display: 'none' }}>
                    <StudentReport
                        student={student}
                        detailedSummary={detailedSummary}
                    />
                </div>
            </Grid.Col>
        </Grid>
    )
}