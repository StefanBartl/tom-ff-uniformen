import React from 'react';
import './Form.css';

export default function Form(props) {
  return (
    <div className="form-div">
        <form name='dataForm' className='data-form'>

            <div className='id-div label-input-div'>
                <label htmlFor='id' className='label-ID labels'>ID</label>
                    <input type='number' name='id' id='inputID' className='inp-ID formFields'  />
            </div>

            <div className='fn-div label-input-div'>
                <label htmlFor='firstName' className='label-FN labels'>Vorname</label>  
                    <input type='text' name='firstName' id='inputFN' className='inp-FN formFields' />              
            </div>

            <div className='ln-div label-input-div'>
                <label htmlFor='lastName' className='label-LN labels'>Nachname</label>
                    <input type='text' name='lastName' id='inputLN' className='inp-LN formFields'  />           
            </div>

            <div className='po-div label-input-div'>
                <label htmlFor='position' className='label-PO labels'>Dienstgrad</label>
                    <input type='text' name='position' id='inputPO' className='inp-PO formFields'  />           
            </div>

        </form>
    </div>
  );
};