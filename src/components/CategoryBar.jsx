import NavItem from "./NavItem";

const CategoryBar = () => {
  const categoryItems = (
    <>
      <NavItem href="/frontendDev" name="Frontend Development"></NavItem>
      <NavItem href="/backendDev" name="Backend Development"></NavItem>
      <NavItem href="/fullStackDev" name="Full-stack Development"></NavItem>
      <NavItem href="/uiUxDesign" name="UI/UX Design"></NavItem>
      <NavItem href="/digitalMarketing" name="Digital Marketing"></NavItem>
      <NavItem href="/dataEntry" name="Data Entry"></NavItem>
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
