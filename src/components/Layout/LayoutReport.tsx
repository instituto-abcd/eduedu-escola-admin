import { AppShell, Stack } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "~/stores/user";
import { PATH } from "~/constants/path";
import { useSettingsGetStatus } from "~/api/settings";

export function LayoutReport() {
	const isUserAuthenticated = useUserStore((u) => u.isUserAuthenticated());
	useSettingsGetStatus();

	if (!isUserAuthenticated) return <Navigate to={PATH.LOGIN} />;

	return (
		<AppShell maw={1440} padding="md" mx="auto">
			<Stack px={150} spacing={24} py={24}>
				<Outlet />
			</Stack>
		</AppShell>
	);
}
