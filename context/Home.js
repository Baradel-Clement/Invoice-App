import React, { createContext, useContext, useState } from 'react';

const HomeContext = createContext();

export const HomeStateContext = ({ children }) => {
  const [statusFilter, setStatusFilter] = useState(false);
  const [statusFilterValue, setStatusFilterValue] = useState(['Draft', 'Pending']);

  const [invoices, setInvoices] = useState([])
  const [viewInvoiceMode, setViewInvoiceMode] = useState({mode: false, invoiceId: ''})
  const [confirmDeletion, setConfirmDeletion] = useState({open: false, invoiceId: '', displayId: ''});
  const [confirmEmail, setConfirmEmail] = useState({open: false, invoice: {}})

  const deleteInvoiceState = (deletedId) => {
    const newInvoices = [];
    invoices.forEach((invoice) => {
      if (invoice.id !== deletedId) {
        newInvoices.push(invoice);
      }
    })
    setInvoices(newInvoices);
  }

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
    <HomeContext.Provider
      value={{
        statusFilter,
        setStatusFilter,
        statusFilterValue,
        onChangeStatusFilterValue,
        setInvoices,
        invoices,
        setViewInvoiceMode,
        viewInvoiceMode,
        confirmDeletion,
        setConfirmDeletion,
        deleteInvoiceState,
        confirmEmail,
        setConfirmEmail,
      }}>
      {children}
    </HomeContext.Provider>
  )
}

export const useHomeStateContext = () => useContext(HomeContext);