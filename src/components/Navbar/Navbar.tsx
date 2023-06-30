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
import { useUserStore } from "~/stores/user";
import { PATH } from "~/constants/path";
import { Notifications } from "../Notifications";

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
  const userProfile = useUserStore((u) => u.profile);

  const usedLinks = links.filter((link) => {
    const hiddenfromProfessor = [PATH.SETTINGS, PATH.USERS, PATH.SCHOOL_YEAR];

    if (userProfile === "TEACHER") {
      return !hiddenfromProfessor.includes(link.to);
    } else return true;
  });

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
        position="apart"
        noWrap
        align="center"
        h="100%"
        px={150}
      >
        <Image src={logo} alt="EduEdu Escola" width={50} mx={40} />

        <Group noWrap>
          <Group spacing={16}>
            {usedLinks.map((link) => (
              <Link key={link.label} to={link.to} className={classes.anchor}>
                <Text color="dark.5" td="none" weight={600} size={14}>
                  {link.label}
                </Text>
              </Link>
            ))}
          </Group>
          <Divider orientation="vertical" mx={30} variant="solid" />
          <Group noWrap>
            <Notifications />
            <UserDropdown />
          </Group>
        </Group>
      </Group>
    </MantineHeader>
  );
}
