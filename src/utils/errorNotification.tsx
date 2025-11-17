import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";

// TODO: validate icon, color and message

export const errorNotification = (
  title: string,
  message: string,
  onOpen?: () => void
) =>
  showNotification({
    title,
    message: <div dangerouslySetInnerHTML={{ __html: message }} />,
    color: "red",
    icon: <IconAlertTriangle />,
    onOpen() {
      onOpen ? onOpen() : (() => {})();
    },
  });
