import React from 'react';
import { useHomeStateContext } from '../context/Home';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const ConfirmEmail = () => {
  const { confirmEmail, setConfirmEmail } = useHomeStateContext();
  const { data: session } = useSession();
  const invoice = confirmEmail.invoice;

  const sendEmail = async () => {
    const body = JSON.stringify({
      emailTo: invoice.clientEmail,
      name: session.user.email,
      invoice,
    });

    fetch('/api/mail', {
      method: 'POST',
      body,
    })
    toast.success(`Invoice ${invoice.displayId} has been sent to ${invoice.clientEmail}`)
    setConfirmEmail({ open: false, invoice: {} })
  }

  return (
    <>
      <div onClick={() => setConfirmEmail({ open: false, invoiceId: '', displayId: '' })} className='ConfirmEmail-Mask' />
      <div className='ConfirmEmail'>
        <p className='bold L'>Confirm Email</p>
        <p className='XS grey'>Are you sure you want to send invoice {invoice.displayId} to <u>{invoice.clientEmail}</u>? This action cannot be undone.</p>
        <div>
          <button onClick={() => setConfirmEmail({ open: false, invoice: {} })} className='button3 XS true-lavender'>Cancel</button>
          <button onClick={() => sendEmail()} className='button2 XS white'>Send it</button>
        </div>
      </div>
    </>
  )
}

export default ConfirmEmail