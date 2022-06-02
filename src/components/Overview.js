// ? React and file import
import { useState, useEffect, Children } from "react";
import "./Overview.css";
import "./Form.css";

// ? Firebase imports
import { db } from "../firebase-config";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

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

    // Toggle div, newButton image direction & save button
    // Get DOM-Elements
    const newMemberBtn = document.getElementById('new'); 
    const saveBtn = document.getElementById('save');
    const newMemberID = document.getElementById('newID');
    const newMemberFN = document.getElementById('newFN');
    const newMemberLN = document.getElementById('newLN');
    const newMemberPO = document.getElementById('newPO');

    // Toggle logic
    if(saveBtn.style.display === 'none'){
      newMemberBtn.style.transform = 'rotate(90deg)';
      saveBtn.style.display = 'block'; 
      newMemberID.style.display = 'block';
      newMemberFN.style.display = 'block';
      newMemberLN.style.display = 'block';
      newMemberPO.style.display = 'block';
    } else {
      newMemberBtn.style.transform = 'rotate(0deg)';
      saveBtn.style.display = 'none';
      newMemberID.style.display = 'none'; 
      newMemberFN.style.display = 'none';
      newMemberLN.style.display = 'none';
      newMemberPO.style.display = 'none';
    };

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

          <div className="console">

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
                  style={{display: 'none'}}
                  >
                  speichern
              </button>

          </div>


          <div className="newMember-div">

              <p className="idVal formFields" id="newID"  style={{display: 'none'}}>{data.length || 0}.</p>

              <input
                type="text"
                placeholder="Vorname"
                name="vorname"
                id="newFN"
                className="inp-FN formFields"
                style={{display: 'none'}}
                onChange={(event) => {
                  setNewFirstName(event.target.value);
                }}
              />

              <input
                type="text"
                placeholder="Nachname"
                name="vorname"
                id="newLN"
                className="inp-LN formFields"
                style={{display: 'none'}}
                onChange={(event) => {
                  setNewLastName(event.target.value);
                }}
              />

              <input
                type="text"
                placeholder="Position"
                name="vorname"
                id="newPO"
                className="inp-PO formFields"
                style={{display: 'none'}}
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
                                            />

                                            <input
                                              type="button"
                                              name="deleteBtn"
                                              id={member.id}
                                              className="deleteBtn formFields"
                                              onClick={(event) => {
                                                handleDelete(member.id);
                                              }}
                                              defaultValue="löschen"
                                            />

                                  </form>

                            </div>
                      )))}

                  </div>

          </main>

    </div>
  );

};
