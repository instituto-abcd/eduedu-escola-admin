import {
    Card,
    Box
} from "@mantine/core";
import { ButtonCollapse } from "./ButtonCollapse";
import { Header } from "./Header";

type componentProps = {
    schoolGrade: any;
};

export function SchoolGradeCard({
    schoolGrade
}: componentProps) {

    return (
        <Card h="100%" pb={20}>
            <Card.Section>
                <Box p={10} pb={0}>
                    <Header schoolGrade={schoolGrade} />

                    {schoolGrade.schoolClasses?.map((schoolClass) => (
                        <ButtonCollapse schoolClass={schoolClass} />
                    ))}
                </Box>
            </Card.Section>
        </Card>
    );
}
