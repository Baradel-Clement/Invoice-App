/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { useInvoiceFormStateContext } from '../context/InvoiceForm'
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { generateInvoiceDisplayId } from '../utils/invoiceForm';
import iconDelete from '../public/assets/icon-delete.svg';
import iconDeleteHover from '../public/assets/icon-delete-hover.svg';

const getTotalPrice = (quantity, price) => {
  if (price === '') {
    return '0.00';
  }
  if (price !== '' && quantity === '') {
    return parseFloat(price).toFixed(2);
  }
  return (parseFloat(quantity).toFixed(2) * parseFloat(price).toFixed(2)).toFixed(2)
}

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: Spartan, Courrier, monospace;
  font-size: 12px;
  box-sizing: border-box;
  height: 50px;
  width: 240px;
  padding: 0px 20px;
  border-radius: 4px;
  text-align: left;
  background: #fff;
  border: 1px solid #dfe3fa;
  font-weight: bold;
  color: #1E2139;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    border-color: #7C5DFA;
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: Spartan, Courrier, monospace;
  font-size: 12px;
  box-sizing: border-box;
  width: 240px;
  border-radius: 8px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid #dfe3fa;
  font-weight: bold;
  color: #1E2139;
  box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 16px 24px;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid #dfe3fa;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    color: #7C5DFA;
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} slots={slots} />;
}

