import React, { useState } from 'react';
import './Overview.css';
import Form from './Form';

export default function Overview() {

  const [ formData, setFormData ] =  useState(
    [
      {
        id: 1, '1inputFN': 'Thomas','1inputLN': 'Raming', '1inputPO': 'General',
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
                newArray[event.target.id[0] - 1][event.target.id] = event.target.value;
                setFormData(newArray);
    };

    return (
    <div className="Overview">
        <h1 className="ov-main-title">Feuerwehr-Uniform-Datenbank</h1>
        { formData.map(e =>
            <Form 
               key={e.id}  id={e.id} firstName={e[`${e.id}inputFN`]} lastName={e[`${e.id}inputLN`]}  position={e[`${e.id}inputPO`]} handleChange={handleChange}
            />
        )}

    </div>
  );
};