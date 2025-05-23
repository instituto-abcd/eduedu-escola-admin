import { BackgroundImage, Center, LoadingOverlay } from "@mantine/core";
import bg from "~/assets/backgrounds/login-1920w.png";
import { CreateMasterForm } from "./components/CreateMasterForm";
import { useSettingsGetStatus } from "~/api/settings";
import { CreateSchoolForm } from "./components/CreateSchoolForm";
import { SetupComplete } from "./components/SetupComplete";
import { useLastSync, useSyncPlanets } from "~/api/sync";
import { useEffect } from "react";

export function SetupPage() {
	const { mutate: syncPlanets, isLoading: isSyncing } = useSyncPlanets();
	const { data: lastSync } = useLastSync();

	const { data: status, isFetching } = useSettingsGetStatus({
		onSettled: () => {
			if (!isSyncing && lastSync && lastSync.daysSinceLastSync === null) {
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

	useEffect(() => {
		if (!isSyncing) {
			syncPlanets();
		}
	}, [syncPlanets]);

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
