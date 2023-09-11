// Utils & Aux:
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SCHOOL_GRADE_SELECT, SCHOOL_PERIOD_SELECT } from "~/constants";
import { PATH } from "~/constants/path";
import {
  SchoolClass,
  SchoolClassInput,
  SchoolGrade,
  SchoolPeriod,
  useGetSchoolClass,
  useSchoolClassCreate,
  useSchoolClassUpdate,
} from "~/api/school-class";
import { useSchoolYearGetAll } from "~/api/school-year";
import { useUserGetAll } from "~/api/user";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { z } from "zod";

// Components:
import {
  Button,
  Divider,
  Grid,
  Group,
  LoadingOverlay,
  MultiSelect,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { PageHeader } from "~/components/PageHeader";

const schoolClassInputValidation = z.object({
  name: z.string().min(1, { message: "Nome deve ter no mínimo 1 caracteres" }),
  schoolGrade: z.string().min(1, { message: "Selecione uma turma" }),
  schoolPeriod: z.string().min(1, { message: "Selecione um período" }),
  schoolYearId: z.string().min(1, { message: "Selecione 1 ano letivo" }),
  teacherIds: z
    .string()
    .array()
    .min(1, { message: "Selecione no mínimo 1 professor" }),
});

export function NewClassPage() {
  const navigate = useNavigate();

  const params = useParams();
  const editingSchoolClass = useLocation().state?.schoolClass as SchoolClass | undefined;
  const shouldFetch = Boolean(!editingSchoolClass && params.classId);

  const { data: schoolClass, isFetching: isFetchingClass } = useGetSchoolClass(
    params.classId ?? "",
    {
      enabled: shouldFetch,
      onSuccess: (data) => {
        form.setValues(data);
        form.resetDirty();
      },
      onError: (error) => {
        errorNotification("Erro", error.message)
      }
    }
  );

  const finalSchoolClass = shouldFetch ? schoolClass : editingSchoolClass;

  const form = useForm<SchoolClassInput>({
    initialValues: {
      name: finalSchoolClass?.name ?? "",
      schoolGrade: finalSchoolClass?.schoolGrade ?? ("" as SchoolGrade),
      schoolPeriod: finalSchoolClass?.schoolPeriod ?? ("" as SchoolPeriod),
      schoolYearId: finalSchoolClass?.schoolYear.id ?? "",
      teacherIds: finalSchoolClass?.teachers.map(({ id }) => id) ?? [],
    },
    validate: zodResolver(schoolClassInputValidation),
  });

  /* Input Data */
  const { data: years, isLoading: isLoadingYears } = useSchoolYearGetAll({
    pageSize: 999,
  });

  const { data: teachers, isLoading: isLoadingTeachers } = useUserGetAll({
    pageSize: 999,
    search: {
      profile: "TEACHER",
    },
  });

  const { mutate: createSchoolClass, isLoading: isCreateLoading } =
    useSchoolClassCreate({
      onSuccess: () => {
        successNotification(
          "Operação realizada com sucesso",
          "Turma criada com sucesso!"
        );
        form.reset()
      },
      onError: (error) => {
        errorNotification(
          "Erro durante a operação",
          `${error.message}`
        );
      },
    });

  const { mutate: updateSchoolClass, isLoading: isUpdateLoading } =
    useSchoolClassUpdate({
      onSuccess: () => {
        successNotification(
          "Operação realizada com sucesso",
          "Turma alterada com sucesso!"
        );
      },
      onError: (error) => {
        errorNotification(
          "Erro durante a operação",
          `${error.message}`
        );
      },
    });

  return (
    <Stack>
      <PageHeader title={finalSchoolClass?.name ?? "Nova turma"} />
      <LoadingOverlay visible={isUpdateLoading || isCreateLoading} />

      <form onSubmit={form.onSubmit((values) => {
        if (finalSchoolClass) {
          updateSchoolClass({ schoolClassId: finalSchoolClass?.id ?? "", input: values });
        } else {
          createSchoolClass(values);
        }
      })}>
        <Stack spacing={24}>
          <Grid columns={5}>
            <Grid.Col span={1}>
              <TextInput
                label="Nome"
                placeholder="Digite aqui"
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Select
                withinPortal
                label="Ano Letivo"
                placeholder="Selecione"
                disabled={isLoadingYears}
                data={
                  isLoadingYears
                    ? [
                      {
                        value: form.values.schoolYearId,
                        label: "Carregando...",
                      },
                    ]
                    : years?.map(({ name, id }) => ({
                      label: name.toString(),
                      value: id,
                    })) ?? []
                }
                nothingFound="Nada encontrado"
                {...form.getInputProps("schoolYearId")}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Select
                withinPortal
                label="Série"
                placeholder="Selecione"
                data={SCHOOL_GRADE_SELECT}
                nothingFound="Nada encontrado"
                {...form.getInputProps("schoolGrade")}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Select
                withinPortal
                label="Período"
                placeholder="Selecione"
                data={SCHOOL_PERIOD_SELECT}
                nothingFound="Nada encontrado"
                {...form.getInputProps("schoolPeriod")}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <MultiSelect
                label="Professor(es)"
                placeholder="Selecione"
                searchable
                nothingFound="Nada encontrado"
                disabled={isLoadingTeachers}
                data={
                  teachers?.items.map(({ name, id }) => ({
                    label: name,
                    value: id,
                  })) ?? []
                }
                {...form.getInputProps("teacherIds")}
              />
            </Grid.Col>
          </Grid>
          <Divider mt={20} />
          <Group position="right">
            <Button variant="outline" onClick={() => navigate(PATH.CLASSES)}>Cancelar</Button>
            <Button type="submit" disabled={!form.isValid()}>Salvar</Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}
