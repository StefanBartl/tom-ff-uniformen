import React from 'react';
import './Overview.css';
import Form from './Form';

export default function Overview() {
  return (
    <div className="Overview">
        <h1 className="ov-main-title">Feuerwehr-Uniform-Datenbank</h1>
        <Form 
            id={1} firstName={'Thomas'} lastName={'Raming'} position={'General'} 

        />
    </div>
  );
};