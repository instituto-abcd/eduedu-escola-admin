import { Link } from "react-router-dom";
import {
  Header as MantineHeader,
  Image,
  Text,
  Group,
  Divider,
  createStyles,
  ActionIcon,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import logo from "~/assets/logos/eduedu-azul.svg";
import { UserDropdown } from "../UserDropdown";

const useStyles = createStyles({
  anchor: {
    textDecoration: "none",
    color: "inherit",
    ":hover": {
      textDecoration: "underline",
    },
  },
});

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Usuários", to: "/usuarios" },
  { label: "Ano Letivo", to: "/ano-letivo" },
  { label: "Turmas", to: "/turmas" },
  { label: "Alunos", to: "/alunos" },
  { label: "Configurações", to: "/configuracoes" },
] as const;

export function Navbar() {
  const { classes } = useStyles();

  return (
    <MantineHeader
      height={78}
      styles={{
        root: {
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        },
      }}
      py={17}
    >
      <Group
        maw={1440}
        w="100%"
        spacing={64}
        position="center"
        noWrap
        align="center"
        h="100%"
      >
        <Image src={logo} alt="EduEdu Escola" width={50} mx={40} />
        {links.map((link) => (
          <Link key={link.label} to={link.to} className={classes.anchor}>
            <Text color="dark.5" td="none" weight={600} size={14}>
              {link.label}
            </Text>
          </Link>
        ))}
        <Divider orientation="vertical" />
        <Group noWrap>
          <ActionIcon variant="subtle">
            <IconBell height={20} color="#2C2E33" />
          </ActionIcon>
          <UserDropdown />
        </Group>
      </Group>
    </MantineHeader>
  );
}
