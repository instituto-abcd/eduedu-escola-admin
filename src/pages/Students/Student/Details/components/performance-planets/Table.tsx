import { Table, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { ModalPerformancePlanets } from "./Modal";

type componentProps = {
    examsPerformanceData: Array<[]>
    studentId: string;
    dateExamList: Array<[]>;
    dateExam: string;
}
export function TablePerformancePlanets({ examsPerformanceData, studentId, dateExamList, dateExam }: componentProps) {

    const theme = useMantineTheme();
    const [modalExamPerformancePlanets, modalExamPerformancePlanetsHandler] = useDisclosure(false);

    return (
        <>
            <Table horizontalSpacing="sm" verticalSpacing="md">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Planetas Oferecidos</th>
                        <th>Planetas Realizados</th>
                        <th>Média Estrelas (Realizado)</th>
                    </tr>
                </thead>
                <tbody>
                    {examsPerformanceData &&
                        examsPerformanceData.map((item, index) => (
                            <tr key={index}>
                                <td
                                    onClick={() => {
                                        modalExamPerformancePlanetsHandler.open()
                                    }}
                                    style={{ color: theme.colors.blue[6], cursor: 'pointer' }}
                                >
                                    {item.axisName}
                                </td>
                                <td>{item.offeredPlanets}</td>
                                <td>{item.accomplishedPlanets}</td>
                                <td>
                                    <Rating readOnly value={item.averageStars} key={Math.random()} style={{ width: '100px' }} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >

            <ModalPerformancePlanets
                opened={modalExamPerformancePlanets}
                onClose={modalExamPerformancePlanetsHandler.close}
                performancePlanetsData={examsPerformanceData}
                studentId={studentId}
                dateExamList={dateExamList}
                dateExam={dateExam}
            />
        </>
    )
}