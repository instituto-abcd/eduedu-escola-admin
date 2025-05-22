import { BackgroundImage, Center, LoadingOverlay } from "@mantine/core";
import bg from "~/assets/backgrounds/login-1920w.png";
import { CreateMasterForm } from "./components/CreateMasterForm";
import { useSettingsGetStatus } from "~/api/settings";
import { CreateSchoolForm } from "./components/CreateSchoolForm";
import { SetupComplete } from "./components/SetupComplete";
import { useSyncPlanets } from "~/api/sync";

export function SetupPage() {
	const { mutate: syncPlanets, isLoading: isSyncing } = useSyncPlanets();
	const { data: status, isFetching } = useSettingsGetStatus({
		onSettled: () => {
			if (!isSyncing) {
				syncPlanets();
			}
		},
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});

	const ownerStep =
		!status?.completedOwnerSetup && !status?.completedSchoolSetup;
	const schoolStep =
		status?.completedOwnerSetup && !status?.completedSchoolSetup;
	const setupComplete =
		status?.completedOwnerSetup && status?.completedSchoolSetup;

	return (
		<BackgroundImage src={bg} h="100vh">
			<LoadingOverlay visible={isFetching} />
			<Center w={732} h={"80%"} mx="auto">
				{ownerStep && <CreateMasterForm />}
				{schoolStep && <CreateSchoolForm />}
				{setupComplete && <SetupComplete />}
			</Center>
		</BackgroundImage>
	);
}
