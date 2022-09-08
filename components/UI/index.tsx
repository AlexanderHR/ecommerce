import Link from "next/link";

export const NavLink = ({ href, name }: { href: string, name: string }) => {
    return (
        <Link href={href}>
            <a>{name}</a>
        </Link>
    );
}

