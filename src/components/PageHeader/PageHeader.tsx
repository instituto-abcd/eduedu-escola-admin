import { Group, Title as MantineTitle, Stack, Text } from "@mantine/core";

type ComponentProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  gap?: number;
};

export function PageHeader({
  title,
  gap = 30,
  description,
  children,
}: ComponentProps) {
  return (
    <Group spacing={200} noWrap align="flex-start">
      <Stack spacing={gap} w="100%">
        <MantineTitle order={2}>{title}</MantineTitle>
        <Text size="sm">{description}</Text>
      </Stack>

      <Group>{children}</Group>
    </Group>
  );
}
