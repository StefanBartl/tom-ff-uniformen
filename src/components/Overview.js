import React, { useState, useEffect } from 'react';
import './Overview.css';
import './Form.css';

// ? Firebase imports
import { db } from '../firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function Overview() {



  //#region Firebase

    const [ data, setData ] = useState([]);
    const dataCollectionRef = collection(db, "uniformen");
    console.log(data);

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
        //       let newArray = [];
        //       for(let x = 0; x < formData.length; x++){
        //         // push old array elements in new array  
        //         newArray.push(formData[x]);
        //       };
        //         // change changed element
        //         newArray[event.target.id[0] - 1][event.target.name] = event.target.value;   // TODO - id must be changed to make over 9 fields possible
        //         setFormData(newArray);  
  };


  const updateMember = async(id, name) => {};
  

  //#endregion


//#region Buttons for field manipulations (New, Save, Update)

        function handleNew (event) {
        };

        function handleUpdate (event) {
          event.preventDefault();
        };

//#endregion

// <button type='submit' name='updateBtn' id={`update`}className='updateBtn manBtn formFields' onClick={handleUpdate}>update</button> 

    return (
    <div className="Overview">
        <h1 className="ov-main-title">Feuerwehr-Uniform-Datenbank</h1>

        <div className='mainBtn'>
            <button type='submit' name='newBtn' id={`new`}className='newBtn manBtn formFields' onClick={handleNew}>new</button> {/* TODO - new field should be at top */ }
            <button type='submit' name='saveBtn' id={`save`}className='saveBtn manBtn formFields' onClick={createMember}>save</button> 
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
                  <input type='number' name='id' id={`${member.id}inputID`}  className='inp-ID formFields' value={member.id} onChange={handleChange}  />
                  <input type='text' name='firstName' id={`${member.id}inputFN`}  className='inp-FN formFields' value={member.firstName} onChange={handleChange} />
                   <input type='text' name='lastName' id={`${member.id}inputLN`}  className='inp-LN formFields' value={member.lastName} onChange={handleChange}  /> 
                  <input type='text' name='position' id={`${member.id}inputPO`} className='inp-PO formFields' value={member.ffposition} onChange={handleChange} />
            </form>
        )}
        </div>


    </div>
  );
};