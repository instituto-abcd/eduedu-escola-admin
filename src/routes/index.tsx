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
import { ReportRoutes } from "./Report";
import { SetupRoutes } from "./Setup";
import { Fragment, useEffect } from "react";
import { Notification, Stack, Text } from "@mantine/core";
import { useSyncStatus } from "~/api/sync";
import { successNotification } from "~/utils/successNotification";
import { CustomProgress } from "~/components/CustomProgress/CustomProgress";
import { useFileSync } from "~/stores/filter";
import { errorNotification } from "~/utils/errorNotification";

export function AppRoutes() {
  function nested(route: string) {
    return route.endsWith("/") ? route + "*" : `${route}/*`;
  }

  const { data: syncFilesState, update } = useFileSync();

  const { data: syncStatus } = useSyncStatus({
    initialData: {
      totalFiles: 0,
      syncedFiles: 0,
      percent: 0,
      duration: "00:00:00",
      running: false,
      currentOperation: "",
    },
    enabled: true,
    refetchInterval: (data) => (data?.running ? 1000 : false),
    onSuccess: (data) => {
      if (syncFilesState) {
        if (
          !data.running &&
          data.currentOperation === "Erro na sincronização"
        ) {
          errorNotification(
            "Erro na sincronização",
            "Ocorreu um erro durante a sincronização. Verifique sua Chave de acesso.",
            () => update(false)
          );
        }

        if (!data.running && data.percent === 100) {
          successNotification(
            "Sincronização concluída",
            "Todos os planetas e artefatos foram sincronizados",
            () => update(false)
          );
        }

        if (
          !data.running &&
          data.percent < 100 &&
          data.currentOperation !== "Erro na sincronização"
        ) {
          update(true);
        }
      }
    },
    onError: (error) => {
      errorNotification(
        "Erro durante a operação",
        "Verifique sua chave de acesso."
      );
    },
  });

  return (
    <Fragment>
      {syncStatus?.running &&
        syncStatus?.percent < 100 &&
        syncStatus?.currentOperation !== "Erro na sincronização" &&
        syncStatus?.currentOperation !== "Sincronizando Planetas" &&
        syncStatus?.currentOperation !== "Limpando pasta..." && (
          <Notification
            title="Sincronização de Planetas"
            loading
            withCloseButton={false}
            style={{ position: "absolute", bottom: 44, right: 44 }}
          >
            <Stack spacing={6}>
              <CustomProgress
                value={syncStatus?.percent}
                label={syncStatus?.percent?.toFixed(2)}
              />
              <Text size="xs" color="dark.2">
                {syncStatus?.currentOperation}
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

          <Route path={nested(PATH.REPORTS)} Component={ReportRoutes} />
          <Route path={nested(PATH.LOGIN)} Component={AuthRoutes} />
          <Route path={nested(PATH.SETUP)} Component={SetupRoutes} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}
