import { type MantineTheme } from "@mantine/core";

export const CardStyles: MantineTheme["components"]["Card"] = {
  defaultProps: {
    radius: "md",
    shadow: "sm",
  },
  styles: {
    root: {
      height: '100%',
      padding: '40px!important'
    }
  }
};
