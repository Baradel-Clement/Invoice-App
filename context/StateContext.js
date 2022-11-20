import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [init, setInit] = useState(false);

  return (
    <Context.Provider
    value={{
      init,
      setInit
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);