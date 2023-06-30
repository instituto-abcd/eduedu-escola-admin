import { Outlet, Route, Routes } from "react-router-dom";
import { ClassDetailPage } from "~/pages/Classes/Detail";
import { ClassesListPage } from "~/pages/Classes/List";
import { NewClassPage } from "~/pages/Classes/New";

export function ClassesRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Outlet}>
        <Route index Component={ClassesListPage} />
        <Route path=":classId" Component={ClassDetailPage} />
        <Route path="nova-turma" Component={NewClassPage} />
        <Route path="editar/:classId" Component={NewClassPage} />
      </Route>
    </Routes>
  );
}
