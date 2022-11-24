import React, { createContext, useContext, useState } from 'react';

const InvoiceFormContext = createContext();

export const InvoiceFormStateContext = ({ children }) => {
  const [invoiceForm, setInvoiceForm] = useState({ open: false, mode: 'Creating' });
  const [invoiceFormBillFrom, setInvoiceFormBillFrom] = useState({
    street_adress: '19 Union Terrace', city: 'London', post_code: 'E1 3EZ', country: 'United Kingdom'
  });
  const [invoiceFormBillTo, setInvoiceFormBillTo] = useState({
    name: 'Alex Grim', email: 'alexgrim@mail.com', street_adress: '84 Church Way', city: 'Bradford',
    post_code: 'BD1 9PB', country: 'United Kingdom', invoice_date: null, payment_terms: 'Net 30 Days', project_description: 'Graphic Design'
  });
  const [invoiceFormItemList, setInvoiceFormItemList] = useState([{
    name: 'Banner Design', quantity: '3', price: '3.05', id: 1, emptyFields: ['quantity', 'price']
  },
  {
    name: 'Email Design', quantity: '2', price: '200.00', id: 2, emptyFields: ['name']
  }]);
  const [invoiceFormFieldErrors, setInvoiceFormFieldErrors] = useState([]);

  const checkFormErrors = () => {
    setInvoiceFormFieldErrors([]);
    const newInvoiceFormFieldErrors = [];
    Object.keys(invoiceFormBillFrom).forEach(field => {
      if (invoiceFormBillFrom[field] === '' || invoiceFormBillFrom[field] === ' ') {
        newInvoiceFormFieldErrors.push(`personal_${field}`);
      }
    });
    Object.keys(invoiceFormBillTo).forEach(field => {
      if (invoiceFormBillTo[field] === '' || invoiceFormBillTo[field] === ' ' || invoiceFormBillTo[field] === null) {
        newInvoiceFormFieldErrors.push(`client_${field}`);
      }
    });

    if (invoiceFormItemList.length === 0) {
      newInvoiceFormFieldErrors.push('no_item');
    }
    else {
      const itemsIdWithErrors = [];
      invoiceFormItemList.forEach((item) => {
        Object.keys(item).forEach(itemField => {
          if (item[itemField] === '' || item[itemField] === ' ') {
            itemsIdWithErrors.push({id: item.id, fieldError: itemField});
          }
        });
      });

      let newInvoiceFormItemList = invoiceFormItemList.map((item) => {
        const newItem = {...item};
        newItem.emptyFields = [];
        return newItem;
      });
      
      itemsIdWithErrors.forEach((itemIdWithErrors) => {
        const itemIndex = newInvoiceFormItemList.findIndex((item) => item.id === itemIdWithErrors.id);
        newInvoiceFormItemList[itemIndex].emptyFields.push(itemIdWithErrors.fieldError);
      })

      setInvoiceFormItemList(newInvoiceFormItemList);
      if (itemsIdWithErrors.length > 0) {
        newInvoiceFormFieldErrors.push('empty_fields_item');
      }
    }

    if (newInvoiceFormFieldErrors.length === 0) {
      return true;
    }
    else {
      setInvoiceFormFieldErrors(newInvoiceFormFieldErrors);
      return false;
    }
  }

  const cleanInvoiceForm = () => {
    setInvoiceForm({ open: false, mode: 'Creating' });
    setInvoiceFormBillFrom({ street_adress: '', city: '', post_code: '', country: '' });
    setInvoiceFormBillTo({
      name: '', email: '', street_adress: '', city: '', post_code: '', country: '', invoice_date: null, payment_terms: 'Net 30 Days', project_description: ''
    });
    setInvoiceFormItemList([]);
  }

  const addInvoiceFormItem = () => {
    const newArray = [];
    let highestId = 0

    invoiceFormItemList.forEach((item) => {
      if (item.id > highestId) {
        highestId = item.id;
      }
      newArray.push(item);
    })
    newArray.push({
      name: '', quantity: '', price: '', id: highestId + 1, emptyFields: []
    })

    setInvoiceFormItemList(newArray)
  }
  const deleteInvoiceFormItem = (itemId) => {
    const newArray = [];

    invoiceFormItemList.forEach((item) => {
      if (item.id !== itemId) {
        newArray.push(item);
      }
    })

    setInvoiceFormItemList(newArray)
  }

  const onChangeInvoiceFormItemList = (itemId, inputName, inputValue) => {
    const itemOnChange = invoiceFormItemList.find((item) => itemId === item.id);
    const itemOnChangeIndex = invoiceFormItemList.findIndex((item) => itemId === item.id);
    const newArray = [];
    const newItem = { ...itemOnChange, [inputName]: inputValue };

    invoiceFormItemList.forEach((item, index) => {
      if (index === itemOnChangeIndex) {
        newArray.push(newItem);
      }
      else {
        newArray.push(item);
      }
    })
    setInvoiceFormItemList(newArray)
  }

  const onChangeInvoiceFormBillFrom = (inputName, inputValue) => {
    setInvoiceFormBillFrom({ ...invoiceFormBillFrom, [inputName]: inputValue })
  }
  const onChangeInvoiceFormBillTo = (inputName, inputValue) => {
    setInvoiceFormBillTo({ ...invoiceFormBillTo, [inputName]: inputValue })
  }

  return (
    <InvoiceFormContext.Provider
      value={{
        invoiceForm,
        setInvoiceForm,
        invoiceFormBillFrom,
        invoiceFormBillTo,
        onChangeInvoiceFormBillFrom,
        onChangeInvoiceFormBillTo,
        invoiceFormItemList,
        onChangeInvoiceFormItemList,
        deleteInvoiceFormItem,
        addInvoiceFormItem,
        cleanInvoiceForm,
        invoiceFormFieldErrors,
        checkFormErrors,
      }}>
      {children}
    </InvoiceFormContext.Provider>
  )
}

export const useInvoiceFormStateContext = () => useContext(InvoiceFormContext);