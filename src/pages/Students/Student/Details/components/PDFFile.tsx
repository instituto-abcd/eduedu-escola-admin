import { StyleSheet, Document, Page, View, Text } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

const InfoItem = ({ label, value }) => (
    <>
        <Text style={{ fontSize: '12pt' }}>{label}:</Text>
        <Text style={{ fontSize: '12pt' }}>{value}</Text>
    </>
);

const PDFFile = () => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.section}>
                <Text>Relatório do estudante</Text>
                <InfoItem label="Nome" value="sdfgh" />
                <InfoItem label="Matrícula" value="sdfgh" />
                <InfoItem label="Série" value="sdfgh" />
                <InfoItem label="Turma" value="sdfgh" />
                <InfoItem label="Período" value="sdfgh" />
            </View>

            <View>
                <Text>Desempenho do aluno área:</Text>
                {/* TODO: loop */}
                <Text>Consciência Fonológica: <span style={{ color: 'red' }}>100%</span></Text>
            </View>

            <View>
                {/* Imagem dos gráficos aqui */}
                {/* id aluno teste: 70309a7d-9b39-4d5f-aa0b-91e334bb05ca */}
            </View>

            {/* Tabela não renderiza utilizando lib reactPdf :( */}

            <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                }
            />
        </Page>
    </Document>
);

export default PDFFile;