import { Progress, Stack, Text } from "@mantine/core";

type componentProps = {
  value: number;
  label: string;
};
export function CustomProgress({ value, label }: componentProps) {
  return (
    <div style={{ position: "relative" }}>
      <Progress value={value} my={6} size="xl" />
      <Stack
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <Text size="xs" color="dark.9" weight={700}>
          {label}%
        </Text>
      </Stack>
    </div>
  );
}
