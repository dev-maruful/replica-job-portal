import Link from "next/link";

const NavItem = ({ href, name }) => {
  return (
    <Link href={href} className="text-white text-sm hover:text-gray-300">
      {name}
    </Link>
  );
};

export default NavItem;
