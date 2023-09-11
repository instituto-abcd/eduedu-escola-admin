import { type MantineTheme } from "@mantine/core";

export const AccordionStyles: MantineTheme["components"]["Accordion"] = {
  styles: {
    controls: {
      color: '#364FC7',
      maxWidth: '85%'
    },
    chevron: {
      "&[data-rotate]": {
        transform: "rotate(45deg)",
      },
    },
    item: {
      backgroundColor: '#fff',
      boxShadow: "4px 6px 15px -5px rgba(0,0,0,0.40)",
    },
  }
};
