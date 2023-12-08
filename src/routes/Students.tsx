import { Outlet, Route, Routes } from "react-router-dom";
import { StudentsListPage } from "../pages/Students/List";
import { StudentEditPage } from "../pages/Students/Student";
import { StudentDetailPage } from "../pages/Students/Student";
import { StudentReport } from "~/pages/Reports/Student/Index";

export function StudentsRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Outlet}>
        <Route index Component={StudentsListPage} />
        <Route path=":studentId/editar" Component={StudentEditPage} />
        <Route path=":studentId/detalhes" Component={StudentDetailPage} />
        <Route path=":studentId/relatorio" Component={StudentReport} />
        <Route path="novo-aluno" Component={StudentEditPage} />
      </Route>
    </Routes>
  );
}
