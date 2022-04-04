import useScroll from "../useScroll/useScroll";
import classes from "./skills.module.css";

export default function Skills() {
  const [activeSection, containerRef] = useScroll(0.4, "skills");

  return (
    <div id="skills" className={classes.container} ref={containerRef}>
      <h1>My Skills</h1>
      <div className={classes.skillsContainer}>
        <div className={classes.container2}>
          <h2>Front-end</h2>
          <ul className={classes.list}>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/html.png" alt="" />
              </div>
              <span>HTML</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/css4.png" alt="" />
              </div>
              <span>CSS3</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/js.png" alt="" />
              </div>
              <span>JavaScript</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/react.png" alt="" />
              </div>
              <span>React</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/gatsby.png" alt="" />
              </div>
              <span>Gatsby</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/nextjs.png" alt="" />
              </div>
              <span>NEXTjs</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/redux.png" alt="" />
              </div>
              <span>Redux</span>
            </li>
          </ul>
        </div>

        <div className={classes.container2}>
          <h2>Back-end</h2>
          <ul className={classes.list}>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/nodejs.png" alt="" />
              </div>
              <span>Node js</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/expressjs.png" alt="" />
              </div>
              <span>Epress</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/mongodb.png" alt="" />
              </div>
              <span>MongoDB</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/socket.png" alt="" />
              </div>
              <span>Soket.io</span>
            </li>
            <li className={classes.item}>
              <div className={classes.iconContainer}>
                <img src="/firebase.png" alt="" />
              </div>
              <span>Firebase</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
