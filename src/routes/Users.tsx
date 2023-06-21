import { Outlet, Route, Routes } from "react-router-dom";
import { UsersListPage } from "../pages/Users/List";
import { UserPage } from "../pages/Users/User";

export function UsersRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Outlet}>
        <Route index Component={UsersListPage} />
        <Route path=":userId" Component={UserPage} />
        <Route path="novo-usuario" Component={UserPage} />
      </Route>
    </Routes>
  );
}
