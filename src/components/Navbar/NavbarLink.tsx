import { Link } from "@tanstack/router";

type ComponentProps = {
    route: string;
    text: string;
};

export function NavbarLink({ route, text }: ComponentProps) {
    return (
        <Link
            to={route}
            search=""
            style={{
                color: '#000',
                fontWeight: 'bold',
                textDecoration: 'none'
            }}
        >
            {text}
        </Link>
    )
}