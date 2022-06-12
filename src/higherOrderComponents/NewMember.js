// ? CSS, React and function imports
import '../styles/MainSection.css';
import '../styles/NewMember.css'
import { useState } from 'react';
import firestoreUIEffect from '../components/FirestoreUIEffect';

// ? Firebasefirestore  imports
import { db } from '../firebase-config';
import {
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';

export default function NewMember(props){

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
      doc(dataCollectionRef,  `${props.data.length + 1}`),
      {
        id: props.data.length + 1,
        firstName: newFirstName,
        lastName: newLastName,
        ffposition: newPosition,
        textarea: '',
        mantelS: '',
        mantelB: false,
        jackeS: '',
        jackeB: false,
        hoseS: '',
        hoseB: false,
        hemdS: '',
        hemdB: false,
        kappeS: '',
        kappeB: false,

        pulloverS: '',
        pulloverB: false,
        hose2S: '',
        hose2B: false,
        tshirtS: '',
        tshirtB: false,
        poloS: '',
        poloB: false,
        bluseS: '',
        bluseB: false,
        fleeceS: '',
        fleeceB: false,

        schutzjackeS: '',
        schutzjackeB: false,
        schutzhoseS: '',
        schutzhoseB: false,
        einsatzstiefelschwarzS: '',
        einsatzstiefelschwarzB: false,
        einsatzstiefelgelbS: '',
        einsatzstiefelgelbB: false,
        einsatzhandschuheS: '',
        einsatzhandschuheB: false,
        kappe3S: '',
        kappe3B: false,
        haubeS: '',
        haubeB: false,
        helmS: '',
        helmB: false,
        gurtS: '',
        gurtB: false,
      }
    );

    firestoreUIEffect('save', props.data.length);
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