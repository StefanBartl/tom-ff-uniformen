// ? CSS, React and function imports
import '../styles/FirestoreDataForm.css';
import { useState } from 'react';
import firestoreUIEffect from '../components/FirestoreUIEffect';
import toggle90degAnimation from '../components/Toggle90Animation';

// ? Firebasefirestore  imports
import { db } from '../firebase-config';
import {
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';

export default function ToggleNewMember(props){

  //  tracking state for add a new member input fields
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPosition, setNewPosition] = useState('');


  // ? Add a new member to the firestore database
  const handleSaveNewFirestoreMember = async () => {
    if (newFirstName === '' || newLastName === '' || newPosition === '') {
      alert('Bitte gib Vorname, Nachname und Dienstgrad ein!');
      return;
    }

    // Store new member in firestore database
    const dataCollectionRef = collection(db, 'uniformen');
    await setDoc(
      doc(dataCollectionRef, `${props.data[props.data.length - 1].id + 1 || 0}`),
      {
        id: Number(props.data[props.data.length - 1].id + 1 || 0),
        firstName: newFirstName,
        lastName: newLastName,
        ffposition: newPosition,
      }
    );

    firestoreUIEffect('save', props.data[props.data.length - 1].id + 1 || 0);
  };

    // ? Create new form to add a new member
    function toggleNewMemberDiv(event) {
        event.preventDefault();
    
        // Toggle div, newButton image direction & save button
        // Get DOM-Elements
        const newMemberBtn = document.getElementById('new');
        const saveBtn = document.getElementById('save');
        const newMemberFN = document.getElementById('new-firstName');
        const newMemberLN = document.getElementById('new-lastName');
        const newMemberPO = document.getElementById('new-position');
    
        // Toggle UI logic
        if (saveBtn.classList.contains('displayNone')) {
          toggle90degAnimation(newMemberBtn);
          newMemberBtn.title = 'Neu anlegen zuklappen';
          saveBtn.classList.remove('displayNone');
          newMemberFN.classList.remove('displayNone');
          newMemberLN.classList.remove('displayNone');
          newMemberPO.classList.remove('displayNone');
        } else {
          toggle90degAnimation(newMemberBtn);
          newMemberBtn.title = 'Klicke um eine:n neue:n Kamerad:in anzulegen!';
          saveBtn.classList.add('displayNone');
          newMemberFN.classList.add('displayNone');
          newMemberLN.classList.add('displayNone');
          newMemberPO.classList.add('displayNone');
        }
      }
  
return (

    <div className='newMember-div' style={{transform: 'scale(0)'}} >

                    <img
                    src='https://drive.google.com/uc?export=download&id=1u2Eib4hTRffN1aaTLscKze-L6dLN0RKl'
                    name='newBtn'
                    id={`new`}
                    alt='Arrow'
                    title={`Klicke um eine:n neue:n Kamerad:in anzulegen 
                    ©: deemakdaksina - https://www.flaticon.com/authors/deemakdaksina `}
                    onClick={toggleNewMemberDiv}
                    />


                    <input
                    type='text'
                    placeholder='Vorname'
                    name='vorname'
                    id='new-firstName'
                    className='displayNone'
                    onChange={(event) => {
                        setNewFirstName(event.target.value);
                    }}
                    required
                    />

                    <input
                    type='text'
                    placeholder='Nachname'
                    name='vorname'
                    id='new-lastName'
                    className='displayNone'
                    onChange={(event) => {
                        setNewLastName(event.target.value);
                    }}
                    required
                    />

                    <input
                    type='text'
                    placeholder='Dienstgrad'
                    name='vorname'
                    id='new-position'
                    className='displayNone'
                    onChange={(event) => {
                        setNewPosition(event.target.value);
                    }}
                    required
                    />

                <button
                    name='saveBtn'
                    id={`save`}
                    className='displayNone'
                    onClick={handleSaveNewFirestoreMember}
                    title='Klicke um die/den neue:n Kamerad:in anzulegen!'
                    >
                    speichern
                    </button>
    
    </div>

);

};