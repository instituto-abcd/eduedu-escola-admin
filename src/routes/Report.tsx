import { Outlet, Route, Routes } from "react-router-dom";
import { ReportList } from "~/pages/Reports/ReportList";
import { SchoolClassReport } from "~/pages/Reports/SchoolClass/SchoolClassReport";
import { StudentReport } from "~/pages/Reports/Student/Index";

export function ReportRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Outlet}>
        <Route index Component={ReportList} />
        <Route path="turma/:classId" Component={SchoolClassReport} />
        <Route path="aluno/:studentId" Component={StudentReport} />
      </Route>
    </Routes>
  );
}