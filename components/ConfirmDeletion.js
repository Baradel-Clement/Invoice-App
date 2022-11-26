import React from 'react'
import toast from 'react-hot-toast';
import { useHomeStateContext } from '../context/Home';

const ConfirmDeletion = () => {
  const { confirmDeletion, setConfirmDeletion, setViewInvoiceMode, deleteInvoiceState } = useHomeStateContext();

  const deleteInvoice = async (invoiceId, displayId) => {
    let res = await fetch("api/invoice", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceId })
    })

    const invoiceDeleted = await res.json();
    console.log("Deletion successful", { invoiceDeleted });
    toast.success(`${displayId} has been deleted`);
    deleteInvoiceState(invoiceId);
    setViewInvoiceMode({ mode: false, invoiceId: '' });
    setConfirmDeletion({ open: false, invoiceId: '', displayId: '' });
  }

  return (
    <>
      <div onClick={() => setConfirmDeletion({ open: false, invoiceId: '', displayId: '' })} className='ConfirmDeletion-Mask' />
      <div className='ConfirmDeletion'>
        <p className='bold L'>Confirm Deletion</p>
        <p className='XS grey'>Are you sure you want to delete invoice {confirmDeletion.displayId}? This action cannot be undone.</p>
        <div>
          <button onClick={() => setConfirmDeletion({ open: false, invoiceId: '', displayId: '' })} className='button3 XS true-lavender'>Cancel</button>
          <button onClick={() => deleteInvoice(confirmDeletion.invoiceId, confirmDeletion.displayId)} className='button5 XS white'>Delete</button>
        </div>
      </div>
    </>
  )
}

export default ConfirmDeletion