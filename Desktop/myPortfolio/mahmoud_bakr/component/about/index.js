import useScroll from "../useScroll/useScroll";
import classes from "./about.module.css";

export default function About() {
  const [activeSection, containerRef] = useScroll(0.7, "about");
  return (
    <div id="about" ref={containerRef} className={classes.container}>
      <h1 className={classes.section}>About me </h1>
      <div className={classes.container3}>
        <div className={classes.container2}>
          <h1 className={classes.hi}>Hi,</h1>
          <h2 className={classes.name}>My Name is Mahmoud Bakr</h2>
          <h3 className={classes.title}>And I am a Full-Stack Web Developer</h3>
          <p className={classes.intro}>
            Since my childhood, I have been always fascinated by Computers and
            how they work and I found that I have a great passion for WEB so in
            2019 I have started my career as a Full-Stack web Developer and
            since then I have learned and enjoyed a lot
            <br />
            So right Now I <span>Can</span> build <span>Any</span> website no
            matter how hard or big it is
          </p>
        </div>
        <div className={classes.imageContainer}>
          <img src="/about.jpg" alt="" width={300} height={300} />
        </div>
      </div>
    </div>
  );
}
