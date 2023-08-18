import NavItem from "./NavItem";

const CategoryBar = () => {
  const categoryItems = (
    <>
      <NavItem href="/frontend-dev" name="Frontend Development"></NavItem>
      <NavItem href="/backend-dev" name="Backend Development"></NavItem>
      <NavItem href="/fullStack-dev" name="Full-stack Development"></NavItem>
      <NavItem href="/ui-ux-design" name="UI/UX Design"></NavItem>
      <NavItem href="/digital-marketing" name="Digital Marketing"></NavItem>
      <NavItem href="/data-entry" name="Data Entry"></NavItem>
    </>
  );

  return (
    <nav>
      <div className="bg-[#8c52ff]">
        <div className="container mx-auto space-x-4 py-1 hidden md:flex items-center justify-center">
          {categoryItems}
        </div>
      </div>
    </nav>
  );
};

export default CategoryBar;
