import { Routes, Route } from "react-router-dom";
import { SetupPage } from "~/pages/Setup";

export function SetupRoutes() {
  return (
    <Routes>
      <Route index Component={SetupPage} />
    </Routes>
  );
}
