import { useState, useEffect, Children } from "react";
import "./Overview.css";
import "./Form.css";

// ? Firebase imports
import { db } from "../firebase-config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


export default function Overview() {

  //#region Firebase firestore

  // ? [....States]
  const [data, setData] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPosition, setNewPosition] = useState("");

  // ? Fetch database from Firebase
  useEffect(() => {
    const dataCollectionRef = collection(db, "uniformen");
    const getData = async function fetchingData() {
      const fetchedData = await getDocs(dataCollectionRef);
      setData(fetchedData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setData(
        fetchedData.docs.map((doc) => ({
          ...doc.data(),
          firstName: doc.firstName,
        }))
      );
      setData(
        fetchedData.docs.map((doc) => ({
          ...doc.data(),
          lastName: doc.lastName,
        }))
      );
      setData(
        fetchedData.docs.map((doc) => ({
          ...doc.data(),
          ffposition: doc.ffposition,
        }))
      );
      setData(
        fetchedData.docs.map((doc) => ({ ...doc.data(), nullentry: null }))
      );
    };
    getData();
  }, []);

  // ? Create new form to add a new member
  function toggleNewMemberDiv(event) {
    event.preventDefault();

    // Toggle div
    const newMemberForm = document.querySelector('.newMember-div');
    newMemberForm.style.visibility === 'hidden' ?  newMemberForm.style.visibility = 'visible' : newMemberForm.style.visibility = 'hidden'; 

    // Toggle newButton image direction
    const newMemberBtn = document.getElementById('new'); 
    newMemberForm.style.visibility === 'hidden' ?  newMemberBtn.style.transform = 'rotate(0deg)' : newMemberBtn.style.transform = 'rotate(90deg)';
    
    // Toggle save button
    const saveBtn = document.querySelector('.saveBtn');
    newMemberForm.style.visibility === 'hidden' ?  saveBtn.style.visibility = 'hidden' : saveBtn.style.visibility = 'visible'; 

  };

  // ? Add a new member to the firestore database
  const saveNewMember = async () => {
    
    // Store new member in firestore database
    const dataCollectionRef = collection(db, "uniformen");
    await setDoc(doc(dataCollectionRef, `${data.length || 0}`), {
      id: Number(data.length),
      firstName: newFirstName,
      lastName: newLastName,
      ffposition: newPosition,
    });

    // // Set new state
    // const newData = [];
    // const newMember = {
    //   id: Number(data.length),
    //   firstName: newFirstName,
    //   lastName: newLastName,
    //   ffposition: newPosition,
    // }
    // // Make input fields free of old data
    // setNewFirstName("");
    // setNewLastName("");
    // setNewPosition(""); 

    // // Pushh all existing members in new array
    // for (let i = 0; i < data.length; i++) {
    //   newData.push(data[i]);
    // };
    // // Add new member to array
    // newData.push(newMember);
    // // Set new data state
    // setData(newData);

    window.location.reload();

  };

  // ? Handle state of member
  function handleChange(event) {

    // Update member in state
    const newData = [];
    const updatingMember = data[parseInt(event.target.id)];
    updatingMember[event.target.name] = event.target.value;

    for (let i = 0; i < data.length; i++) {
      newData.push(data[i]);
      if (i === event.target.id) {
        newData[i] = updatingMember;
      }
    }

    setData(newData);

  };

  // ? Update a member in the firestore database
  const handleUpdate = async (id) => {

    // Update member in firestore database
    const updatingData = data[id];
    const updatingMember = doc(db, "uniformen", `${id}`);
    await updateDoc(updatingMember, updatingData);
    
    // UI-Effect
    const memberUpdateBtn = document.querySelector(`.update-${id}`); // get the correct btn element 
    const updateUIEffect = [
      { backgroundColor: 'white', color: 'black'},
      { backgroundColor: 'green', color: 'white'},
      { backgroundColor: 'white', color: 'black'}
    ];
    const updateUIEffectTiming = {
      duration: 2000,
      iterations: 1,
    };    
    memberUpdateBtn.animate(updateUIEffect, updateUIEffectTiming, {easing: "ease-in-out"});

    window.location.reload();

  };

  // ? Delete a memberr in the firestore database
  const handleDelete = async (id) => {

    // Delete member in firestore database
    const docId = `${id}`;
    await deleteDoc(doc(db, "uniformen", docId));

    // // Delete member in state
    // const newData = [];
    // for (let i = 0; i < data.length; i++) {
    //   if (i === id) {continue} else newData.push(data[i]);
    // };
    // setData(newData);
    window.location.reload();

  };

  //#endregion

  return (
    <div className="Overview">

      <h1 className="ov-main-title">FF Kaltenleutgeb Uniformen-Datenbank</h1>

      <div className="mainBtn">

          <img 
              src="https://drive.google.com/uc?export=download&id=1u2Eib4hTRffN1aaTLscKze-L6dLN0RKl"  
              name="newBtn"
              id={`new`}
              className="newBtn imageNewBtn"
              onClick={toggleNewMemberDiv}
          />

          <button
              name="saveBtn"
              id={`save`}
              className="saveBtn manBtn formFields"
              onClick={saveNewMember}
              style={{visibility: 'hidden'}}
              >
              speichern
          </button>

      </div>


      <div className="newMember-div" style={{visibility: 'hidden'}}>

          <p className="idVal formFields">{data.length || 0}.</p>

          <input
            type="text"
            placeholder="Vorname"
            name="vorname"
            className="inp-FN formFields"
            onChange={(event) => {
              setNewFirstName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Nachname"
            name="vorname"
            className="inp-LN formFields"
            onChange={(event) => {
              setNewLastName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Position"
            name="vorname"
            className="inp-PO formFields"
            onChange={(event) => {
              setNewPosition(event.target.value);
            }}
          />

      </div>
      
      <main className="data-wrapper">

      <div className="label-form">
              <h3 className="label-ID">Nr.</h3><h3 className="label-FN">Vorname</h3><h3 className="label-LN">Nachname</h3><h3 className="label-PO">Dienstgrad</h3>
      </div>

      <div className="form-div">
        {Children.toArray(
          data.map((member, index) => (
            <div className="form-memberDiv">
              <form name="dataForm" className="data-form">
                <p className="idVal formFields">{index}.</p>
                <input
                  type="text"
                  name="firstName"
                  id={member.id}
                  className="inp-FN formFields"
                  value={member.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  id={member.id}
                  className="inp-LN formFields"
                  value={member.lastName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="ffposition"
                  id={member.id}
                  className="inp-PO formFields"
                  value={member.ffposition}
                  onChange={handleChange}
                />
                <input
                  type="button"
                  name="updateBtn"
                  id={member.id}
                  className={`updateBtn update-${member.id} formFields`}
                  onClick={(event) => {
                    handleUpdate(member.id);
                  }}
                  defaultValue="update"
                ></input>
                <input
                  type="button"
                  name="deleteBtn"
                  id={member.id}
                  className="deleteBtn formFields"
                  onClick={(event) => {
                    handleDelete(member.id);
                  }}
                  defaultValue="löschen"
                ></input>
              </form>
            </div>
          ))
        )}
      </div>
      </main>

    </div>
  );
};
