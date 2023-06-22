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

export function AppRoutes() {
  function nested(route: string) {
    return route.endsWith("/") ? route + "*" : `${route}/*`;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Layout}>
          <Route index element={<Navigate to={PATH.DASHBOARD} />} />
          <Route path={nested(PATH.DASHBOARD)} Component={DashboardRoutes} />
          <Route path={nested(PATH.USERS)} Component={UsersRoutes} />
          <Route path={nested(PATH.STUDENTS)} Component={StudentsRoutes} />
          <Route path={nested(PATH.SETTINGS)} Component={SettingsRoutes} />
          <Route path={nested(PATH.SCHOOL_YEAR)} Component={SchoolYearRoutes} />
          <Route path={nested(PATH.CLASSES)} Component={ClassesRoutes} />
        </Route>
        <Route path={nested(PATH.LOGIN)} Component={AuthRoutes} />
      </Routes>
    </BrowserRouter>
  );
}
