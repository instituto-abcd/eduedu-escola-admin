import {
	ActionIcon,
	Button,
	Checkbox,
	Divider,
	Group,
	Space,
	Table,
	Text,
	useMantineTheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
	useAuthorizeNewExam,
	usePutReleasePlanetsBulk,
	useStudentGetAll,
} from "~/api/student";
import { PageHeader } from "~/components/PageHeader";
import { Pagination } from "~/components/Pagination";
import { TableLoader } from "~/components/TableLoader";
import { PATH } from "~/constants/path";
import { usePagination } from "~/hooks/usePagination";
import { DeleteStudentModal } from "../Student/components/DeleteStudentModal";
import { useDisclosure } from "@mantine/hooks";
import { UploadStudentsSheet } from "./components/UploadStudentsSheet";
import {
	SCHOOL_GRADE,
	SCHOOL_GRADE_SELECT,
	SCHOOL_PERIOD,
	SCHOOL_PERIOD_SELECT,
} from "~/constants";
import { TableHeader } from "~/components/TableHeader";
import { successNotification } from "~/utils/successNotification";
import { errorNotification } from "~/utils/errorNotification";
import { useStudentFilterStore } from "~/stores/filter";

export function StudentsListPage() {
	const theme = useMantineTheme();
	const { update, data: search } = useStudentFilterStore();
	const [selected, setSelected] = useState<string[]>([]);

	const pagination = usePagination();

	function toggleSelected(id: string) {
		if (selected.includes(id)) {
			setSelected(selected.filter((item) => item !== id));
		} else {
			setSelected([...selected, id]);
		}
	}

	const { mutate: authorizeNewExam } = useAuthorizeNewExam({
		onSuccess: () => {
			successNotification(
				"Operação realizada com sucesso",
				"Nova prova autorizada para os alunos selecionados!",
			);
			setSelected([]);
		},
		onError: (error) => {
			errorNotification("Erro durante a operação", `${error.message}`);
		},
	});

	const { mutate: releasePlanets } = usePutReleasePlanetsBulk({
		onSuccess: () => {
			successNotification(
				"Operação realizada com sucesso",
				"Planetas liberados para os alunos selecionados!",
			);
			setSelected([]);
		},
		onError: (error) => {
			errorNotification("Erro durante a operação", `${error.message}`);
		},
	});

	const { data, isLoading } = useStudentGetAll({
		search: {
			...search,
			"page-number": pagination.page,
			"page-size": pagination.pageSize,
		},
	});

	const [deleteModalOpen, deleteModalHandlers] = useDisclosure(false);
	const [uploadSheetModalOpen, uploadSheetModalHandlers] = useDisclosure(false);

	// Modals
	const openModalAuthorizeNewExam = () => {
		modals.openConfirmModal({
			title: "Autorizar Nova Prova",
			children: (
				<>
					<Text size="sm">
						Deseja que o sistema permita o(s) aluno(s) selecionado(s) à
						realizarem uma nova prova?
					</Text>
					<Divider mt={20} />
				</>
			),
			labels: { confirm: "Sim", cancel: "Não" },
			onConfirm: () => {
				authorizeNewExam(selected);
			},
		});
	};

	const openModalReleasePlanets = () => {
		modals.openConfirmModal({
			title: "Liberar Mais Planetas",
			children: (
				<>
					<Text size="sm">
						Deseja liberar mais planetas para o(s) aluno(s) selecionado(s)?
					</Text>
					<Divider mt={20} />
				</>
			),
			labels: { confirm: "Sim", cancel: "Não" },
			onConfirm: () => {
				releasePlanets(selected);
			},
		});
	};

	return (
		<>
			<PageHeader
				title="Alunos"
				description={
					isLoading
						? "Carregando..."
						: `${data?.pagination.totalItems ?? 0} registros`
				}
				gap={0}
			>
				<Group noWrap>
					<Button variant="outline" onClick={uploadSheetModalHandlers.open}>
						Upload aluno
					</Button>
					<Button component={Link} to={`${PATH.STUDENTS}/novo-aluno`}>
						Novo aluno
					</Button>
				</Group>
			</PageHeader>

			<Group>
				<Button
					size="xs"
					variant="outline"
					color="red"
					disabled={selected.length === 0}
					onClick={deleteModalHandlers.open}
				>
					Excluir
				</Button>
				<Button
					size="xs"
					color="blue.0"
					style={{ color: theme.colors.blue[6] }}
					disabled={selected.length === 0}
					onClick={openModalAuthorizeNewExam}
				>
					Autorizar Nova Prova
				</Button>
				<Button
					size="xs"
					color="blue.0"
					style={{ color: theme.colors.blue[6] }}
					disabled={selected.length === 0}
					onClick={openModalReleasePlanets}
				>
					Liberar Mais Planetas
				</Button>
			</Group>
			<Space h="xs" />

			<Table horizontalSpacing="sm" verticalSpacing="md">
				<thead>
					<TableHeader
						onCheckAll={(checked) =>
							checked
								? setSelected(data?.items.map((u) => u.id) ?? [])
								: setSelected([])
						}
						columns={[
							{ label: "Nome", type: "text", searchTerm: "name" },
							{ label: "Turma", type: "text", searchTerm: "schoolClassName" },
							{
								label: "Período",
								type: "select",
								searchTerm: "schoolPeriod",
								inputProps: { data: SCHOOL_PERIOD_SELECT },
							},
							{
								label: "Série",
								type: "select",
								searchTerm: "schoolGrade",
								inputProps: { data: SCHOOL_GRADE_SELECT },
							},
							{ label: "CFO", type: "number", searchTerm: "cfo" },
							{ label: "SEA", type: "number", searchTerm: "sea" },
							{ label: "LCT", type: "number", searchTerm: "lct" },
							{
								label: "",
								type: "empty",
								searchTerm: "",
							},
						]}
						initialValues={search}
						onValueChange={update}
					/>
				</thead>
				<tbody>
					{data?.items.map((student) => (
						<tr key={student.id}>
							<td>
								<Checkbox
									checked={selected.includes(student.id)}
									onChange={() => toggleSelected(student.id)}
								/>
							</td>
							<td>{student.name}</td>
							<td>{student.schoolClassName}</td>
							<td>{SCHOOL_PERIOD[student.schoolPeriod]}</td>
							<td>{SCHOOL_GRADE[student.schoolGrade]}</td>
							<td>{student.cfo}</td>
							<td>{student.sea}</td>
							<td>{student.lct}</td>
							<td>
								<Group noWrap spacing="xs">
									<ActionIcon
										component={Link}
										to={`${PATH.STUDENTS}/${student.id}/detalhes`}
										color="blue.9"
									>
										<IconEye />
									</ActionIcon>
									<ActionIcon
										component={Link}
										to={`${PATH.STUDENTS}/${student.id}/editar`}
										state={{ student }}
										color="blue.9"
									>
										<IconEdit />
									</ActionIcon>
								</Group>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<TableLoader
				loading={isLoading}
				empty={data ? data.items.length === 0 : false}
				link={{
					label: "Cadastrar aluno",
					to: `${PATH.STUDENTS}/novo-aluno`,
				}}
			/>

			{data && (
				<Pagination
					paginationApi={data.pagination}
					paginationHook={pagination}
				/>
			)}

			<DeleteStudentModal
				opened={deleteModalOpen}
				onClose={deleteModalHandlers.close}
				studentIds={selected}
				parentCallback={() => setSelected([])}
			/>

			<UploadStudentsSheet
				opened={uploadSheetModalOpen}
				onClose={uploadSheetModalHandlers.close}
			/>
		</>
	);
}
