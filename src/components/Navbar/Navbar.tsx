import { Link } from "react-router-dom";
import {
  Header as MantineHeader,
  Image,
  Text,
  Group,
  Divider,
  createStyles,
} from "@mantine/core";
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
    >
      <Group w="100%" position="apart" noWrap align="center">
        <Link to="/dashboard">
          <Image src={logo} alt="EduEdu Escola" width={50} ml={24} />
        </Link>

        <Group spacing={16} noWrap>
          {usedLinks.map((link) => (
            <Link key={link.label} to={link.to} className={classes.anchor}>
              <Text color="dark.5" td="none" weight={600} size={14} truncate>
                {link.label}
              </Text>
            </Link>
          ))}
        </Group>
        <Group noWrap>
          <Divider orientation="vertical" variant="solid" />
          <Group noWrap>
            <Notifications />
            <UserDropdown />
          </Group>
        </Group>
      </Group>
    </MantineHeader>
  );
}
