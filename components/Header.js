import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import arrowDown from '../public/assets/icon-arrow-down.svg';
import plus from '../public/assets/icon-plus.svg';
import { useStateContext } from '../context/StateContext';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Header = () => {
  const { data: session } = useSession();
  const { statusFilter, setStatusFilter, statusFilterValue, onChangeStatusFilterValue } = useStateContext();

  return (
    <div className='Header'>
      <div className='Header-left'>
        <h2 className='XXL bold'>Invoices</h2>
        <p className='true-lavender S'>Hi {session.user.name}, you have 7 total invoices</p>
      </div>
      <div className='Header-filter'>
        <div className='trigger closeModalStatusFilterOff' onClick={() => setStatusFilter(!statusFilter)}>
          <p className='M'>Filter by status</p>
          <Image className={`${statusFilter ? 'reverse' : ''}`} src={arrowDown} alt='arrow' />
        </div>
        {
          statusFilter && (
            <div className='form closeModalStatusFilterOff'>
              <FormControlLabel control={
                <Checkbox
                  checked={statusFilterValue.includes('Draft')}
                  onChange={(e) => onChangeStatusFilterValue(e.target.name)}
                  name='Draft'
                  sx={{
                    color: '#7C5DFA',
                    '&.Mui-checked': {
                      color: '#7C5DFA',
                    },
                  }} />} label="Draft" />
              <FormControlLabel control={
                <Checkbox
                  checked={statusFilterValue.includes('Pending')}
                  onChange={(e) => onChangeStatusFilterValue(e.target.name)}
                  name='Pending'
                  sx={{
                    color: '#7C5DFA',
                    '&.Mui-checked': {
                      color: '#7C5DFA',
                    },
                  }} />} label="Pending" />
              <FormControlLabel sx={{ '&.MuiFormControlLabel-label': { fontSize: '25px !important' } }} control={
                <Checkbox
                  checked={statusFilterValue.includes('Paid')}
                  onChange={(e) => onChangeStatusFilterValue(e.target.name)}
                  name='Paid'
                  sx={{
                    color: '#7C5DFA',
                    '&.Mui-checked': {
                      color: '#7C5DFA',
                    },
                  }} />} label="Paid" />
            </div>
          )
        }

      </div>
      <button type="button" className='button button1'>
        <span />
        <Image src={plus} alt="plus" />
        <p className='bold S'>New Invoice</p>
      </button>
    </div>
  )
}

export default Header