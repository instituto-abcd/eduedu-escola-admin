import {
	Anchor,
	Button,
	Divider,
	FileInput,
	Group,
	LoadingOverlay,
	Modal,
	Notification,
	Stack,
	Text,
	rem,
	useMantineTheme,
} from "@mantine/core";
import {
	IconCheck,
	IconFileDownload,
	IconPaperclip,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { successNotification } from "~/utils/successNotification";
import { useQueryClient } from "@tanstack/react-query";
import {
	useUserSheetUpload,
	userSheetDownloadURL,
	userSheetURL,
} from "~/api/user";

type Props = {
	opened: boolean;
	onClose: () => void;
};

export function UploadUsersModal({ opened, onClose: _onClose }: Props) {
	const form = useForm<{ file: File }>({});

	const queryClient = useQueryClient();
	const theme = useMantineTheme();

	const {
		mutate: upload,
		isLoading,
		data: uploadResponse,
		reset: uploadReset,
		isSuccess,
	} = useUserSheetUpload({
		onSuccess: async (data) => {
			if (data.countCreated) {
				await queryClient.invalidateQueries(["USER_ALL"]);

				if (!data.errors) {
					successNotification(
						"Usuário(s) cadastrados",
						`${data.countCreated} usuário(s) adicionado(s) com sucesso!`,
					);

					onClose();
				}
			}
		},
	});

	function onClose() {
		form.reset();
		uploadReset();
		_onClose();
	}

	return (
		<Modal
			opened={opened}
			onClose={isLoading ? () => {} : onClose}
			title="Upload de usuários"
		>
			<form
				onSubmit={form.onSubmit((values) => {
					upload(values.file);
				})}
			>
				<Stack spacing="md">
					{uploadResponse && uploadResponse.countCreated > 0 && (
						<Notification
							color="teal"
							icon={<IconCheck size="1.1rem" />}
							title={`${uploadResponse.countCreated} usuário(s) cadastrado(s)`}
							withBorder
							withCloseButton={false}
						/>
					)}

					{uploadResponse?.errors && uploadResponse.errors.length > 0 && (
						<Notification
							title={`Não foi possível cadastrar ${uploadResponse.errors.length} usuário(s):`}
							color="red"
							withBorder
							withCloseButton={false}
						>
							{uploadResponse.errors.map((e, i) => (
								<Text key={i} color="dimmed">
									<b>Linha {e.line}</b>: {e.message}
								</Text>
							))}
						</Notification>
					)}

					<Text size="sm">
						Para fazer upload de usuário em lote é necessário seguir o template
						de cadastro <em>(planilha csv ou xlsx)</em>.
					</Text>
					<Group align="flex-start" spacing={2}>
						<IconFileDownload
							size={rem(18)}
							style={{ stroke: theme.colors.blue[6] }}
						/>
						<Anchor c="blue.6" size="sm" href={userSheetDownloadURL()}>
							Fazer download do template
						</Anchor>
					</Group>

					<Group>
						<Text size="sm">
							Selecione o arquivo do template de cadastro de usuário.
						</Text>

						<FileInput
							{...form.getInputProps("file")}
							style={{ width: "100%" }}
							rightSection={<IconPaperclip size={rem(14)} />}
							// @ts-ignore ?????
							placeholder="Selecione o arquivo"
						/>
					</Group>

					<Divider />

					<Group position="right">
						<Button variant="outline" onClick={onClose}>
							Cancelar
						</Button>
						<Button type="submit">Continuar</Button>
					</Group>
				</Stack>
			</form>
			<LoadingOverlay visible={isLoading} />
		</Modal>
	);
}
