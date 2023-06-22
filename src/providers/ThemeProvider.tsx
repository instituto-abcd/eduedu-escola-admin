import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import {
  ButtonStyles,
  CardStyles,
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
    Text: TextStyles,
    TextInput: TextInputStyles,
    PasswordInput: PasswordInputStyles,
    Select: TextInputStyles,
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
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
      <ModalsProvider>
        <Notifications position="top-center" />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
