import { Button } from "@mantine/core";
import { useSyncPlanets } from "~/api/sync";

export function SyncButton() {
	const { mutate: syncPlanets, isLoading: isSyncing } = useSyncPlanets();

	return (
		<Button onClick={() => syncPlanets()} loading={isSyncing}>
			Sincronizar planetas
		</Button>
	);
}
