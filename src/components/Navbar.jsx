import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import ModeSwitch from "./ModeSwitch";
const Navbar = ({ logged, handleLog, handleMode, mode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname == "/") {
        window.scrollY >= screen.availHeight - 50
          ? setIsScrolled(true)
          : setIsScrolled(false);
      }else if(location.pathname.startsWith("/profile")){
        window.scrollY >=0 ? setIsScrolled(true) : setIsScrolled(false);
      } else {
        window.scrollY >= "320" ? setIsScrolled(true) : setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [location]);

  return (
    <div
      dir="ltr"
      className={`w-screen fixed z-50 mx-auto top-0 left-1/2 transform -translate-x-1/2 shadow-none flex ${
        isScrolled ? "bg-grey-100 dark:bg-main-700" : "bg-transparent"
      }`}
    >
      <nav className="w-full mx-auto flex justify-between items-center bg-transparent">
        <div className="flex justify-between mx-auto items-center w-full max-w-screen px-12 md:px-28 lg:px-16">
          <Link to="/">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="w-[50px] md:w-[70px]"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <ModeSwitch handleMode={handleMode} mode={mode} />
            <LanguageSwitch isScrolled={isScrolled} />
            <DropDown
              isScrolled={isScrolled}
              logged={logged}
              handleLog={handleLog}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
