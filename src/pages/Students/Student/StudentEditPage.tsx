import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSchoolClassGetAll } from "~/api/school-class";
import { SCHOOL_PERIOD_SELECT } from "~/constants";
import { PATH } from "~/constants/path";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import {
  Student,
  StudentInput,
  useStudentCreate,
  useStudentGetOne,
  useStudentUpdate,
} from "~/api/student";
import { z } from "zod";
import {
  Button,
  Divider,
  Grid,
  Group,
  LoadingOverlay,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { PageHeader } from "~/components/PageHeader";

const studentInputValidation = z.object({
  name: z.string().nonempty({ message: "Campo obrigatório" }),
  registry: z.string().nonempty({ message: "Campo obrigatório" }),
  schoolClassId: z.string().nonempty({ message: "Campo obrigatório" }),
});

export function StudentEditPage() {
  const navigate = useNavigate();

  const params = useParams();
  const editingStudent = useLocation().state?.schoolClass as
    | Student
    | undefined;
  const shouldFetch = Boolean(!editingStudent && params.studentId);

  const { data: student } = useStudentGetOne(params.studentId ?? "", {
    enabled: shouldFetch,
    onSuccess: (data) => {
      form.setValues(data);
      form.resetDirty();
    },
    onError: (error) => {
      errorNotification("Erro", error.message);
    },
  });

  const finalStudent = shouldFetch ? student : editingStudent;

  const { data: schoolClasses, isLoading: isLoadingClasses } =
    useSchoolClassGetAll({
      pageSize: 999,
    });

  const { mutate: createStudent, isLoading: isLoadingStudent } =
    useStudentCreate({
      onSuccess: () => {
        successNotification(
          "Operação realizada com sucesso",
          "Aluno criado com sucesso!",
        );
        form.reset();
      },
      onError: (error) => {
        errorNotification("Erro durante a operação", error.message);
      },
    });

  const { mutate: updateStudent, isLoading: isUpdating } = useStudentUpdate({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        "Aluno alterado com sucesso!",
      );

      navigate(PATH.STUDENTS);
    },

    onError: (error) => {
      errorNotification("Erro durante a operação", error.message);
    },
  });

  const form = useForm<StudentInput>({
    initialValues: {
      name: finalStudent?.name ?? "",
      registry: finalStudent?.registry ?? "",
      schoolClassId: finalStudent?.schoolClassId ?? "",
    },
    validate: zodResolver(studentInputValidation),
  });

  function submitHandler(values: StudentInput) {
    if (finalStudent) {
      updateStudent({
        id: student?.id ?? params.studentId ?? "",
        input: values,
      });
    } else {
      createStudent(values);
    }
  }

  return (
    <form onSubmit={form.onSubmit(submitHandler)}>
      <Stack>
        <PageHeader title="Novo aluno" />
        <Grid columns={4}>
          <Grid.Col span={1}>
            <TextInput
              label="Nome"
              placeholder="Nome"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <TextInput
              label="Matrícula"
              placeholder="Matrícula"
              {...form.getInputProps("registry")}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Select
              withinPortal
              data={SCHOOL_PERIOD_SELECT}
              label="Período"
              placeholder="Selecione"
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Select
              withinPortal
              data={
                schoolClasses?.items.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) ?? []
              }
              label="Turma"
              placeholder="Selecione"
              disabled={isLoadingClasses}
              {...form.getInputProps("schoolClassId")}
            />
          </Grid.Col>
        </Grid>
        <Divider my={12} />
        <Group position="right">
          <Button variant="outline" component={Link} to={PATH.STUDENTS}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </Group>
      </Stack>
      <LoadingOverlay visible={isLoadingStudent || isUpdating} />
    </form>
  );
}
