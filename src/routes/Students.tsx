import { Outlet, Route, Routes } from "react-router-dom";
import { StudentsListPage } from "../pages/Students/List";
import { StudentPage } from "../pages/Students/Student";

export function StudentsRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Outlet}>
        <Route index Component={StudentsListPage} />
        <Route path=":studentId" Component={StudentPage} />
        <Route path="novo-aluno" Component={StudentPage} />
      </Route>
    </Routes>
  );
}
