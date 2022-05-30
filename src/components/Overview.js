import React, { useState } from 'react';
import './Overview.css';
import Form from './Form';

export default function Overview() {

  const [ formData, setFormData ] =  useState(
    [
      {
        id: 1, firstName: 'Thomas', lastName: 'Raming', position: 'General',
     },
    ]
    );

    function handleChange (event) {
        event.preventDefault();
              let newArray = [];
              for(let x = 0; x < formData.length; x++){
                // push old array elements in new array  
                newArray.push(formData[x]);
              };
                // change changed element
                newArray[event.target.id[0] - 1][event.target.name] = event.target.value;
                setFormData(newArray);
    };

        function handleNew (event) {
        event.preventDefault();
              let newArray = [];
              for(let x = 0; x < formData.length; x++){
                // push old array elements in new array  
                newArray.push(formData[x]);
              };
                // create new empty element
                let newElement =       {
                  id: newArray.length + 1, firstName: '', lastName: '', position: '',
               };
               newArray.push(newElement);
              setFormData(newArray);
        };

    return (
    <div className="Overview">
        <h1 className="ov-main-title">Feuerwehr-Uniform-Datenbank</h1>

        <div className='mainBtn'>
            <button type='submit' name='new' id={`new`}className='newBtn formFields' onClick={handleNew}>new</button>
        </div>

        { formData.map(e =>
            <Form 
               key={e.id}  id={e.id} firstName={e.firstName} lastName={e.lastName}  position={e.position} handleChange={handleChange}
            />
        )}

    </div>
  );
};