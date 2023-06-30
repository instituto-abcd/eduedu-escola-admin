import { AppShell, Stack } from "@mantine/core";
import { Navbar } from "~/components/Navbar/Navbar";
import { Footer } from "~/components/Footer/Footer";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "~/stores/user";
import { PATH } from "~/constants/path";
import { useSettingsGetStatus } from "~/api/settings";
import { errorNotification } from "~/utils/errorNotification";

export function Layout() {
  const isUserAuthenticated = useUserStore((u) => u.isUserAuthenticated());
  const navigate = useNavigate();

  useSettingsGetStatus({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);

      navigate(PATH.LOGIN);
    },

    onSuccess(data) {
      if (!data.completedOwnerSetup || !data.completedSchoolSetup) {
        navigate(PATH.SETUP);
      }
    },
  });

  if (!isUserAuthenticated) return <Navigate to={PATH.LOGIN} />;

  return (
    <AppShell
      maw={1440}
      padding="md"
      mx="auto"
      header={<Navbar />}
      footer={<Footer />}
    >
      <Stack px={150} spacing={24} py={24}>
        <Outlet />
      </Stack>
    </AppShell>
  );
}
