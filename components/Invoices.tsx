import React from 'react';
import Image from 'next/image';
import { useHomeStateContext } from '../context/Home';
import noInvoiceImg from '../public/assets/illustration-empty.svg';
import arrowRight from '../public/assets/icon-arrow-right.svg';
import { formatInvoiceDate } from '../utils/invoices';

const Invoices = () => {
  const { invoices, statusFilterValue, setViewInvoiceMode } = useHomeStateContext();
  return (
    <div className='Invoices'>
      {
        invoices.length === 0 && (
          <div className='no-invoices'>
            <Image src={noInvoiceImg} alt='No invoice illu' />
            <p className='bold L'>There is nothing here</p>
            <p className='XS grey'>Create an invoice by clicking the <br /><span className='bold XS grey'>New Invoice</span> button and get started</p>
          </div>
        )
      }
      {
        invoices.length !== 0 && (
          <div className='Invoices-wrap'>
            {
              invoices.map((invoice) => {
                if (statusFilterValue.includes(`${invoice.status.charAt(0).toUpperCase()}${invoice.status.slice(1)}`)) {
                  return (
                    <div key={invoice.id} className='Invoice' onClick={() => setViewInvoiceMode({mode: true, invoiceId: invoice.id})}>
                      <p className='bold XS'>{invoice.displayId}</p>
                      <p className='grey XS'>Due {formatInvoiceDate(invoice.invoiceDate.toString().slice(0, 10))}</p>
                      <p className='grey XS'>{invoice.clientName}</p>
                      <p className='bold M'>£ {invoice.total}</p>
                      <div className={`status ${invoice.status}`}>
                        <span />
                        <p className='bold XS'>{`${invoice.status.charAt(0).toUpperCase()}${invoice.status.slice(1)}`}</p>
                      </div>
                      <Image src={arrowRight} alt='arrow' />
                    </div>
                  )
                }
                return null;
              }
              )}
          </div>
        )
      }
    </div>
  )
}

export default Invoices