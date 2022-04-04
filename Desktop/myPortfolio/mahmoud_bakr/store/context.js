import { createContext, useState } from "react";

const appContext = createContext({
  activeSection: "",
});

const AppContextProvider = (props) => {
  const [activeSection, setActiveSection] = useState("");

  const store = {
    activeSection,
    setActiveSection,
  };
  return (
    <appContext.Provider value={store}>{props.children}</appContext.Provider>
  );
};

export default appContext;

export { AppContextProvider };
