import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/pt-br";

import {
  ButtonStyles,
  CardStyles,
  DividerStyles,
  PasswordInputStyles,
  TableStyles,
  TextInputStyles,
  TextStyles,
  TitleStyles,
} from "../styles";

const theme: MantineThemeOverride = {
  fontFamily: "Inter, sans-serif",

  components: {
    Button: ButtonStyles,
    Card: CardStyles,
    Divider: DividerStyles,
    Text: TextStyles,
    TextInput: TextInputStyles,
    PasswordInput: PasswordInputStyles,
    Select: TextInputStyles,
    DateInput: TextInputStyles,
    Title: TitleStyles,
    Table: TableStyles,
  },

  globalStyles() {
    return {};
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <DatesProvider settings={{ locale: "pt-BR" }}>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
        <ModalsProvider>
          <Notifications position="top-center" />
          {children}
        </ModalsProvider>
      </MantineProvider>
    </DatesProvider>
  );
}
