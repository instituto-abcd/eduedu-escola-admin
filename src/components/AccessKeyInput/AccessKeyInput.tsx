import { ActionIcon, Loader, TextInput, useMantineTheme } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useGetAccessKey, useUpdateAccessKey } from "~/api/user";
import { useUserStore } from "~/stores/user";
import { errorNotification } from "~/utils/errorNotification";

type AccessKeyInputProps = {
  userId?: string;
  styled?: boolean;
};

export function AccessKeyInput({
  userId,
  styled = false,
}: AccessKeyInputProps) {
  const authorizedUserId = useUserStore((u) => u.id);
  const finalId = userId ?? authorizedUserId ?? "";

  const { data, isLoading: fetching } = useGetAccessKey(finalId);

  const { mutate: updateAccessKey, isLoading: updating } = useUpdateAccessKey({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
  });

  const isLoading = fetching || updating;
  const inputValue = isLoading ? "Carregando..." : data?.accessKey ?? "";

  const theme = useMantineTheme();

  return (
    <TextInput
      label="Código de acesso"
      value={inputValue}
      readOnly
      styles={{
        input: {
          backgroundColor: theme.colors.gray[1],
          color: theme.colors.gray[6],
          fontSize: theme.fontSizes.sm,
        },
        label: styled
          ? {
              marginBottom: 12,
              color: theme.colors.gray[9],
              fontWeight: 600,
            }
          : {},
      }}
      rightSection={
        isLoading ? (
          <Loader size="xs" />
        ) : (
          <ActionIcon color="blue.9" onClick={() => updateAccessKey(finalId)}>
            <IconRefresh width={20} height={20} />
          </ActionIcon>
        )
      }
    />
  );
}
