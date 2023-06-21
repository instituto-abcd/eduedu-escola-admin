import { Route, Routes } from "react-router-dom";
import { SchoolYearPage } from "../pages/SchoolYear/SchoolYear";

export function SchoolYearRoutes() {
  return (
    <Routes>
      <Route index Component={SchoolYearPage} />
    </Routes>
  );
}
