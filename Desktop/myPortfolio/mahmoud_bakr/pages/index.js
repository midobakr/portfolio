import Nav from "../component/nav";
import Hero from "../component/hero";
import About from "../component/about";
import Skills from "../component/skills";
import Progects from "../component/progects";
import Contact from "../component/contact";

import classes from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={classes.container}>
      <Nav />
      <Hero />
      <About />
      <Progects />
      <Skills />
      <Contact />
    </div>
  );
}
