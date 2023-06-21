import { Box, Flex, Group, Title as MantineTitle, Text } from "@mantine/core";

type ComponentProps = {
  title: string;
  description?: string;
  children?: any;
  mbDescription?: string;
};

export function PageHeader({ title, description, children, mbDescription }: ComponentProps) {
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'sm', sm: 'sm' }}
      justify={{ sm: 'center', md: 'space-between' }}
      style={{ marginBottom: '10px' }}
    >
      <Box>
        <MantineTitle
          order={2}
          style={{
            marginBottom: mbDescription ? mbDescription : '25px'
          }}
        >
          {title}
        </MantineTitle>
        <Text size="sm">{description}</Text>
      </Box>

      <Group>
        {children}
      </Group>
    </Flex>
  )
}