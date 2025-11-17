import { showNotification } from "@mantine/notifications";

// TODO: need code & design review

export const successNotification = (
  title: string,
  message: string,
  onOpen?: () => void
) =>
  showNotification({
    title: title ? title : "Operação realizada com sucesso",
    message,
    color: "teal",
    onOpen() {
      onOpen ? onOpen() : (() => {})();
    },
  });
