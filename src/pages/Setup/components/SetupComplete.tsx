import {
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { PATH } from "~/constants/path";

export function SetupComplete() {
  return (
    <Card>
      <Stack spacing="lg">
        <Title order={4}>Agora sim, está tudo pronto!</Title>
        <Text>
          As informações preenchidas podem ser alteradas no menu&nbsp;
          <strong>”Configurações”</strong>.
        </Text>
        <Text>
          Você está pronto para iniciar o uso do Portal, basta cadastrar os
          usuários com os devidos perfis de acesso e iniciar a sua jornada pelo
          mundo EduEdu.
        </Text>
        <Divider />
        <Group position="right">
          <Button component={Link} to={PATH.USERS}>
            Começar
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
