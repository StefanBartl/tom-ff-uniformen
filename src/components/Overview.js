// !                 === To-Do list ===
// TODO Toggle Animation without css and better effect
// TODO Function testing arguments
// TODO Separation in components
// TODO Login-System
// TODO Impressum
// TODO Finish: class test of needed
// TODO Finish: CSS for most devices
// TODO Finish: CSS & JS Guidelines check
// TODO Bonus: Whats about the google drive requests? Maybe await?
// TODO Bonus: Datenauswertung
// TODO Bonus: Searchbar or smth
// TODO Bonus: Adding new atributes
// TODO Why is  useEffect nullentry needed ?
// TODO DEPLOY !!! :-)

// ? React and file imports
import { useState, useEffect, Children } from "react";
import "./Overview.css";
import "./Form.css";
import toggle90degAnimation from './Toggle90Animation';

// ? Firebase imports
import { db } from "../firebase-config";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";


export default function Overview() {


 //#region React-Application logic

  // state to hold hold whole member data
  const [data, setData] = useState([]);
  //  tracking state for add a new member input fields
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPosition, setNewPosition] = useState("");

  // ? Handle state of member
  function handleChange(event) {

    // Get data from onChange event
     const idForChange =  parseInt(event.target.id);
     const nameForChange =  event.target.name;
     const valueForChange =  event.target.value;
  
      // Update member in data summary state 'data'
      const newData = [];
  
    // Get member index in data array
    let memberIndexToUpdate; 
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === idForChange) {
        memberIndexToUpdate = i;
        };
      };

      // helper function
      function updateDataState(){
        for (let i = 0; i < data.length; i++) {
          newData.push(data[i]);
          if (i === memberIndexToUpdate) {
            newData[i][nameForChange] = valueForChange;
          };
        };
        setData(newData);
        return;
      };
  
      // handle checkbox exception
      if(event.target.type === 'checkbox') {
  
          let newBool;
          if(data[memberIndexToUpdate][nameForChange] === 'on' || data[memberIndexToUpdate][nameForChange] === true) {
            newBool = false;
          } else newBool = true;
  
          data[memberIndexToUpdate][nameForChange] = newBool;
  
          for (let i = 0; i < data.length; i++) {
            newData.push(data[i]);
            if (i === memberIndexToUpdate) {
              newData[i][nameForChange] = newBool;
            };
          };
          setData(newData);
          return;
      };
  
      // trigger data update
      updateDataState();
  
  };

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
      newMemberBtn.title = "Neu anlegen zuklappen";
      saveBtn.style.display = 'block'; 
      newMemberID.style.display = 'block';
      newMemberFN.style.display = 'block';
      newMemberLN.style.display = 'block';
      newMemberPO.style.display = 'block';
    } else {
      toggle90degAnimation(newMemberBtn);
      newMemberBtn.title = "Klicke um eine:n neue:n Kamerad:in anzulegen!";
      saveBtn.style.display = 'none';
      newMemberID.style.display = 'none'; 
      newMemberFN.style.display = 'none';
      newMemberLN.style.display = 'none';
      newMemberPO.style.display = 'none';
    };

  };

