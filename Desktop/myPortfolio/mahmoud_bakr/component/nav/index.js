import { useContext, useState } from "react";
import appContext from "../../store/context";

import { IoReorderThreeOutline } from "react-icons/io5";

import classes from "./nav.module.css";

export default function Nav() {
  const { activeSection } = useContext(appContext);
  const [mobNav, setMobNav] = useState(false);

  const closeNav = () => {
    setMobNav(false);
  };
  return (
    <div className={classes.container}>
      <div className={classes.container2}>
        <div className={classes.brand}>Mahmoud Bakr</div>
        <ul
          className={classes.list}
          style={mobNav ? { right: 0, backgroundColor: "gray" } : {}}
        >
          <li
            onClick={closeNav}
            className={activeSection === "about" ? classes.active : ""}
          >
            <a href="#about">About</a>
          </li>
          <li
            onClick={closeNav}
            className={activeSection === "projects" ? classes.active : ""}
          >
            <a href="#projects">Projects</a>
          </li>

          <li
            onClick={closeNav}
            className={activeSection === "skills" ? classes.active : ""}
          >
            <a href="#skills">Skills</a>
          </li>

          <li
            onClick={closeNav}
            className={activeSection === "contact" ? classes.active : ""}
          >
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <span
          className={classes.toggle}
          onClick={() => {
            setMobNav(!mobNav);
          }}
        >
          <IoReorderThreeOutline />
        </span>
      </div>
    </div>
  );
}
