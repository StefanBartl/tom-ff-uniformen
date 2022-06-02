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

  const [data, setData] = useState([]);
  // console.log(data);

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

  // ? Create new Member and add him/her in the database
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPosition, setNewPosition] = useState("");

  // ? Create new form to add a new member
  function createNewMember(event) {
    event.preventDefault();
    const newMemberForm = document.querySelector('.newMember-div');
    newMemberForm.style.visibility === 'hidden' ?  newMemberForm.style.visibility = 'visible' : newMemberForm.style.visibility = 'hidden';  

  }

  // ? Add a new member to he database
  const saveNewMember = async () => {
    const dataCollectionRef = collection(db, "uniformen");
    await setDoc(doc(dataCollectionRef, `${data.length}`), {
      id: Number(data.length),
      firstName: newFirstName,
      lastName: newLastName,
      ffposition: newPosition,
    });
  };

  // ? Handle state of data
  function handleChange(event) {
    const newData = [];
    const upObj = data[parseInt(event.target.id)];
    upObj[event.target.name] = event.target.value;
    console.log(upObj);
    for (let i = 0; i < data.length; i++) {
      newData.push(data[i]);
      if (i === event.target.id) {
        newData[i] = upObj;
      }
    }
    setData(newData);
  };

  // ? Update a member
  const handleUpdate = async (id) => {
    // Update member in firestore
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
  };

  // ? Delete a member
  const handleDelete = async (id) => {

    // Delete member in database
    const docId = `${id}`;
    await deleteDoc(doc(db, "uniformen", docId));

    // Delete member in state
    const newData = [];
    const upObj = data[parseInt(id)];
    for (let i = 0; i < data.length; i++) {
      if (i === id) {continue} else newData.push(data[i]);
    };
    setData(newData);
  };

  //#endregion

  return (
    <div className="Overview">
      <h1 className="ov-main-title">Feuerwehr-Uniform-Datenbank</h1>

      <div className="mainBtn">
        <div className="newBtn-div">
          <button
            name="newBtn"
            id={`new`}
            className="newBtn manBtn formFields"
            onClick={createNewMember}
          >
            Neu anlegen
          </button>{" "}
        </div>
        {/* <button type='submit' name='updateBtn' id={`update`}className='updateBtn manBtn formFields' onClick={handleUpdate}>Daten speichern</button>  */}
      </div>

      <div className="newMember-div" style={{visibility: 'hidden'}}>
        <p className="idVal formFields">{data.length}</p>
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
        <button
            name="saveBtn"
            id={`save`}
            className="saveBtn manBtn formFields"
            onClick={saveNewMember}
            >
            speichern
        </button>
      </div>

      <div className="form-div">
        {Children.toArray(
          data.map((member) => (
            <div className="form-memberDiv">
              <form name="dataForm" className="data-form">
                <p className="idVal formFields">{member.id}</p>
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
    </div>
  );
}