//#endregion


 //#region React-Application UI-helper functions

  function toggleFullscreen(elem) {
    // elem = elem || document.documentElement;
  
    // if (!document.fullscreenElement && !document.mozFullScreenElement &&
    //   !document.webkitFullscreenElement && !document.msFullscreenElement) {
    //   if (elem.requestFullscreen) {
    //     elem.requestFullscreen();
    //   } else if (elem.msRequestFullscreen) {
    //     elem.msRequestFullscreen();
    //   } else if (elem.mozRequestFullScreen) {
    //     elem.mozRequestFullScreen();
    //   } else if (elem.webkitRequestFullscreen) {
    //     elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    //   }
    // } else {
    //   if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   } else if (document.msExitFullscreen) {
    //     document.msExitFullscreen();
    //   } else if (document.mozCancelFullScreen) {
    //     document.mozCancelFullScreen();
    //   } else if (document.webkitExitFullscreen) {
    //     document.webkitExitFullscreen();
    //   }
    // }
 };

  // ? Toggle the member info arrow
  function toggleMemberInfo(index) {

    // Get DOM-Element
    const memberInfoBtn = document.getElementById(`memberInfoBtn-${index}`); 
    const memberWholeSection = document.querySelector(`.formMemberDiv-${index}`); 
    const memberInfoSection = document.getElementById(`infoSection-${index}`); 
    const memberFireTruck = document.querySelector(`.fireTruck-${index}`); 
    const allMembersArray = document.querySelectorAll('.form-memberDiv');

    // Toggle UI logic
    if(memberInfoSection.style.display === 'none'){
      toggle90degAnimation(memberInfoBtn);
      memberInfoBtn.title = "Info zuklappen";
      memberInfoSection.style.display = 'flex'; 
      memberFireTruck.style.display = 'flex'; 
      memberWholeSection.classList.add('visibleMemberSection-div');
      for(let i = 0; i < allMembersArray.length; i++){
       if (allMembersArray[i].classList.contains('visibleMemberSection-div') === false) allMembersArray[i].classList.add('notSelectedMember-div'); // TODO Or hardcoded better?
      };
    } else {
      toggle90degAnimation(memberInfoBtn);
      memberInfoBtn.title = "Info aufklappen";
      memberInfoSection.style.display = 'none';
      memberFireTruck.style.display = 'none';
      for(let i = 0; i < allMembersArray.length; i++){
        if (allMembersArray[i].classList.contains('visibleMemberSection-div') == false) allMembersArray[i].classList.remove('notSelectedMember-div'); // TODO Or hardcoded better?
       };
       memberWholeSection.classList.remove('visibleMemberSection-div');
    };

  };

//#endregion


