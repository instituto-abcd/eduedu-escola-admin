// Utils & Aux:
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	RequestPasswordResetInput,
	UserLogin,
	useAuthLogin,
	useRequestPasswordReset,
} from "~/api/auth";
import { useSettingsGetStatus } from "~/api/settings";
import { PATH } from "~/constants/path";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { z } from "zod";

// Components:
import { useForm, zodResolver } from "@mantine/form";
import {
	Anchor,
	BackgroundImage,
	Box,
	Button,
	Center,
	Group,
	Image,
	Modal,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { ChangePasswordModal } from "~/components/ChangePasswordModal";

// Images
import bg from "~/assets/backgrounds/login-1920w.png";
import logo from "~/assets/logos/eduedu-branca.svg";

export function LoginPage() {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const token = query.get("token");
	const [changePasswordModalOpen, changePasswordModalHandlers] = useDisclosure(
		Boolean(token),
	);
	const [resetPasswordModalOpen, resetPasswordModalHandlers] =
		useDisclosure(false);

	const formInputValidation = z.object({
		email: z.string().email({ message: "Email inválido" }),
		password: z.string().min(1, { message: "Senha inválida" }),
	});

	const form = useForm<UserLogin>({
		initialValues: {
			email: "",
			password: "",
		},
		validate: zodResolver(formInputValidation),
	});

	const { mutate: login, isLoading: isAuthenticating } = useAuthLogin({
		onError: (error) => {
			errorNotification("Erro durante a operação", `${error.message}`);
		},
		onSuccess: () => {
			navigate(PATH.DASHBOARD);
		},
	});

	const formRecoveryValidation = z.object({
		email: z.string().email({ message: "Insira um e-mail válido" }),
	});

	const formRecovery = useForm<RequestPasswordResetInput>({
		initialValues: {
			email: form?.values?.email ?? "",
		},
		validate: zodResolver(formRecoveryValidation),
	});

	const {
		mutate: sendPasswordRecovery,
		isLoading: isSendingPasswordResetEmail,
	} = useRequestPasswordReset({
		onSuccess: () => {
			successNotification(
				"Operação realizada com sucesso",
				"Enviamos um e-mail com as instruções para redefinir sua senha!",
			);
			resetPasswordModalHandlers.close();
		},
		onError: (error) => {
			errorNotification("Erro durante a operação", `${error.message}`);
		},
	});

	const disableActions = [isAuthenticating].includes(true);

	useSettingsGetStatus();

	return (
		<BackgroundImage src={bg} h="100vh">
			<Center maw={400} h={800} mx="auto">
				<Box sx={{ minWidth: "100%" }}>
					<Image
						maw={180}
						mb={50}
						mx="auto"
						radius="md"
						src={logo}
						alt="Logo EduEdu Escola"
					/>

					<Group position="center" mt="md" mb={50}>
						<Text color="white">Portal Administrativo</Text>
					</Group>

					<form
						onSubmit={form.onSubmit((values) => {
							login(values);
						})}
					>
						<Stack spacing={10}>
							<TextInput
								size="md"
								label="Email"
								placeholder="Digite o email cadastrado"
								styles={{
									label: { color: "#fff", marginBottom: 6 },
								}}
								{...form.getInputProps("email")}
							/>

							<PasswordInput
								size="md"
								label="Senha"
								placeholder="Digite sua senha"
								styles={{ label: { color: "#fff", marginBottom: 6 } }}
								{...form.getInputProps("password")}
							/>

							<Group position="right">
								<Anchor
									component="button"
									c="white"
									disabled={disableActions}
									onClick={resetPasswordModalHandlers.open}
								>
									Esqueci a senha
								</Anchor>
							</Group>

							<Button
								type="submit"
								fullWidth
								loading={isAuthenticating}
								mt={20}
							>
								Entrar
							</Button>
						</Stack>
					</form>
				</Box>
			</Center>

			<Modal
				opened={resetPasswordModalOpen}
				onClose={resetPasswordModalHandlers.close}
				title="Esqueci a senha"
				radius="md"
			>
				<form
					onSubmit={formRecovery.onSubmit((values) =>
						sendPasswordRecovery(values),
					)}
				>
					<Stack py={12} spacing="xl">
						<TextInput
							label="Email de cadastro"
							placeholder={form?.values?.email ?? "Email"}
							{...formRecovery.getInputProps("email")}
						/>
						<Button
							loading={isSendingPasswordResetEmail}
							type="submit"
							variant="outline"
							fullWidth
						>
							Enviar
						</Button>
					</Stack>
				</form>
			</Modal>

			<ChangePasswordModal
				opened={changePasswordModalOpen}
				onClose={changePasswordModalHandlers.close}
				token={token ?? ""}
			/>
		</BackgroundImage>
	);
}
