import useScroll from "../useScroll/useScroll";
import classes from "./hero.module.css";

export default function Hero() {
  const [isVisible, containerRef] = useScroll(1, "main");

  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.container2}>
        <h1 className={classes.name}>Mahmoud Bakr</h1>
        <h1 className={classes.title}>Full-Stack Web Developer</h1>
      </div>
    </div>
  );
}
