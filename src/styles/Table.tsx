/* eslint-disable react-hooks/rules-of-hooks */
import { createStyles, type MantineTheme } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  table: {
    "& > thead > tr": {
      backgroundColor: "#F8F9FA",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopColor: theme.colors.gray[3],
    },
  },
}));

export const TableStyles: MantineTheme["components"]["Table"] = {
  defaultProps: () => {
    const { classes } = useStyles();

    return {
      size: "md",
      radius: "md",
      className: classes.table,
    };
  },
};
