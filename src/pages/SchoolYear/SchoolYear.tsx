import { Button, Card, Grid, Stack } from "@mantine/core";
import { useSchoolYearGetAll } from "~/api/school-year";
import { PageHeader } from "~/components/PageHeader";
import { TableLoader } from "~/components/TableLoader";
import { errorNotification } from "~/utils/errorNotification";
import { CreateSchoolYearModal } from "./components/CreateSchoolYearModal";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { SchoolYearCard } from "./components/SchoolYearCard";
import { PromoteStudentsModal } from "./components/PromoteStudentsModal";

export function SchoolYearPage() {
  const { data: schoolYears, isLoading } = useSchoolYearGetAll({
    onError: (error) => errorNotification("Erro durante a operação", error.message),
  });

  const [createModalVisible, createModalHandlers] = useDisclosure(false);
  const [promoteStudentsModal, promoteStudentsModalHandlers] = useDisclosure(false)
  return (
    <Stack spacing="xl">
      <PageHeader
        title="Ano Letivo"
        description="A criação de um ano letivo é importante, para a associação das turmas que estão vínculadas com aquele ano.
                    Só é possível existir o ano letivo atual e um ano letivo futuro, porém apenas um ano letivo pode estar ativo por vez.
                    Durante o final do ano letivo (31 de dezembro) o ano que estava vigente automáticamente se torna finalizado."
      >
        <Button onClick={promoteStudentsModalHandlers.open}>
          Promover Alunos
        </Button>
      </PageHeader>

      {!isLoading && (
        <Grid columns={4}>
          <Grid.Col span={1}>
            <Card px={20} h={163}>
              <Stack justify="center" h="100%">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={schoolYears
                    ?.map((item) => item.status)
                    .includes("DRAFT")}
                  onClick={createModalHandlers.open}
                  rightIcon={<IconPlus size={14} />}
                >
                  Adicionar Novo Ano Letivo
                </Button>
              </Stack>
            </Card>
          </Grid.Col>

          {schoolYears?.map((item) => (
            <Grid.Col span={1} key={item.id}>
              <SchoolYearCard data={item} />
            </Grid.Col>
          ))}
        </Grid>
      )}

      <TableLoader empty={false} loading={isLoading} />

      <CreateSchoolYearModal
        opened={createModalVisible}
        onClose={createModalHandlers.close}
      />
      <PromoteStudentsModal
        opened={promoteStudentsModal}
        onClose={promoteStudentsModalHandlers.close}
      />
    </Stack>
  );
}
