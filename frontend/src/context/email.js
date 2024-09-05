import React, { createContext, useContext, useState, useEffect } from "react";

export const MyVariableContext = createContext(null);

export const MyVariableProvider = ({ children }) => {
  const [myVariable, setMyVariable] = useState(() => {
    const storedValue = localStorage.getItem("thinker");
    return storedValue ? JSON.parse(storedValue) : "";
  });

  useEffect(() => {
    localStorage.setItem("thinker", JSON.stringify(myVariable));
  }, [myVariable]);

  return (
    <MyVariableContext.Provider value={{ myVariable, setMyVariable }}>
      {children}
    </MyVariableContext.Provider>
  );
};

export const useMyVariable = () => useContext(MyVariableContext);
