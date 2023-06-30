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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import {
  SchoolClassInput,
  SchoolGrade,
  SchoolPeriod,
  useGetSchoolClass,
  useSchoolClassCreate,
  useSchoolClassUpdate,
} from "~/api/school-class";
import { useSchoolYearGetAll } from "~/api/school-year";
import { useUserGetAll } from "~/api/user";
import { PageHeader } from "~/components/PageHeader";
import { schoolGrade, schoolPeriod } from "~/constants";
import { PATH } from "~/constants/path";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

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
  const location = useLocation();
  const isEditing = Boolean(location.state?.schoolClass || params.classId);

  const { data: schoolClass, isLoading: isLoadingClass } = useGetSchoolClass(
    params.classId ?? "",
    {
      enabled: !location.state?.schoolClass && !!params.classId,
      initialData: location.state?.schoolClass,
    }
  );

  const form = useForm<SchoolClassInput>({
    initialValues: {
      name: schoolClass?.name ?? "",
      schoolGrade: schoolClass?.schoolGrade ?? ("" as SchoolGrade),
      schoolPeriod: schoolClass?.schoolPeriod ?? ("" as SchoolPeriod),
      schoolYearId: schoolClass?.schoolYear.id ?? "",
      teacherIds: schoolClass?.teachers.map(({ id }) => id) ?? [],
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
        navigate(PATH.CLASSES);
      },
      onError: (error) => {
        errorNotification(
          "Erro durante a operação",
          `${error.message} (cod: ${error.code})`
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
          `${error.message} (cod: ${error.code})`
        );
      },
    });

  function handleSubmit(values: SchoolClassInput) {
    if (isEditing) {
      updateSchoolClass({
        schoolClassId: schoolClass?.id ?? "",
        input: values,
      });
    } else {
      createSchoolClass(values);
    }
  }

  return (
    <Stack>
      <PageHeader title={schoolClass?.name ?? "Nova turma"} />
      <LoadingOverlay visible={isUpdateLoading || isCreateLoading} />

      <form onSubmit={form.onSubmit(handleSubmit)}>
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
                        label: name.toString(), // TODO: request property change to string type
                        value: id,
                      })) ?? []
                }
                nothingFound="Nada encontrado"
                {...form.getInputProps("schoolYearId")}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Select
                label="Série"
                placeholder="Selecione"
                data={schoolGrade}
                nothingFound="Nada encontrado"
                {...form.getInputProps("schoolGrade")}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Select
                label="Período"
                placeholder="Selecione"
                data={schoolPeriod}
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
            <Button variant="outline">Cancelar</Button>
            {/* TODO: set the "saveBtn" as disabled while empty inputs */}
            <Button type="submit">Salvar</Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}
