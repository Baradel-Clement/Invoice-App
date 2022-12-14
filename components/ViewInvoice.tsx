import React, { useState } from 'react'
import { useHomeStateContext } from '../context/Home';
import { useInvoiceFormStateContext } from '../context/InvoiceForm';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import arrowLeft from '../public/assets/icon-arrow-left.svg'
import { formatInvoiceDate, getPaymentTermsDate } from '../utils/invoices';
import toast from 'react-hot-toast';
import { IInvoice } from '../types/home';

const ViewInvoice = () => {
  const { invoices, viewInvoiceMode, setViewInvoiceMode, setConfirmDeletion, setInvoices, setConfirmEmail } = useHomeStateContext();
  const { triggerEditingMode } = useInvoiceFormStateContext();
  const { data: session } = useSession();
  const invoice = invoices.find((el) => el.id === viewInvoiceMode.invoiceId);

  const markAsPaid = async (invoice: IInvoice) => {
    let body = {
      changeOnlyStatus: true,
      status: 'paid',
      id: invoice.id,
      userId: session?.user.id,
    }

    let res = await fetch("api/invoice", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    const invoiceMarkAsPaid = await res.json();

    const newInvoices: IInvoice[] = [];
    invoices.forEach((invoice) => {
      if (invoice.id === invoiceMarkAsPaid[0].id) {
        newInvoices.push(invoiceMarkAsPaid[0])
      }
      else newInvoices.push(invoice)
    }
    );
    toast.success(`${invoiceMarkAsPaid[0].displayId} has been paid`)
    setInvoices(newInvoices);
  }

  return (
    <>
      {
        invoice && (
          <div className='ViewInvoice'>
            <div className='ViewInvoice-back' onClick={() => setViewInvoiceMode({ mode: false, invoiceId: '' })}>
              <Image src={arrowLeft} alt="arrowLeft" />
              <p className='XS bold'>Go back</p>
            </div>
            <div className='View-Invoice-head'>
              <div>
                <p className='grey XS'>Status</p>
                <div className={`status ${invoice.status}`}>
                  <span />
                  <p className='bold XS'>{`${invoice.status.charAt(0).toUpperCase()}${invoice.status.slice(1)}`}</p>
                </div>
              </div>
              <div>
                <button onClick={() => triggerEditingMode(invoice)} className='button3 XS true-lavender'>Edit</button>
                <button onClick={() => setConfirmDeletion({ open: true, invoiceId: invoice.id, displayId: invoice.displayId })} className='button5 XS white'>Delete</button>
                {invoice.status !== 'paid' && <button onClick={() => markAsPaid(invoice)} className='button2 XS white'>Mark as Paid</button>}
                {invoice.status === 'pending' && <button onClick={() => setConfirmEmail({ open: true, invoice })} className='button2 XS white'>Send by email</button>}
              </div>
            </div>
            <div className='ViewInvoice-body'>
              <div className='head'>
                <div>
                  <p className='M bold'>{invoice.displayId}</p>
                  <p className='XS true-lavender'>{invoice.description}</p>
                </div>
                <div>
                  <p className='XXS true-lavender'>{invoice.personalStreetAdress}</p>
                  <p className='XXS true-lavender'>{invoice.personalCity}</p>
                  <p className='XXS true-lavender'>{invoice.personalPostCode}</p>
                  <p className='XXS true-lavender'>{invoice.personalCountry}</p>
                </div>
              </div>
              <div className='body'>
                <div>
                  <div>
                    <p className='XS true-lavender'>Invoice Date</p>
                    <p className='M bold'>{formatInvoiceDate(invoice.invoiceDate.toString().slice(0, 10))}</p>
                  </div>
                  <div>
                    <p className='XS true-lavender'>Payment Due</p>
                    <p className='M bold'>{getPaymentTermsDate(invoice.invoiceDate.toString().slice(0, 10), invoice.paymentTerms)}</p>
                  </div>
                </div>
                <div>
                  <p className='XS true-lavender'>Bill To</p>
                  <p className='M bold'>{invoice.clientName}</p>
                  <p className='XXS true-lavender'>{invoice.clientStreetAdress}</p>
                  <p className='XXS true-lavender'>{invoice.clientCity}</p>
                  <p className='XXS true-lavender'>{invoice.clientPostCode}</p>
                  <p className='XXS true-lavender'>{invoice.clientCountry}</p>
                </div>
                <div>
                  <p className='XS true-lavender'>Sent to</p>
                  <p className='M bold'>{invoice.clientEmail}</p>
                </div>
              </div>
              <div className='items'>
                <div className='head'>
                  <p className='XXS true-lavender'>Item Name</p>
                  <p className='XXS true-lavender'>QTY.</p>
                  <p className='XXS true-lavender'>Price</p>
                  <p className='XXS true-lavender'>Total</p>
                </div>
                <div className='items-wrap'>
                  {
                    invoice.items.map((item) => (
                      <div className='item' key={item.name}>
                        <p className='bold XS'>{item.name}</p>
                        <p className='bold XS true-lavender'>{item.quantity}</p>
                        <p className='bold XS true-lavender'>?? {item.price}</p>
                        <p className='bold XS'>?? {item.total}</p>
                      </div>
                    ))
                  }
                </div>
                <div className='total'>
                  <p className='white XXS'>Amount Due</p>
                  <p className='white bold L'>?? {invoice.total}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default ViewInvoice