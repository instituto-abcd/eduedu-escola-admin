import { AppShell, Stack } from "@mantine/core";
import { Navbar } from "~/components/Navbar/Navbar";
import { Footer } from "~/components/Footer/Footer";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "~/stores/user";
import { PATH } from "~/constants/path";
import { useSettingsGetStatus } from "~/api/settings";
import { errorNotification } from "~/utils/errorNotification";
import { useEffect } from "react";

export function Layout() {
  const isUserAuthenticated = useUserStore((u) => u.isUserAuthenticated());
  const navigate = useNavigate();

  useSettingsGetStatus({});

  if (!isUserAuthenticated) return <Navigate to={PATH.LOGIN} />;

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AppShell header={<Navbar />} footer={<Footer />}>
      <Stack spacing={24} py={24} px={{ base: 24, md: 48 }}>
        <Outlet />
      </Stack>
    </AppShell>
  );
}
