import { Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "~/constants/path";
import { useUserStore } from "~/stores/user";
import { LoginPage } from "~/pages/Login/LoginPage";

export function AuthRoutes() {
  const isUserAuthenticated = useUserStore((state) =>
    state.isUserAuthenticated()
  );

  if (isUserAuthenticated) return <Navigate to={PATH.DASHBOARD} />;

  return (
    <Routes>
      <Route index Component={LoginPage} />
    </Routes>
  );
}
