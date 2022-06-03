// TODO Toggle Animation without css

// ? React and file imports
import { useState, useEffect, Children } from "react";
import "./Overview.css";
import "./Form.css";
import toggle90degAnimation from './Toggle90Animation';

// ? Firebase imports
import { db } from "../firebase-config";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default function Overview() {

  const options = [
    { value: true, label: 'Ja' },
    { value: false, label: 'Nein' }
  ]


  //#region Firebase firestore

  // ? [....States]
  const [data, setData] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newTextarea, setNewTextarea] = useState("");
  // Galauniformen state
  const [newMantelS, setNewMantelS] = useState(0);
  const [newMantelB, setNewMantelB] = useState(true);
  const [newJackeS, setNewJackeN] = useState(0);
  const [newJackeB, setNewJackeB] = useState(true);
  const [newHoseS, setNewHoseS] = useState(0);
  const [newHoseB, setNewHoseB] = useState(true);
  const [newHemdS, setNewHemdS] = useState(0);
  const [newHemdB, setNewHemdB] = useState(true);
  const [newKappeS, setNewKappeS] = useState(0);
  const [newKappeB, setNewKappeB] = useState(true);



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
        fetchedData.docs.map((doc) => ({
          ...doc.data(),
          textarea: doc.textarea,
        }))
      );
      setData(
        fetchedData.docs.map((doc) => ({
          ...doc.data(),
          mantelN: doc.mantelN,
        }))
      );
      setData(
        fetchedData.docs.map((doc) => ({
          ...doc.data(),
          mantelB: doc.mantelB,
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

    // Toggle UI logic
    if(saveBtn.style.display === 'none'){
      toggle90degAnimation(newMemberBtn);
      saveBtn.style.display = 'block'; 
      newMemberID.style.display = 'block';
      newMemberFN.style.display = 'block';
      newMemberLN.style.display = 'block';
      newMemberPO.style.display = 'block';
    } else {
      toggle90degAnimation(newMemberBtn);
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
      textarea: newTextarea,

      mantelS: newMantelS,
      mantelB: newMantelB,
      jackeS: newJackeS,
      jackeB: newJackeB,
      hoseS: newHoseS,
      hoseB: newHoseB,
      hemdS: newHemdS,
      hemdB: newHemdB,
      kappeS: newKappeS,
      kappeB: newKappeB,

    });

    window.location.reload();

  };

  // ? Handle state of member
  function handleChange(event) {

    // Update member in state
    const newData = [];
    const updatingMember = data[parseInt(event.target.id)];


    //#region Galauniformen boolean
    if(event.target.name === "mantelB") {setNewMantelB(!newMantelB);
    updatingMember[event.target.name] = newMantelB;
    };

    if(event.target.name === "JackeB") {setNewJackeB(!newJackeB);
    updatingMember[event.target.name] = newJackeB;
    };

    if(event.target.name === "HoseB") {setNewHoseB(!newHoseB);
    updatingMember[event.target.name] = newHoseB;
    };

    if(event.target.name === "HemdB") {setNewHemdB(!newHemdB);
    updatingMember[event.target.name] = newHemdB;
    };

    if(event.target.name === "KappeB") {setNewKappeB(!newKappeB);
      updatingMember[event.target.name] = newKappeB;
    };
    //#endregion

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

    window.location.reload();

  };

  // ? Toggle the member info arrow
  function toggleMemberInfo(index) {

    // Get DOM-Element
    const memberInfoBtn = document.getElementById(`memberInfoBtn-${index}`); 
    const memberInfoSection = document.getElementById(`infoSection-${index}`); 

    // Toggle UI logic
    if(memberInfoSection.style.display === 'none'){
      toggle90degAnimation(memberInfoBtn);
      memberInfoSection.style.display = 'flex'; 
    } else {
      toggle90degAnimation(memberInfoBtn);
      memberInfoSection.style.display = 'none';
    };

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
                  alt="Arrow"
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

                                      {/* Member form fields before toggling info visible  */ }

                                       <section className="visibleMemberSections">

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

                                                <img 
                                                    src="https://drive.google.com/uc?export=download&id=1u2Eib4hTRffN1aaTLscKze-L6dLN0RKl"  
                                                    name="memberInfoBtn"
                                                    id={`memberInfoBtn-${index}`}
                                                    className="memberInfoBtn"
                                                    alt="Arrow"
                                                    onClick={()=>{toggleMemberInfo(index)}}
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

                                       </section>

                                      {/* Member info Form fields */ }
                                                                                                                    
                                        <section id={`infoSection-${index}`} className="toggledMemberSections" style={{display: 'none'}} >
                                              
                                            <div className="memberInfo-wrapper">
                                                <h3 className="memberInfos-h3">Infos:</h3>
                                                <textarea
                                                      name="textarea"
                                                      cols={20}
                                                      rows={7}
                                                      id={member.id}
                                                      className="inp-text formFields"
                                                      value={member.textfield || ""}
                                                      onChange={handleChange}
                                                    />
                                            </div>     

                                            <div className="uniformen-div"> 
        
                                                  <h3>Galauniformen</h3>

                                                <div className="mantel-div uniformen-divs">
                                                    <p>Mantel</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="mantelS"
                                                                  id={member.id}
                                                                  className="inp-mantelS infoFields formFields"
                                                                  value={member.mantelN}
                                                                  onChange={handleChange}
                                                            />                          
                                                      
                                                        <label htmlFor="mantelB"> ausgegeben?</label>   

                                                            <input
                                                                  type='checkbox'
                                                                  name="mantelB"
                                                                  id={member.id}
                                                                  className="inp-mantelB formFields"
                                                                  checked={member.mantelB}
                                                                  onChange={handleChange}
                                                            />         

                                                </div>

                                                <div className="jacke-div uniformen-divs">
                                                    <p>Jacke</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="jackeS"
                                                                  id={member.id}
                                                                  className="inp-jackeS infoFields formFields"
                                                                  value={member.jackeN}
                                                                  onChange={handleChange}
                                                            />                          
                                                      
                                                        <label htmlFor="jackeB"> ausgegeben?</label>   

                                                            <input
                                                                  type='checkbox'
                                                                  name="jackeB"
                                                                  id={member.id}
                                                                  className="inp-jackeB formFields"
                                                                  checked={member.jackeB}
                                                                  onChange={handleChange}
                                                            />         

                                                </div>

                                                <div className="hose-rock-div uniformen-divs">
                                                    <p>Hose</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="hoseS"
                                                                  id={member.id}
                                                                  className="inp-hoseS infoFields formFields"
                                                                  value={member.hoseN}
                                                                  onChange={handleChange}
                                                            />                          
                                                      
                                                        <label htmlFor="hoseB"> ausgegeben?</label>   

                                                            <input
                                                                  type='checkbox'
                                                                  name="hoseB"
                                                                  id={member.id}
                                                                  className="inp-hoseB formFields"
                                                                  checked={member.hoseB}
                                                                  onChange={handleChange}
                                                            />         

                                                </div>

                                                <div className="hemd-div uniformen-divs">
                                                    <p>Hemd</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="hemdS"
                                                                  id={member.id}
                                                                  className="inp-hemdS infoFields formFields"
                                                                  value={member.hemdN}
                                                                  onChange={handleChange}
                                                            />                          
                                                      
                                                        <label htmlFor="hemdB"> ausgegeben?</label>   

                                                            <input
                                                                  type='checkbox'
                                                                  name="hemdB"
                                                                  id={member.id}
                                                                  className="inp-hemdB formFields"
                                                                  checked={member.hemdB}
                                                                  onChange={handleChange}
                                                            />         

                                                </div>

                                                <div className="kappe-div uniformen-divs">
                                                    <p>Kappe</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="kappeS"
                                                                  id={member.id}
                                                                  className="inp-kappeSb infoFields formFields"
                                                                  value={member.kappeN}
                                                                  onChange={handleChange}
                                                            />                          
                                                      
                                                        <label htmlFor="kappeB"> ausgegeben?</label>   

                                                            <input
                                                                  type='checkbox'
                                                                  name="kappeB"
                                                                  id={member.id}
                                                                  className="inp-kappeB formFields"
                                                                  checked={member.kappeB}
                                                                  onChange={handleChange}
                                                            />         

                                                </div>



                                            </div>

                                        </section>


                                  </form>
                                              
                            </div>
                      )))}

                  </div>

          </main>

    </div>
  );

};