//#region Firebase firestore

  // ? Fetch database from Firebase
  useEffect(() => {
    const dataCollectionRef = collection(db, "uniformen");
    const getData = async function fetchingData() {
    const fetchedData = await getDocs(dataCollectionRef);

      setData(
        fetchedData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          firstName: doc.firstName,
          lastName: doc.lastName,
          ffposition: doc.ffposition,
          textarea: doc.textarea || "",

          mantelS: doc.mantelS,
          mantelB: doc.mantelB,
          jackeS: doc.jackeS,
          jackeB: doc.jackeB,
          hoseS: doc.hoseS,
          hoseB: doc.hoseB,
          hemdS: doc.hemdS,
          hemdB: doc.hemdB,
          kappeS: doc.kappeS,
          kappeB: doc.kappeB,

          pulloverS: doc.pulloverS,
          pulloverB: doc.pulloverB,
          hose2S: doc.hose2S,
          hose2B: doc.hose2B,
          tshirtS: doc.tshirtS,
          tshirtB: doc.tshirtB,
          poloS: doc.poloS,
          poloB: doc.poloB,
          bluseS: doc.bluseS,
          bluseB: doc.bluseB,
          fleeceS: doc.fleeceS,
          fleeceB: doc.fleeceB,

          schutzjackeS: doc.schutzjackeS,
          schutzjackeB: doc.schutzjackeB,
          schutzhoseS: doc.schutzhoseS,
          schutzhoseB: doc.schutzhoseB,
          einsatzstiefelschwarzS: doc.einsatzstiefelschwarzS,
          einsatzstiefelschwarzB: doc.einsatzstiefelschwarzB,
          einsatzstiefelgelbS: doc.einsatzstiefelgelbS,
          einsatzstiefelgelbB: doc.einsatzstiefelgelbB,
          einsatzhandschuheS: doc.einsatzhandschuheS,
          einsatzhandschuheB: doc.einsatzhandschuheB,
          kappe3S: doc.kappe3S,
          kappe3B: doc.kappe3B,
          haubeS: doc.haubeS,
          haubeB: doc.haubeB,
          helmS: doc.helmS,
          helmB: doc.helmB,
          gurtS: doc.gurtS,
          gurtB: doc.gurtB,

        }))
      );

      setData(
        fetchedData.docs.map((doc) => ({ ...doc.data(), nullentry: null }))
      );
    };
    getData();
  }, []);

  // ? Add a new member to the firestore database
  const handleSaveNewFirestoreMember = async () => {
    
    if(newFirstName === "" || newLastName === "" || newPosition === "") {
      alert("Bitte gib Vorname, Nachname und Dienstgrad ein!");
      return
    };

    // Store new member in firestore database
    const dataCollectionRef = collection(db, "uniformen");
    await setDoc(doc(dataCollectionRef, `${data[data.length -1].id + 1 || 0}`), {
      id: Number(data[data.length -1].id + 1 || 0),
      firstName: newFirstName,
      lastName: newLastName,
      ffposition: newPosition,
    });

    firestoreUIEffect('save');

  };

  // ? Update a member in the firestore database
  const handleUpdateFirestoreMember = async (id) => {

    let updatingMemberObject;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        updatingMemberObject = data[i];
        };
      };

    // Update member in firestore database
    const updatingMemberFSDoc = doc(db, "uniformen", `${id}`);
    await updateDoc(updatingMemberFSDoc, updatingMemberObject);
    
    // firestoreUIEffect('update', id);

  };

  // ? Delete a memberr in the firestore database
  const handleDeleteFirestoreMember = async (id) => {

    // Get Memeber information data via index of data state object
    let updatingMemberIndex;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        updatingMemberIndex = i;
        };
      };



    if(window.confirm(`Willst du ${data[updatingMemberIndex].ffposition} ${data[updatingMemberIndex].firstName} ${data[updatingMemberIndex].lastName} wirklich löschen? Der Datensatz kann nicht mehr hergestellt werden!`)){
      // Delete member in firestore database
      await deleteDoc(doc(db, "uniformen", `${id}`));
      firestoreUIEffect('delete', id);
      return;
    }; 

  };

  function firestoreUIEffect(type, id){

    // get the correct btn element 
    let memberUpdateBtn;
    type === 'save' 
      ?  memberUpdateBtn = document.querySelector(`.saveBtn`)
      : memberUpdateBtn = document.querySelector(`.${type}-${id}`); 

    // UI-Effect
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

    setTimeout(()=>{    window.location.reload();},2000)

  };

