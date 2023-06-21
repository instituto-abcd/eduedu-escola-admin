import { IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

// Bare minimum – message is required for all notifications
notifications.show({ message: 'Hello' });

// Most used notification props
notifications.show({
    id: 'hello-there',
    withCloseButton: true,
    onClose: () => console.log('unmounted'),
    onOpen: () => console.log('mounted'),
    autoClose: 5000,
    title: "You've been compromised",
    message: 'Leave the building immediately',
    color: 'red',
    icon: <IconX />,
    className: 'my-notification-class',
    style: { backgroundColor: 'red' },
    sx: { backgroundColor: 'red' },
    loading: false,
});

// TODO: need code & design review

// export const errorNotification = (title: string, message: string) =>
//     showNotification({
//         title: title ? title : "ops!",
//         message,
//         color: "red"
//     });
