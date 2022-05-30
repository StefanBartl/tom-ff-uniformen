import React from 'react';
import './Form.css';

export default function Form(props) {

  return (
      <div className="form-div">
          <form name='dataForm' className='data-form'>

              <div className='id-div label-input-div'>
                  <label htmlFor={`${props.id}inputID`} className='label-ID labels'>ID</label>
                      <input type='number' name='id' id={`${props.id}inputID`} num={props.id} className='inp-ID formFields' value={props.id} onChange={props.handleChange}  />
              </div>

              <div className='fn-div label-input-div'>
                  <label htmlFor={`${props.id}inputFN`}className='label-FN labels'>Vorname</label>  
                      <input type='text' name='firstName' id={`${props.id}inputFN`} num={props.id} className='inp-FN formFields' value={props.firstName} onChange={props.handleChange} />              
              </div>

              <div className='ln-div label-input-div'>
                  <label htmlFor={`${props.id}inputLN`}className='label-LN labels'>Nachname</label>
                      <input type='text' name='lastName' id={`${props.id}inputLN`} num={props.id} className='inp-LN formFields' value={props.lastName} onChange={props.handleChange}  />           
              </div>

              <div className='po-div label-input-div'>
                  <label htmlFor={`${props.id}inputPO`}  className='label-PO labels'>Dienstgrad</label>
                      <input type='text' name='position' id={`${props.id}inputPO`} num={props.id} className='inp-PO formFields' value={props.position} onChange={props.handleChange} />           
              </div>

          </form>
      </div>
  );
};