//#endregion


  return (
    <div className="Overview">

            <div className="headline-div">
                <a href="https://www.ff-kaltenleutgeben.at/" className="headline-a">
                    <img src='https://drive.google.com/uc?export=download&id=17cEBOBeqlDBQDUqc3nAYnGMQgh6TGyFP' alt="Logo der FF-Kaltenleutgeben" title="Klicke um zur Website der FF-Kaltenleutgeben zu gelangen!" />
                </a>
                <h1 className="main-title">FF Kaltenleutgeb Uniformen-Datenbank</h1>
            </div>
      
          <div className="console">

              <img 
                  src="https://drive.google.com/uc?export=download&id=1u2Eib4hTRffN1aaTLscKze-L6dLN0RKl"  
                  name="newBtn"
                  id={`new`}
                  className="newBtn imageNewBtn"
                  alt="Arrow"
                  title="Klicke um eine:n neue:n Kamerad:in anzulegen!"
                  onClick={toggleNewMemberDiv}
              />

              <button
                  name="saveBtn"
                  id={`save`}
                  className="saveBtn firestoreBtn"
                  onClick={handleSaveNewFirestoreMember}
                  style={{display: 'none'}}
                  title="Klicke um die/den neue:n Kamerad:in anzulegen!"
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
                required
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
                required
              />

              <input
                type="text"
                placeholder="Dienstgrad"
                name="vorname"
                id="newPO"
                className="inp-PO formFields"
                style={{display: 'none'}}
                onChange={(event) => {
                  setNewPosition(event.target.value);
                }}
                required
              />

          </div>
          
          <main className="data-wrapper">

                  <div className="label-form">
                          <h3 className="label-ID">Nr.</h3><h3 className="label-FN">Vorname</h3><h3 className="label-LN">Nachname</h3><h3 className="label-PO">Dienstgrad</h3>
                  </div>

                  <div className="form-div">
                    {Children.toArray(
                      data.map((member, index) => (

                            <div className={`form-memberDiv formMemberDiv-${index}`}>

                                  <form name="dataForm" className="data-form">

                                      {/* Member form fields before toggling info visible  */ }

                                       <section className="visibleMemberSections">

                                            <p className="idVal formFields">{index}.</p>

                                                <input
                                                  type="text"
                                                  name="firstName"
                                                  id={member.id}
                                                  className="inp-FN formFields"
                                                  value={data[index].firstName}
                                                  onChange={handleChange}
                                                />

                                                <input
                                                  type="text"
                                                  name="lastName"
                                                  id={member.id}
                                                  className="inp-LN formFields"
                                                  value={data[index].lastName}
                                                  onChange={handleChange}
                                                />

                                                <input
                                                  type="text"
                                                  name="ffposition"
                                                  id={member.id}
                                                  className="inp-PO formFields"
                                                  value={data[index].ffposition}
                                                  onChange={handleChange}
                                                />

                                                <img 
                                                  src="https://drive.google.com/uc?export=download&id=15q0SsoW8GseByceDXJxG7UaclNQYBVJY"
                                                  className={`fireTruck fireTruck-${index}`}
                                                  style={{display: 'none'}}
                                                />

                                                <img 
                                                    src="https://drive.google.com/uc?export=download&id=1u2Eib4hTRffN1aaTLscKze-L6dLN0RKl"  
                                                    name="memberInfoBtn"
                                                    id={`memberInfoBtn-${index}`}
                                                    className="memberInfoBtn"
                                                    alt="Arrow"
                                                    title="Info aufklappen"
                                                    onClick={()=>{
                                                        toggleMemberInfo(index)
                                                        toggleFullscreen();                         
                                                        toggleFullscreen(this);
                                                    }}
                                                />

                                       </section>

                                      {/* Member info Form fields */ }
                                                                                                                    
                                        <section id={`infoSection-${index}`} className="toggledMemberSections" style={{display: 'none'}} >
                                              
                                            <div className="memberInfo-wrapper">
                                                <h3 className="memberInfos-h3">Infos</h3>
                                                <textarea
                                                      name="textarea"
                                                      id={member.id}
                                                      className="inp-text formFields"
                                                      value={data[index].textarea || ""}
                                                      onChange={handleChange}
                                                    />

                                                <img src='https://drive.google.com/uc?export=download&id=1L1sxkr7IVMtQEHTjFgWudgX7jWbLJ8-c' className="memberInfo-fireImage" />    


                                                <div className="memberButtons-div">

                                                <input
                                                      type="button"
                                                      name="deleteBtn"
                                                      id={member.id}
                                                      title="Kamerad:in unwiderruflich aus der Datenbank löschen"
                                                      className={`deleteBtn delete-${member.id} firestoreBtn`}
                                                      onClick={(event) => {
                                                        handleDeleteFirestoreMember(member.id);
                                                      }}
                                                      defaultValue="löschen"
                                                    />

                                                    <input
                                                      type="button"
                                                      name="updateBtn"
                                                      id={member.id}
                                                      title="Update die Daten der/des Kamerad:in in der Datenbank"
                                                      className={`updateBtn update-${member.id} firestoreBtn`}
                                                      onClick={(event) => {
                                                        handleUpdateFirestoreMember(member.id);
                                                      }}
                                                      defaultValue="update"
                                                    />

                                                </div>

                                            </div>     

                                            <div className="uniformenTypes-div"> 
        
                                                <h3>Galauniformen</h3>

                                                <div className="galaLabel-div uniformenLabels-div">
                                                    <p className="galaP1 uLabelsP1">Größe</p>
                                                    <p className="galaP2 uLabelsP2" title='Bereits ausgegeben?'>aus?</p>
                                                </div>

                                                <div className="mantel-div uniformenAssets-divs galaAsset">
                                                    <p>Mantel</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="mantelS"
                                                                  id={member.id}
                                                                  className="inp-mantelS infoFields formFields"
                                                                  value={data[index].mantelS}
                                                                  onChange={handleChange}
                                                            />                          

                                                            <input
                                                                  type='checkbox'
                                                                  name="mantelB"
                                                                  id={member.id}
                                                                  className="inp-mantelB formFields"
                                                                  checked={data[index].mantelB || false}
                                                                  onChange={handleChange}
                                                            />         

                                                </div>

                                                <div className="jacke-div uniformenAssets-divs galaAsset">
                                                    <p>Jacke</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="jackeS"
                                                                  id={member.id}
                                                                  className="inp-jackeS infoFields formFields"
                                                                  value={data[index].jackeS}
                                                                  onChange={handleChange}
                                                            />                         

                                                            <input
                                                                  type='checkbox'
                                                                  name="jackeB"
                                                                  id={member.id}
                                                                  className="inp-jackeB formFields"
                                                                  checked={data[index].jackeB || false}
                                                                  onChange={handleChange}
                                                            />         

                                                </div>

                                                <div className="hose-rock-div uniformenAssets-divs galaAsset">
                                                    <p>Hose</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="hoseS"
                                                                  id={member.id}
                                                                  className="inp-hoseS infoFields formFields"
                                                                  value={data[index].hoseS}
                                                                  onChange={handleChange}
                                                            />                        

                                                            <input
                                                                  type='checkbox'
                                                                  name="hoseB"
                                                                  id={member.id}
                                                                  className="inp-hoseB formFields"
                                                                  checked={data[index].hoseB || false }
                                                                  onChange={handleChange}
                                                            />         

                                                </div>

                                                <div className="hemd-div uniformenAssets-divs galaAsset">
                                                    <p>Hemd</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="hemdS"
                                                                  id={member.id}
                                                                  className="inp-hemdS infoFields formFields"
                                                                  value={data[index].hemdS}
                                                                  onChange={handleChange}
                                                            />                        

                                                            <input
                                                                  type='checkbox'
                                                                  name="hemdB"
                                                                  id={member.id}
                                                                  className="inp-hemdB formFields"
                                                                  checked={data[index].hemdB || false }
                                                                  onChange={handleChange}
                                                            />         

                                                </div>

                                                <div className="kappe-div uniformenAssets-divs galaAsset">
                                                    <p>Kappe</p>   
                                              
                                                            <input
                                                                  type='text'
                                                                  name="kappeS"
                                                                  id={member.id}
                                                                  className="inp-kappeSb infoFields formFields"
                                                                  value={data[index].kappeS}
                                                                  onChange={handleChange}
                                                            />                         

                                                            <input
                                                                  type='checkbox'
                                                                  name="kappeB"
                                                                  id={member.id}
                                                                  className="inp-kappeB formFields"
                                                                  checked={data[index].kappeB || false}
                                                                  onChange={handleChange}
                                                            />         

                                                </div>



                                            </div>

                                            <div className="uniformenTypes-div dienstbekleidung-div"> 
        
                                                  <h3>Dienstbekleidung</h3>

                                                  <div className="dienstbekleidungLabel-div uniformenLabels-div">
                                                      <p className="dienstbekleidungP1 uLabelsP1">Größe</p>
                                                      <p className="dienstbekleidungP2 uLabelsP2" title='Bereits ausgegeben?'>aus?</p>
                                                 </div>

                                                  <div className="pullover-div uniformenAssets-divs dienstAsset">
                                                      <p>Pullover</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="pulloverS"
                                                                    id={member.id}
                                                                    className="inp-pulloverS infoFields formFields"
                                                                    value={data[index].pulloverS}
                                                                    onChange={handleChange}
                                                              />                          
      

                                                              <input
                                                                    type='checkbox'
                                                                    name="pulloverB"
                                                                    id={member.id}
                                                                    className="inp-pulloverB formFields"
                                                                    checked={data[index].pulloverB || false}
                                                                    onChange={handleChange}
                                                              />         

                                                  </div>

                                                  <div className="hose2-div uniformenAssets-divs dienstAsset">
                                                      <p>Hose</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="hose2S"
                                                                    id={member.id}
                                                                    className="inp-hose2S infoFields formFields"
                                                                    value={data[index].hose2S}
                                                                    onChange={handleChange}
                                                              />                          


                                                              <input
                                                                    type='checkbox'
                                                                    name="hose2B"
                                                                    id={member.id}
                                                                    className="inp-hose2B formFields"
                                                                    checked={data[index].hose2B || false}
                                                                    onChange={handleChange}
                                                              />         

                                                  </div>

                                                  <div className="tshirt-div uniformenAssets-divs dienstAsset">
                                                      <p>T-Shirt</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="tshirtS"
                                                                    id={member.id}
                                                                    className="inp-tshirtS infoFields formFields"
                                                                    value={data[index].tshirtS}
                                                                    onChange={handleChange}
                                                              />                          
  

                                                              <input
                                                                    type='checkbox'
                                                                    name="tshirtB"
                                                                    id={member.id}
                                                                    className="inp-tshirtB formFields"
                                                                    checked={data[index].tshirtB || false }
                                                                    onChange={handleChange}
                                                              />         

                                                  </div>

                                                  <div className="polo-div uniformenAssets-divs dienstAsset">
                                                      <p>Polo</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="poloS"
                                                                    id={member.id}
                                                                    className="inp-poloS infoFields formFields"
                                                                    value={data[index].poloS}
                                                                    onChange={handleChange}
                                                              />                          

                                                              <input
                                                                    type='checkbox'
                                                                    name="poloB"
                                                                    id={member.id}
                                                                    className="inp-poloB formFields"
                                                                    checked={data[index].poloB || false }
                                                                    onChange={handleChange}
                                                              />         

                                                     </div>

                                                    <div className="Bluse-div uniformenAssets-divs dienstAsset">
                                                        <p>Bluse</p>   
                                                  
                                                                <input
                                                                      type='text'
                                                                      name="bluseS"
                                                                      id={member.id}
                                                                      className="inp-bluseSb infoFields formFields"
                                                                      value={data[index].bluseS}
                                                                      onChange={handleChange}
                                                                />                          
    

                                                                <input
                                                                      type='checkbox'
                                                                      name="bluseB"
                                                                      id={member.id}
                                                                      className="inp-bluseB formFields"
                                                                      checked={data[index].bluseB || false}
                                                                      onChange={handleChange}
                                                                />         

                                                    </div>

                                                    <div className="fleece-div uniformenAssets-divs dienstAsset">
                                                        <p>Fleece</p>   
                                                  
                                                                <input
                                                                      type='text'
                                                                      name="fleeceS"
                                                                      id={member.id}
                                                                      className="inp-fleeceSb infoFields formFields"
                                                                      value={data[index].fleeceS}
                                                                      onChange={handleChange}
                                                                />                          
      

                                                                <input
                                                                      type='checkbox'
                                                                      name="fleeceB"
                                                                      id={member.id}
                                                                      className="inp-fleeceB formFields"
                                                                      checked={data[index].fleeceB || false}
                                                                      onChange={handleChange}
                                                                />         

                                                    </div>

                                            </div>

                                            <div className="uniformenTypes-div einsatzuniform-div"> 
        
                                                  <h3>Einsatzuniform</h3>

                                                  <div className="einsatzuniformenLabel-div uniformenLabels-div">
                                                      <p className="einsatzuniformenP1 uLabelsP1">Größe</p>
                                                      <p className="einsatzuniformenP2 uLabelsP2" title='Bereits ausgegeben?'>aus?</p>
                                                 </div>

                                                  <div className="schutzjacke-div uniformenAssets-divs einsatzAsset">
                                                      <p>Schutzjacke</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="schutzjackeS"
                                                                    id={member.id}
                                                                    className="inp-schutzjackeS infoFields formFields"
                                                                    value={data[index].schutzjackeS}
                                                                    onChange={handleChange}
                                                              />                          
            

                                                              <input
                                                                    type='checkbox'
                                                                    name="schutzjackeB"
                                                                    id={member.id}
                                                                    className="inp-schutzjackeB formFields"
                                                                    checked={data[index].schutzjackeB || false}
                                                                    onChange={handleChange}
                                                              />         

                                                  </div>

                                                  <div className="schutzhose-div uniformenAssets-divs einsatzAsset">
                                                      <p>Schutzhose</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="schutzhoseS"
                                                                    id={member.id}
                                                                    className="inp-schutzhoseS infoFields formFields"
                                                                    value={data[index].schutzhoseS}
                                                                    onChange={handleChange}
                                                              />                          
            

                                                              <input
                                                                    type='checkbox'
                                                                    name="schutzhoseB"
                                                                    id={member.id}
                                                                    className="inp-schutzhoseB formFields"
                                                                    checked={data[index].schutzhoseB || false}
                                                                    onChange={handleChange}
                                                              />         

                                                  </div>

                                                  <div className="einsatzstiefelschwarz-div uniformenAssets-divs einsatzAsset">
                                                      <p>Einsatzstiefel schwarz</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="einsatzstiefelschwarzS"
                                                                    id={member.id}
                                                                    className="inp-einsatzstiefelschwarzS infoFields formFields"
                                                                    value={data[index].einsatzstiefelschwarzS}
                                                                    onChange={handleChange}
                                                              />                          
                                

                                                              <input
                                                                    type='checkbox'
                                                                    name="einsatzstiefelschwarzB"
                                                                    id={member.id}
                                                                    className="inp-einsatzstiefelschwarzB formFields"
                                                                    checked={data[index].einsatzstiefelschwarzB || false }
                                                                    onChange={handleChange}
                                                              />         

                                                  </div>

                                                  <div className="einsatzstiefelgelb-div uniformenAssets-divs einsatzAsset">
                                                      <p>Einsatzstiefel gelb</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="einsatzstiefelgelbS"
                                                                    id={member.id}
                                                                    className="inp-einsatzstiefelgelbS infoFields formFields"
                                                                    value={data[index].einsatzstiefelgelbS}
                                                                    onChange={handleChange}
                                                              />                          
                          

                                                              <input
                                                                    type='checkbox'
                                                                    name="einsatzstiefelgelbB"
                                                                    id={member.id}
                                                                    className="inp-einsatzstiefelgelbB formFields"
                                                                    checked={data[index].einsatzstiefelgelbB || false }
                                                                    onChange={handleChange}
                                                              />         

                                                  </div>

                                                  <div className="einsatzhandschuhe-div uniformenAssets-divs einsatzAsset">
                                                      <p>Einsatzhandschuhe</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="einsatzhandschuheS"
                                                                    id={member.id}
                                                                    className="inp-einsatzhandschuheS infoFields formFields"
                                                                    value={data[index].einsatzhandschuheS}
                                                                    onChange={handleChange}
                                                              />                          
                        

                                                              <input
                                                                    type='checkbox'
                                                                    name="einsatzhandschuheB"
                                                                    id={member.id}
                                                                    className="inp-einsatzhandschuheB formFields"
                                                                    checked={data[index].einsatzhandschuheB || false }
                                                                    onChange={handleChange}
                                                              />         

                                                     </div>

                                                     <div className="einsatzstiefel-div uniformenAssets-divs einsatzAsset">
                                                      <p>Einsatzstiefel</p>   
                                                
                                                              <input
                                                                    type='text'
                                                                    name="einsatzstiefelS"
                                                                    id={member.id}
                                                                    className="inp-einsatzstiefelS infoFields formFields"
                                                                    value={data[index].einsatzstiefelS}
                                                                    onChange={handleChange}
                                                              />                          
                  

                                                              <input
                                                                    type='checkbox'
                                                                    name="einsatzstiefelB"
                                                                    id={member.id}
                                                                    className="inp-einsatzstiefelB formFields"
                                                                    checked={data[index].einsatzstiefelB || false }
                                                                    onChange={handleChange}
                                                              />         

                                                     </div>

                                                    <div className="kappe3-div uniformenAssets-divs einsatzAsset">
                                                        <p>Kappe</p>   
                                                  
                                                                <input
                                                                      type='text'
                                                                      name="kappe3S"
                                                                      id={member.id}
                                                                      className="inp-kappe3Sb infoFields formFields"
                                                                      value={data[index].kappe3S}
                                                                      onChange={handleChange}
                                                                />                          
      

                                                                <input
                                                                      type='checkbox'
                                                                      name="kappe3B"
                                                                      id={member.id}
                                                                      className="inp-kappe3B formFields"
                                                                      checked={data[index].kappe3B || false}
                                                                      onChange={handleChange}
                                                                />         

                                                    </div>

                                                    <div className="haube-div uniformenAssets-divs einsatzAsset">
                                                        <p>haube</p>   
                                                  
                                                                <input
                                                                      type='text'
                                                                      name="haubeS"
                                                                      id={member.id}
                                                                      className="inp-haubeSb infoFields formFields"
                                                                      value={data[index].haubeS}
                                                                      onChange={handleChange}
                                                                />                          
    

                                                                <input
                                                                      type='checkbox'
                                                                      name="haubeB"
                                                                      id={member.id}
                                                                      className="inp-haubeB formFields"
                                                                      checked={data[index].haubeB || false}
                                                                      onChange={handleChange}
                                                                />         

                                                    </div>

                                                    <div className="helm-div uniformenAssets-divs einsatzAsset">
                                                        <p>Helm</p>   
                                                  
                                                                <input
                                                                      type='text'
                                                                      name="helmS"
                                                                      id={member.id}
                                                                      className="inp-helmSb infoFields formFields"
                                                                      value={data[index].helmS}
                                                                      onChange={handleChange}
                                                                />                          
  

                                                                <input
                                                                      type='checkbox'
                                                                      name="helmB"
                                                                      id={member.id}
                                                                      className="inp-helmB formFields"
                                                                      checked={data[index].helmB || false}
                                                                      onChange={handleChange}
                                                                />         

                                                    </div>

                                                    <div className="Gurt-div uniformenAssets-divs einsatzAsset">
                                                        <p>Gurt</p>   
                                                  
                                                                <input
                                                                      type='text'
                                                                      name="GurtS"
                                                                      id={member.id}
                                                                      className="inp-GurtSb infoFields formFields"
                                                                      value={data[index].GurtS}
                                                                      onChange={handleChange}
                                                                />                          
  

                                                                <input
                                                                      type='checkbox'
                                                                      name="GurtB"
                                                                      id={member.id}
                                                                      className="inp-GurtB formFields"
                                                                      checked={data[index].GurtB || false}
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