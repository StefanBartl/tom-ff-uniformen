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

  
return (

    <div className='newMember-div displayNone' style={{transform: 'scale(0)'}} >


                    <input
                    type='text'
                    placeholder='Vorname'
                    name='vorname'
                    id='new-firstName'
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
                    onChange={(event) => {
                        setNewPosition(event.target.value);
                    }}
                    required
                    />

                <button
                    name='saveBtn'
                    id={`save`}
                    onClick={handleSaveNewFirestoreMember}
                    title='Klicke um die/den neue:n Kamerad:in anzulegen!'
                    >
                    speichern
                    </button>
    
    </div>

);

};