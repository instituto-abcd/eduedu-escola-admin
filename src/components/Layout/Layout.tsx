import { AppShell, Stack } from "@mantine/core";
import { Navbar } from "~/components/Navbar/Navbar";
import { Footer } from "~/components/Footer/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "~/stores/user";
import { PATH } from "~/constants/path";

export function Layout() {
  const isUserAuthenticated = useUserStore((u) => u.isUserAuthenticated());

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
