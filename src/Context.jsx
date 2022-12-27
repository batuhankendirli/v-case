import { createContext, useState } from "react";
const Context = createContext();

const ContextProvider = ({children}) => {
  const [activeLocationPage, setActiveLocationPage] = useState(1)
  return (
    <Context.Provider value={{activeLocationPage,setActiveLocationPage}}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider};
