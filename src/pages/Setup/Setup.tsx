import { BackgroundImage, Center, LoadingOverlay } from "@mantine/core";
import bg from "~/assets/backgrounds/login-1920w.png";
import { CreateMasterForm } from "./components/CreateMasterForm";
import { useSettingsGetStatus } from "~/api/settings";
import { useNavigate } from "react-router-dom";
import { errorNotification } from "~/utils/errorNotification";
import { PATH } from "~/constants/path";
import { CreateSchoolForm } from "./components/CreateSchoolForm";
import { SetupComplete } from "./components/SetupComplete";

export function SetupPage() {
  const navigate = useNavigate();

  const { data: status, isLoading } = useSettingsGetStatus({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);

      navigate(PATH.LOGIN);
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const ownerStep =
    !status?.completedOwnerSetup && !status?.completedSchoolSetup;
  const schoolStep =
    status?.completedOwnerSetup && !status?.completedSchoolSetup;
  const setupComplete =
    status?.completedOwnerSetup && status?.completedSchoolSetup;

  return (
    <BackgroundImage src={bg} h="100vh">
      <LoadingOverlay visible={isLoading} />
      <Center w={732} h={"80%"} mx="auto">
        {ownerStep && <CreateMasterForm />}
        {schoolStep && <CreateSchoolForm />}
        {setupComplete && <SetupComplete />}
      </Center>
    </BackgroundImage>
  );
}
