import { Flex, Text, useMantineTheme } from '@mantine/core'
import { IconCalendar } from '@tabler/icons-react';

type componentProps = {
    year?: string;
    status?: string;
    children?: any;
};

export function Header({ year, status, children }: componentProps) {

    const theme = useMantineTheme();
    var colorStatus = 'black'

    switch (status) {
        case 'Ativo':
            colorStatus = theme.colors.blue[9]
            break;
        case 'Inativo':
            colorStatus = theme.colors.yellow[6]
            break;
        case 'Finalizado':
            colorStatus = theme.colors.red[4]
            break;
        default:
            break;
    }

    return (
        <Flex justify={'space-between'} mb="md">
            <Flex>
                <IconCalendar color={colorStatus} />
                <Text color={colorStatus}>{year}</Text>
            </Flex>

            {status != 'Inativo' &&
                <Text
                    color={colorStatus}
                    weight={600}>
                    {status}
                </Text>
            }

            {children}
        </Flex>
    )
}
