import { AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";

import useScroll from "../useScroll/useScroll";
import classes from "./contact.module.css";

export default function About() {
  const [activeSection, containerRef] = useScroll(0.8, "contact");
  return (
    <div id="contact" ref={containerRef} className={classes.container}>
      <h1 className={classes.section}>Contact me </h1>
      <div className={classes.container2}>
        <div>
          <AiOutlineMail />
          <a href="mailto: mahmoudbakr9820@gmail.com">
            mahmoudbakr9820@gmail.com
          </a>
        </div>
        <div>
          <AiOutlineWhatsApp />
          <span>+02 &nbsp; 01067979587</span>
        </div>
      </div>
    </div>
  );
}
