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
import { Fragment, useRef, useEffect } from "react";
import { Notification, Stack, Text } from "@mantine/core";
import { usePlanetSyncStatus, useExamSyncStatus, SyncStatus } from "~/api/sync";
import { successNotification } from "~/utils/successNotification";
import { CustomProgress } from "~/components/CustomProgress/CustomProgress";
import { usePlanetSync, useExamSync } from "~/stores/filter";
import { errorNotification } from "~/utils/errorNotification";

const initialSyncData: SyncStatus = {
  totalFiles: 0,
  syncedFiles: 0,
  percent: 0,
  duration: "00:00:00",
  running: false,
  currentOperation: "",
};

export function AppRoutes() {
  function nested(route: string) {
    return route.endsWith("/") ? route + "*" : `${route}/*`;
  }

  const { data: planetSyncState, update: updatePlanetSync } = usePlanetSync();
  const { data: examSyncState, update: updateExamSync } = useExamSync();

  // Refs para rastrear se a sync realmente iniciou (vimos running: true)
  const planetSyncStarted = useRef(false);
  const examSyncStarted = useRef(false);

  // Reset refs quando o estado local muda para false
  useEffect(() => {
    if (!planetSyncState) {
      planetSyncStarted.current = false;
    }
  }, [planetSyncState]);

  useEffect(() => {
    if (!examSyncState) {
      examSyncStarted.current = false;
    }
  }, [examSyncState]);

  // Planet sync status
  const { data: planetSyncStatus } = usePlanetSyncStatus({
    initialData: initialSyncData,
    enabled: true,
    refetchInterval: (data) => (data?.running || planetSyncState ? 1000 : false),
    onSuccess: (data) => {
      if (planetSyncState) {
        // Marca que a sync realmente iniciou quando vemos running: true
        if (data.running) {
          planetSyncStarted.current = true;
        }

        // Só processa resultados se a sync realmente iniciou
        if (planetSyncStarted.current && !data.running) {
          if (data.currentOperation === "Erro na sincronizacao") {
            errorNotification(
              "Erro na sincronização de planetas",
              "Tente novamente daqui alguns segundos.",
              () => updatePlanetSync(false)
            );
          } else if (data.percent === 100 && data.currentOperation === "Concluido") {
            successNotification(
              "Sincronização de planetas concluída",
              "Todos os planetas e artefatos foram sincronizados",
              () => updatePlanetSync(false)
            );
          }
        }
      }
    },
    onError: () => {
      errorNotification(
        "Erro durante a operação",
        "Verifique sua chave de acesso."
      );
    },
  });

  // Exam sync status
  const { data: examSyncStatus } = useExamSyncStatus({
    initialData: initialSyncData,
    enabled: true,
    refetchInterval: (data) => (data?.running || examSyncState ? 1000 : false),
    onSuccess: (data) => {
      if (examSyncState) {
        // Marca que a sync realmente iniciou quando vemos running: true
        if (data.running) {
          examSyncStarted.current = true;
        }

        // Só processa resultados se a sync realmente iniciou
        if (examSyncStarted.current && !data.running) {
          if (data.currentOperation === "Erro na sincronizacao") {
            errorNotification(
              "Erro na sincronização de provas",
              "Tente novamente daqui alguns segundos.",
              () => updateExamSync(false)
            );
          } else if (data.percent === 100 && data.currentOperation === "Concluido") {
            successNotification(
              "Sincronização de provas concluída",
              "Todas as provas foram sincronizadas",
              () => updateExamSync(false)
            );
          }
        }
      }
    },
    onError: () => {
      errorNotification(
        "Erro durante a operação",
        "Verifique sua chave de acesso."
      );
    },
  });

  const shouldShowPlanetNotification =
    planetSyncStatus?.running &&
    planetSyncStatus?.percent < 100 &&
    planetSyncStatus?.currentOperation !== "Erro na sincronizacao" &&
    planetSyncStatus?.currentOperation !== "Sincronizando Planetas" &&
    planetSyncStatus?.currentOperation !== "Limpando pasta...";

  const shouldShowExamNotification =
    examSyncStatus?.running &&
    examSyncStatus?.percent < 100 &&
    examSyncStatus?.currentOperation !== "Erro na sincronizacao" &&
    examSyncStatus?.currentOperation !== "Sincronizando Provas" &&
    examSyncStatus?.currentOperation !== "Limpando pasta...";

  return (
    <Fragment>
      {shouldShowPlanetNotification && (
        <Notification
          title="Sincronização de Planetas"
          loading
          withCloseButton={false}
          style={{ position: "absolute", bottom: 44, right: 44, zIndex: 1000 }}
        >
          <Stack spacing={6}>
            <CustomProgress
              value={planetSyncStatus?.percent}
              label={planetSyncStatus?.percent?.toFixed(2)}
            />
            <Text size="xs" color="dark.2">
              {planetSyncStatus?.currentOperation}
            </Text>
          </Stack>
        </Notification>
      )}

      {shouldShowExamNotification && (
        <Notification
          title="Sincronização de Provas"
          loading
          withCloseButton={false}
          style={{
            position: "absolute",
            bottom: shouldShowPlanetNotification ? 164 : 44,
            right: 44,
            zIndex: 1000,
          }}
        >
          <Stack spacing={6}>
            <CustomProgress
              value={examSyncStatus?.percent}
              label={examSyncStatus?.percent?.toFixed(2)}
            />
            <Text size="xs" color="dark.2">
              {examSyncStatus?.currentOperation}
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
