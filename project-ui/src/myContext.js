import React, { createContext, useState } from 'react';


const MyContext = createContext();


const MyContextProvider = ({ children }) => {
  const [data, setData] = useState('Initial Context Data');

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
