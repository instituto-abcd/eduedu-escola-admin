import { Outlet, Route, Routes } from "react-router-dom";
import { ClassesPage, DetailsPage, FormPage } from "../pages/Classes";

export function ClassesRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Outlet}>
        <Route index Component={ClassesPage} />
        <Route path=":classId" Component={DetailsPage} />
        <Route path="nova-turma" Component={FormPage} />
        <Route path="editar/:classId" Component={FormPage} />
      </Route>
    </Routes>
  );
}
