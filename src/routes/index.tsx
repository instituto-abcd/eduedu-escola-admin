import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "~/components/Layout";
import { PATH } from "~/constants/path";
import { DashboardRoutes } from "./Dashboard";
import { SchoolYearRoutes } from "./SchoolYear";
import { SettingsRoutes } from "./Settings";
import { StudentsRoutes } from "./Students";
import { UsersRoutes } from "./Users";
import { ClassesRoutes } from "./Classes";
import { AuthRoutes } from "./Auth";
import { SetupRoutes } from "./Setup";
import { Fragment } from "react";
import { Notification, Progress, Stack, Text } from "@mantine/core";
import { useSyncStatus } from "~/api/sync";
import { successNotification } from "~/utils/successNotification";

export function AppRoutes() {
  function nested(route: string) {
    return route.endsWith("/") ? route + "*" : `${route}/*`;
  }

  const { data: syncStatus } = useSyncStatus({
    cacheTime: 10 * 1000,
    refetchInterval: 10 * 1000,
    initialData: {
      totalFiles: 0,
      syncedFiles: 0,
      percent: 0,
      duration: "00:00:00",
    },
    onSuccess: (data) => {
      if (data.syncedFiles > 0 && data.syncedFiles === data.totalFiles) {
        successNotification(
          "Sincronização concluída",
          "Todos os planetas e seus artefatos foram sincronizados com sucesso"
        );
      }
    },
  });

  return (
    <Fragment>
      {syncStatus?.syncedFiles !== syncStatus?.totalFiles && (
        <Notification
          title="Sincronizando planetas"
          loading
          withCloseButton={false}
          style={{ position: "absolute", bottom: 44, right: 44 }}
        >
          <Stack spacing={6}>
            <Progress value={syncStatus?.percent} my={6} />
            <Text size="xs" color="dark.3">
              Artefatos: {syncStatus?.syncedFiles}/{syncStatus?.totalFiles}
            </Text>
          </Stack>
        </Notification>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index element={<Navigate to={PATH.DASHBOARD} />} />
            <Route path={nested(PATH.DASHBOARD)} Component={DashboardRoutes} />
            <Route path={nested(PATH.USERS)} Component={UsersRoutes} />
            <Route path={nested(PATH.STUDENTS)} Component={StudentsRoutes} />
            <Route path={nested(PATH.SETTINGS)} Component={SettingsRoutes} />
            <Route
              path={nested(PATH.SCHOOL_YEAR)}
              Component={SchoolYearRoutes}
            />
            <Route path={nested(PATH.CLASSES)} Component={ClassesRoutes} />
          </Route>
          <Route path={nested(PATH.LOGIN)} Component={AuthRoutes} />
          <Route path={nested(PATH.SETUP)} Component={SetupRoutes} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}
