// os brabo:
import { errorNotification } from "~/utils/errorNotification";
import { useSchoolYearGetAll } from "~/api/school-year";
// Components:
import { PageHeader } from "~/components/PageHeader";
import { Grid, Button } from "@mantine/core";
import { CardActive, CardFinished, CardDraft, CardNewSchoolYear } from "~/components/CardSchoolYear";

export function SchoolYearPage() {

    const { data: schoolYears } = useSchoolYearGetAll({
        onError: (error) => errorNotification("Erro", error),
    });
    var disabledNewSchoolYear

    if (schoolYears) {
        schoolYears.forEach(element => {
            if (element.status == 'DRAFT') {
                return disabledNewSchoolYear = true
            }
        });
    }

    return (
        <>
            <PageHeader
                title="Ano Letivo"
                description="A criação de um ano letivo é importante, para a associação das turmas que estão vínculadas com aquele ano.
                    Só é possível existir o ano letivo atual e um ano letivo futuro, porém apenas um ano letivo pode estar ativo por vez.
                    Durante o final do ano letivo (31 de dezembro) o ano que estava vigente automáticamente se torna finalizado."
            >
                <Button size="sm">Promover Alunos</Button>
            </PageHeader>

            <Grid columns={4}>
                <Grid.Col span={1}>
                    <CardNewSchoolYear disabled={disabledNewSchoolYear} />
                </Grid.Col>

                {schoolYears?.map((item) => (
                    <Grid.Col span={1} key={item.id}>
                        {item.status === "DRAFT" &&
                            <CardDraft item={item} />
                        }

                        {item.status === "ACTIVE" &&
                            <CardActive item={item} />
                        }

                        {item.status === "INACTIVE" &&
                            <CardFinished item={item} />
                        }
                    </Grid.Col>
                ))}
            </Grid>
        </>
    );
}
