import Link from "next/link";

const NavItem = ({ href, name, classes }) => {
  return (
    <Link
      href={href}
      className={`text-black font-semibold text-sm hover:text-gray-300 block ${classes}`}
    >
      {name}
    </Link>
  );
};

export default NavItem;
