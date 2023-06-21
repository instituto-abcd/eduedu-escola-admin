import { Route, Routes } from "react-router-dom";
import { SettingsPage } from "../pages/Settings";

export function SettingsRoutes() {
  return (
    <Routes>
      <Route index Component={SettingsPage} />
    </Routes>
  );
}
