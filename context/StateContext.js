import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [statusFilter, setStatusFilter] = useState(false);
  const [statusFilterValue, setStatusFilterValue] = useState(['Draft', 'Paid'])

  const onChangeStatusFilterValue = (filterName) => {
    const newArray = [];
    if (statusFilterValue.includes(filterName)) {
      statusFilterValue.forEach((statut) => {
        if (statut !== filterName) {
          newArray.push(statut);
        }
      })
    }
    else {
      statusFilterValue.forEach((statut) => {
        newArray.push(statut);
      })
      newArray.push(filterName)
    }
    setStatusFilterValue(newArray);
  }

  return (
    <Context.Provider
    value={{
      statusFilter,
      setStatusFilter,
      statusFilterValue,
      onChangeStatusFilterValue
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);