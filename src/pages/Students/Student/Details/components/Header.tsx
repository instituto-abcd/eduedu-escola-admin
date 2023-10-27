import { Button, Grid, Group, Title, Text } from "@mantine/core";
import { SCHOOL_GRADE, SCHOOL_PERIOD } from "~/constants";

import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "./PDFFile";


type componentProps = {
    student: Array<{}>;
    detailedSummary: Array<{}>;
}

export function HeaderStudent({ student }: componentProps) {
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
            <InfoItem label="Matrícula" value={schoolGrade ? SCHOOL_GRADE[schoolGrade] : "-"} />
            <InfoItem label="Período" value={schoolPeriod ? SCHOOL_PERIOD[schoolPeriod] : "-"} />

            <Grid.Col span={1}>
                <PDFDownloadLink document={<PDFFile />} filename="FORM">
                    {({ loading }) => (loading ?
                        <Button>Carregando relatório...</Button>
                        :
                        <Button>Gerar relatório</Button>
                    )}
                </PDFDownloadLink>
            </Grid.Col>
        </Grid>
    )
}