import { Card, Box, Button } from "@mantine/core";
import { ButtonCollapse } from "./ButtonCollapse";
import { Header } from "./Header";
import type { SchoolGradeResponse } from "~/api/dashboard";

type Props = {
  grade: SchoolGradeResponse;
};

export function SchoolGradeCard({ grade }: Props) {
  return (
    <Card h="100%" p="xl" withBorder>
      <Card.Section>
        <Box p={10} pb={0}>
          <Header grade={grade} />

          {grade.schoolClasses.map((schoolClass) => (
            <ButtonCollapse schoolClass={schoolClass} key={schoolClass.id} />
          ))}

          {grade.schoolClasses.length === 0 && (
            <Button fullWidth disabled>
              Sem turmas cadastradas
            </Button>
          )}
        </Box>
      </Card.Section>
    </Card>
  );
}
