import React, { useState, useEffect } from 'react';
import uniqueId from 'uniqueid';
import './Overview.css';
import './Form.css';

// ? Firebase imports
import { db } from '../firebase-config';
import { collection, addDoc, getDocs, updateDoc, doc} from 'firebase/firestore';

export default function Overview() {

  //#region Firebase

    const [ data, setData ] = useState([]); // database react state
    const dataCollectionRef = collection(db, "uniformen"); // referencing the whole document
    console.log(data);

    // ? Fetch database from Firebase
    useEffect(() =>{
      const data = async () => {
        const fetchedData = await getDocs(dataCollectionRef);
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), firstName: doc.firstName })));
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), lastName: doc.lastName })));
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), position: doc.ffposition })));
      };
      data(); // ! Automate it ()
    }, []);



    // Create new member

    const [ newFirstName, setNewFirstName ] = useState("");
    const [ newLastName, setNewLastName ] = useState("");
    const [ newPosition, setNewPosition ] = useState("");

    const createMember = async () => {
      await addDoc(dataCollectionRef, { id: data.length + 1, firstName: newFirstName, lastName: newLastName, ffposition: newPosition });
    };


    function handleChange (event) {
      event.preventDefault();  

      const dataMemberIndex = event.target.id - 1;
      const memberKey = event.target.name;
      const newValue = event.target.value;
      const memperUpdate = data[dataMemberIndex];
      memperUpdate[memberKey] = newValue;
    
      let newData = [];
      const oldData = data;
      for(let i = 0; i < data.length; i++){
        newData.push(oldData[i]);
      };
      newData[dataMemberIndex] = memperUpdate;
      setData(newData);
      
     };

     function handleUpdate (event) {
      event.preventDefault();
    };


  //#endregion


//#region Buttons for field manipulations (New, Save, Update)

function handleNew (event) {
  event.preventDefault();
};



//#endregion



    return (
    <div className="Overview">
        <h1 className="ov-main-title">Feuerwehr-Uniform-Datenbank</h1>

        <div className='mainBtn'>
              <div className='newBtn-div'>
                  <button type='submit' name='newBtn' id={`new`}className='newBtn manBtn formFields' onClick={handleNew}>Neu anlegen</button> {/* TODO - new field should be at top */ }
                  <button type='submit' name='saveBtn' id={`save`}className='saveBtn manBtn formFields' onClick={createMember}>Neu speichern</button> 
              </div>
            <button type='submit' name='updateBtn' id={`update`}className='updateBtn manBtn formFields' onClick={handleUpdate}>Daten speichern</button> 
        </div>

        <div className='newMember-div'>
          <input type='number' name='newID' className='inp-ID newID formFields' value={data.length +1}></input>
          <input type='text' placeholder='Vorname' name='vorname' className='inp-FN formFields' onChange={(event) => {setNewFirstName(event.target.value)}} />
          <input type='text' placeholder='Nachname' name='vorname' className='inp-LN formFields' onChange={(event) => {setNewLastName(event.target.value)}} />
          <input type='text' placeholder='Position' name='vorname' className='inp-PO formFields' onChange={(event) => {setNewPosition(event.target.value)}} />        
        </div>

        <div className="form-div">
        { data.map(member =>
            <form name='dataForm' className='data-form'>
                  <input type='number' key={uniqueId()} name='id' id={`${member.id}`}  className='inp-ID passedDataIDfield formFields' value={member.id} readOnly  />
                  <input type='text' key={uniqueId()} name='firstName' id={`${member.id}`}  className='inp-FN formFields' value={member.firstName} onChange={handleChange} />
                  <input type='text' key={uniqueId()} name='lastName' id={`${member.id}`}  className='inp-LN formFields' value={member.lastName} onChange={handleChange}  /> 
                  <input type='text' key={uniqueId()} name='position' id={`${member.id}`} className='inp-PO formFields' value={member.ffposition} onChange={handleChange} />
            </form>
        )}
        </div>

    </div>
  );
};