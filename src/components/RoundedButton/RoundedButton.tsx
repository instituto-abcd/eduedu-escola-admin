import { Button } from "@mantine/core";

type componentProps = {
  text: string,
  color?: string,
  fullWidth?: boolean,
  disabled?: boolean,
}

export function RoundedButton({ text, color, fullWidth, disabled }: componentProps) {

  return (
    <Button
      color={color ? color : 'blue.6'}
      radius={20}
      fullWidth={fullWidth ? fullWidth : false}
      disabled={disabled ? disabled : false}
    >
      {text}
    </Button>
  )
}