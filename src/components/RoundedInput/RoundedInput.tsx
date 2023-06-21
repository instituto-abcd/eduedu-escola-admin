import { TextInput } from "@mantine/core";

type componentProps = {
  label: string,
  placeholder: string,
}

export function RoundedInput({ label, placeholder }: componentProps) {

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      styles={{ input: { borderRadius: '14px', marginBottom: '20px' }, label: { color: '#fff' } }}
    />
  )
}