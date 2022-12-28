import { createContext, useState } from 'react';
const Context = createContext();

const ContextProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(1);
  return (
    <Context.Provider value={{ activePage, setActivePage }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
