import { AppShell, Stack } from "@mantine/core";
import { Navbar } from "~/components/Navbar/Navbar";
import { Footer } from "~/components/Footer/Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <AppShell maw={1440} padding="md" header={<Navbar />} footer={<Footer />}>
      <Stack px={150} spacing={24} py={24}>
        <Outlet />
      </Stack>
    </AppShell>
  );
}