const InvoiceForm = () => {
  const { invoiceForm, setInvoiceForm, invoiceFormBillFrom, invoiceFormBillTo, onChangeInvoiceFormBillFrom, onChangeInvoiceFormBillTo, invoiceFormItemList, onChangeInvoiceFormItemList, deleteInvoiceFormItem, addInvoiceFormItem, cleanInvoiceForm, invoiceFormFieldErrors, checkFormErrors } = useInvoiceFormStateContext();
  const [iconDeleteHovering, setIconDeleteHovering] = useState(0);
  const { data: session, status } = useSession();

  const createInvoice = async (status) => {
    let invoiceTotal = 0;
    let invoice = {
      displayId: generateInvoiceDisplayId(),
      personalStreetAdress: invoiceFormBillFrom.street_adress,
      personalCity: invoiceFormBillFrom.city,
      personalPostCode: invoiceFormBillFrom.post_code,
      personalCountry: invoiceFormBillFrom.country,
      clientName: invoiceFormBillTo.name,
      clientEmail: invoiceFormBillTo.email,
      clientStreetAdress: invoiceFormBillTo.street_adress,
      clientCity: invoiceFormBillTo.city,
      clientPostCode: invoiceFormBillTo.post_code,
      clientCountry: invoiceFormBillTo.country,
      invoiceDate: invoiceFormBillTo.invoice_date,
      paymentTerms: invoiceFormBillTo.payment_terms[5] === ' ' ? parseInt(`${invoiceFormBillTo.payment_terms[4]}`) : parseInt(`${invoiceFormBillTo.payment_terms[4]}${invoiceFormBillTo.payment_terms[5]}`),
      description: invoiceFormBillTo.project_description,
      items: invoiceFormItemList.map((item) => {
        const newItem = {
          name: item.name,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
          total: Math.round(parseFloat(item.quantity) * parseFloat(item.price) * 100) / 100
        };
        invoiceTotal += newItem.total;
        return newItem;
      }),
      total: invoiceTotal,
      status,
      userId: session.user.id,
    };
    let res = await fetch("api/invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice)
    })

    const newInvoice = await res.json();
    console.log("Create successful", { newInvoice });
    // add to invoices list (global context state)
    // setinvoices({ invoice: newinvoice, type: "add" });
  }

  return (
    <>
      <div className='InvoiceForm-mask' onClick={() => setInvoiceForm({ ...invoiceForm, open: false })} />
      <div className='InvoiceForm'>
        <h3 className='XL bold'>{invoiceForm.mode === 'Creating' ? 'New Invoice' : 'Editing'}</h3>
        <div className='wrapForm'>
          <div className='InvoiceForm-inputs InvoiceForm-BillFrom'>
            <p className='violet S bold'>Bill From</p>
            <div className='input fullwidth'>
              <label className={`${invoiceFormFieldErrors.includes('personal_street_adress') ? 'red' : 'true-lavender'} S`} htmlFor='street_adress'>Street Adress</label>
              <input onChange={(e) => onChangeInvoiceFormBillFrom(e.target.name, e.target.value)} value={invoiceFormBillFrom.street_adress} className={`${invoiceFormFieldErrors.includes('personal_street_adress') ? 'error' : ''} bold S`} id="personal_street_adress" name="street_adress" />
              {invoiceFormFieldErrors.includes('personal_street_adress') && <p className='error XS red'>can't be empty</p>}
            </div>
            <div className='input-localisation'>
              <div className='input'>
                <label className={`${invoiceFormFieldErrors.includes('personal_city') ? 'red' : 'true-lavender'} S`} htmlFor='city'>City</label>
                <input onChange={(e) => onChangeInvoiceFormBillFrom(e.target.name, e.target.value)} value={invoiceFormBillFrom.city} className={`${invoiceFormFieldErrors.includes('personal_city') ? 'error' : ''} bold S`} id="personal_city" name="city" />
                {invoiceFormFieldErrors.includes('personal_city') && <p className='error XS red'>can't be empty</p>}
              </div>
              <div className='input'>
                <label className={`${invoiceFormFieldErrors.includes('personal_post_code') ? 'red' : 'true-lavender'} S`} htmlFor='post_code'>Post Code</label>
                <input onChange={(e) => onChangeInvoiceFormBillFrom(e.target.name, e.target.value)} value={invoiceFormBillFrom.post_code} className={`${invoiceFormFieldErrors.includes('personal_post_code') ? 'error' : ''} bold S`} id="personal_post_code" name="post_code" />
                {invoiceFormFieldErrors.includes('personal_post_code') && <p className='error XS red'>can't be empty</p>}
              </div>
              <div className='input'>
                <label className={`${invoiceFormFieldErrors.includes('personal_country') ? 'red' : 'true-lavender'} S`} htmlFor='country'>Country</label>
                <input onChange={(e) => onChangeInvoiceFormBillFrom(e.target.name, e.target.value)} value={invoiceFormBillFrom.country} className={`${invoiceFormFieldErrors.includes('personal_country') ? 'error' : ''} bold S`} id="personal_country" name="country" />
                {invoiceFormFieldErrors.includes('personal_country') && <p className='error XS red'>can't be empty</p>}
              </div>
            </div>
          </div>
          <div className='InvoiceForm-inputs InvoiceForm-BillFrom'>
            <p className='violet S bold'>Bill To</p>
            <div className='input fullwidth'>
              <label className={`${invoiceFormFieldErrors.includes('client_name') ? 'red' : 'true-lavender'} S`} htmlFor='name'>Client's Name</label>
              <input onChange={(e) => onChangeInvoiceFormBillTo(e.target.name, e.target.value)} value={invoiceFormBillTo.name} className={`${invoiceFormFieldErrors.includes('client_name') ? 'error' : ''} bold S`} id="client_name" name="name" />
              {invoiceFormFieldErrors.includes('client_name') && <p className='error XS red'>can't be empty</p>}
            </div>
            <div className='input fullwidth'>
              <label className={`${invoiceFormFieldErrors.includes('client_email') ? 'red' : 'true-lavender'} S`} htmlFor='email'>Client's email</label>
              <input onChange={(e) => onChangeInvoiceFormBillTo(e.target.name, e.target.value)} value={invoiceFormBillTo.email} className={`${invoiceFormFieldErrors.includes('client_email') ? 'error' : ''} bold S`} id="client_email" name="email" />
              {invoiceFormFieldErrors.includes('client_email') && <p className='error XS red'>can't be empty</p>}
            </div>
            <div className='input fullwidth'>
              <label className={`${invoiceFormFieldErrors.includes('client_street_adress') ? 'red' : 'true-lavender'} S`} htmlFor='street_adress'>Street Adress</label>
              <input onChange={(e) => onChangeInvoiceFormBillTo(e.target.name, e.target.value)} value={invoiceFormBillTo.street_adress} className={`${invoiceFormFieldErrors.includes('client_street_adress') ? 'error' : ''} bold S`} id="client_street_adress" name="street_adress" />
              {invoiceFormFieldErrors.includes('client_street_adress') && <p className='error XS red'>can't be empty</p>}
            </div>
            <div className='input-localisation'>
              <div className='input'>
                <label className={`${invoiceFormFieldErrors.includes('client_city') ? 'red' : 'true-lavender'} S`} htmlFor='city'>City</label>
                <input onChange={(e) => onChangeInvoiceFormBillTo(e.target.name, e.target.value)} value={invoiceFormBillTo.city} className={`${invoiceFormFieldErrors.includes('client_city') ? 'error' : ''} bold S`} id="client_city" name="city" />
                {invoiceFormFieldErrors.includes('client_city') && <p className='error XS red'>can't be empty</p>}
              </div>
              <div className='input'>
                <label className={`${invoiceFormFieldErrors.includes('client_post_code') ? 'red' : 'true-lavender'} S`} htmlFor='post_code'>Post Code</label>
                <input onChange={(e) => onChangeInvoiceFormBillTo(e.target.name, e.target.value)} value={invoiceFormBillTo.post_code} className={`${invoiceFormFieldErrors.includes('client_post_code') ? 'error' : ''} bold S`} id="client_post_code" name="post_code" />
                {invoiceFormFieldErrors.includes('client_post_code') && <p className='error XS red'>can't be empty</p>}
              </div>
              <div className='input'>
                <label className={`${invoiceFormFieldErrors.includes('client_country') ? 'red' : 'true-lavender'} S`} htmlFor='country'>Country</label>
                <input onChange={(e) => onChangeInvoiceFormBillTo(e.target.name, e.target.value)} value={invoiceFormBillTo.country} className={`${invoiceFormFieldErrors.includes('client_country') ? 'error' : ''} bold S`} id="client_country" name="country" />
                {invoiceFormFieldErrors.includes('client_country') && <p className='error XS red'>can't be empty</p>}
              </div>
            </div>
            <div className='input-date'>
              <div className='input'>
                <p className={`${invoiceFormFieldErrors.includes('client_invoice_date') ? 'red' : 'true-lavender'} S`}>Invoice Date</p>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={invoiceFormBillTo.invoice_date}
                    onChange={(newValue) => {
                      onChangeInvoiceFormBillTo('invoice_date', newValue);
                    }}
                    className={`${invoiceFormFieldErrors.includes('client_invoice_date') ? 'error' : ''}`}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {invoiceFormFieldErrors.includes('client_invoice_date') && <p className='error XS red'>can't be empty</p>}
              </div>
              <div className='input'>
                <p className='true-lavender S'>Payment Terms</p>
                <CustomSelect value={invoiceFormBillTo.payment_terms} onChange={(e, newValue) => onChangeInvoiceFormBillTo('payment_terms', newValue)}>
                  <StyledOption value={'Net 1 Day'}>Net 1 Day</StyledOption>
                  <StyledOption value={'Net 7 Days'}>Net 7 Days</StyledOption>
                  <StyledOption value={'Net 14 Days'}>Net 14 Days</StyledOption>
                  <StyledOption value={'Net 30 Days'}>Net 30 Days</StyledOption>
                </CustomSelect>
              </div>

            </div>
            <div className='input fullwidth'>
              <label className={`${invoiceFormFieldErrors.includes('client_project_description') ? 'red' : 'true-lavender'} S`} htmlFor='project_description'>Project Description</label>
              <input onChange={(e) => onChangeInvoiceFormBillFrom(e.target.name, e.target.value)} value={invoiceFormBillTo.project_description} className={`${invoiceFormFieldErrors.includes('client_project_description') ? 'error' : ''} bold S`} id="client_project_description" name="project_description" />
              {invoiceFormFieldErrors.includes('client_project_description') && <p className='error XS red'>can't be empty</p>}
            </div>
          </div>
          <div className='InvoiceForm-items'>
            <p className='M grey bold'>Item List</p>
            <div className='info'>
              <p className='true-lavender S'>Item Name</p>
              <p className='true-lavender S'>Qty.</p>
              <p className='true-lavender S'>Price</p>
              <p className='true-lavender S'>Total</p>
            </div>
            <div className='items'>
              {
                invoiceFormItemList.map((item) => {
                  return (
                    <div key={item.id} className='item'>
                      <input onChange={(e) => onChangeInvoiceFormItemList(item.id, e.target.name, e.target.value)} name='name' value={item.name} className={`${invoiceFormFieldErrors.includes('empty_fields_item') && item.emptyFields.includes('name') ? 'error' : ''} bold S`} />
                      <input onChange={(e) => onChangeInvoiceFormItemList(item.id, e.target.name, e.target.value)} name='quantity' value={item.quantity} className={`${invoiceFormFieldErrors.includes('empty_fields_item') && item.emptyFields.includes('quantity') ? 'error' : ''} bold S`} />
                      <input onChange={(e) => onChangeInvoiceFormItemList(item.id, e.target.name, e.target.value)} name='price' value={item.price} className={`${invoiceFormFieldErrors.includes('empty_fields_item') && item.emptyFields.includes('price') ? 'error' : ''} bold S`} />
                      <p className='bold S grey'>{getTotalPrice(item.quantity, item.price)}</p>
                      <Image onClick={() => deleteInvoiceFormItem(item.id)} onMouseOut={() => setIconDeleteHovering(0)} onMouseEnter={() => setIconDeleteHovering(item.id)} src={iconDeleteHovering === item.id ? iconDeleteHover : iconDelete} alt="icon delete" />
                    </div>
                  )
                })
              }
            </div>
            <button onClick={() => addInvoiceFormItem()} className={`${invoiceFormFieldErrors.includes('no_item') && invoiceFormItemList.length === 0 ? 'error red' : 'violet'} button6 S bold`}>+ Add New Item</button>
          </div>
        </div>
        <div className='InvoiceForm-buttons'>
          {invoiceForm.mode === 'Creating' && (
            <>
              <button onClick={() => cleanInvoiceForm({ ...invoiceForm, open: false })} className='button3 discard-button true-lavender'>Discard</button>
              <button className='button4 grey'>Save as Draft</button>
              <button onClick={() => {
                const checkIsOk = checkFormErrors();
                if (checkIsOk) {
                  createInvoice('pending');
                }
              }} className='button2'>Save & Send</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default InvoiceForm