import React, { useState } from "react";
import { useExamsPerformancePlanets } from "~/api/student";
import { errorNotification } from "~/utils/errorNotification";
import { Flex, Loader, Modal, Select, Table, Text, useMantineTheme } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Rating } from "@mantine/core";
import '@smastrom/react-rating/style.css';

type Props = {
    opened: boolean;
    onClose: () => void;
    performancePlanetsData: Array<{}>;
    studentId: string;
    dateExamList: Array<{}>;
    dateExam: string;
}

export function ModalPerformancePlanets({ opened, onClose, performancePlanetsData, studentId, dateExamList, dateExam }: Props) {
    const theme = useMantineTheme();
    const [selectedItem, setSelectedItem] = useState('');

    const [newDateExam, setDateExam] = useState(dateExam);
    const [examsPerformanceData, setExamsPerformanceData] = useState(performancePlanetsData)
    const { mutate: examsPerformancePlanets, isLoading: isExamsPerformancePlanetsLoading } = useExamsPerformancePlanets({
        onSuccess: (data) => {
            setExamsPerformanceData(data)
        },
        onError: (error) => {
            errorNotification(
                "Erro durante a operação",
                `${error.message}`
            );
        },
    });

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="xl"
        >
            <Modal.Title>
                <Flex align="center">
                    <Text pr={10}>Desempenho nos planetas disponibilizados após a prova realizada em</Text>
                    <Select
                        value={newDateExam}
                        withinPortal
                        data={dateExamList?.length ? dateExamList : []}
                        placeholder="Pesquisar"
                        searchable
                        style={{
                            width: '150px'
                        }}
                        onChange={(value) => {
                            setDateExam(value)
                            examsPerformancePlanets({
                                id: studentId,
                                studentExamId: value,
                            })
                        }}
                    />
                </Flex>
            </Modal.Title>

            <Table horizontalSpacing="sm" verticalSpacing="md" mt={20}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Planetas Oferecidos</th>
                        <th>Planetas Realizados</th>
                        <th>Média Estrelas (Realizado)</th>
                    </tr>
                </thead>
                <tbody>
                    {isExamsPerformancePlanetsLoading ?
                        <tr>
                            <td colSpan={4} align="center">
                                <Loader size="xs" />
                            </td>
                        </tr>
                        :
                        <>
                            {examsPerformanceData &&
                                examsPerformanceData.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td
                                                onClick={() => {
                                                    item.axisName == selectedItem ? setSelectedItem('') : setSelectedItem(item.axisName)
                                                }}
                                                style={{ color: theme.colors.blue[6], cursor: 'pointer' }}
                                            >
                                                <Flex align="center">
                                                    {selectedItem == item.id ? <IconMinus /> : <IconPlus />}
                                                    <Text pl={20} c="blue.6">{item.axisName}</Text>
                                                </Flex>
                                            </td>
                                            <td>{item.offeredPlanets}</td>
                                            <td>{item.accomplishedPlanets}</td>
                                            <td>
                                                <Rating readOnly value={item.averageStars} key={Math.random()} style={{ width: '100px' }} />
                                            </td>
                                        </tr>

                                        {selectedItem === item.axisName ?
                                            <>
                                                {
                                                    item.planets?.length > 0 ?
                                                        item.planets.map((element) => (
                                                            <tr key={element.planetName}>
                                                                <td>{element.planetName}</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>
                                                                    <Rating readOnly defaultValue={element.stars ?? 0} value={element.stars} key={Math.random()} style={{ width: '100px' }} />
                                                                </td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr>
                                                            <td colSpan={4}>
                                                                <Text>Sem planetas realizados.</Text>
                                                            </td>
                                                        </tr>
                                                }
                                            </>
                                            :
                                            <></>
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </>
                    }
                </tbody>
            </Table>
        </Modal>
    )
}
