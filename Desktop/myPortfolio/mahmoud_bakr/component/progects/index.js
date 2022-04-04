import useScroll from "../useScroll/useScroll";

import { AiTwotoneCrown, AiFillGithub } from "react-icons/ai";

import projects, { topProducts } from "../../data.js";

import classes from "./projects.module.css";

export default function Skills() {
  const [activeSection, containerRef] = useScroll(0.1, "projects");

  return (
    <div id="projects" className={classes.container} ref={containerRef}>
      <h1>My Projects</h1>
      <h2>My Finest Work</h2>
      <div className={classes.skillsContainer}>
        {topProducts.map((pro) => (
          <div key={pro.title} className={classes.container2}>
            <div className={classes.crown}>
              <AiTwotoneCrown />
            </div>
            <h2>{pro.title}</h2>
            <h4>{pro.comment}</h4>
            <div className={classes.list}>
              <div className={classes.item}>
                <div className={classes.imageContainer}>
                  <img src={pro.image} alt="" />
                </div>
              </div>
              <div className={classes.buttonContainer}>
                <a href={pro.link} target="_blank" rel="noreferrer">
                  Live Preview
                </a>
                {pro.tutorial && (
                  <a href={pro.tutorial} target="_blank" rel="noreferrer">
                    Project tutorial
                  </a>
                )}
              </div>
              <p className={classes.intro}>{pro.description}</p>
              <div className={classes.github} style={{ padding: "10px" }}>
                <a href={pro.githubLink} target="_blank" rel="noreferrer">
                  <AiFillGithub />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {projects.map((pro) => (
        <div key={pro.title} className={classes.project1}>
          <h1>{pro.title}</h1>
          <div className={classes.project}>
            <div className={classes.projectConatiner}>
              <div className={classes.intro}>{pro.description}</div>
              <div
                className={classes.buttonContainer}
                style={{ justifyContent: "flex-start" }}
              >
                <a
                  style={{ width: "55%" }}
                  href={pro.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Preview
                </a>
              </div>
              <div className={classes.github}>
                <a href={pro.githubLink} target="_blank" rel="noreferrer">
                  <AiFillGithub />
                </a>
              </div>
            </div>
            <div className={classes.item}>
              <div className={classes.imageContainer}>
                <img src={pro.image} alt="" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
