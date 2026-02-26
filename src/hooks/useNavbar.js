import { useEffect, useState } from "react";

export const useNavbar = () => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleNavbarScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleNavbarScroll);
    return () => window.removeEventListener("scroll", handleNavbarScroll);
  }, []);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenu(sectionId);
      setIsOpen(false);
    }
  };

  return {
    menu,
    isOpen,
    showDropdown,
    isScrolled,
    setMenu,
    setIsOpen,
    setShowDropdown,
    handleScroll,
  };
};
