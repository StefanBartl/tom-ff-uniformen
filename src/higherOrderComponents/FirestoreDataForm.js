// ? CSS, React and function imports
import "../styles/FirestoreDataForm.css";
import { useState, useEffect, Children } from "react";
import Searchbar from "./Searchbar";
import  ToggleElementDisplay from "../components/ToggleElementDisplay";
import toggle90degAnimation from "../components/Toggle90Animation";
import ToggleFullScreen from "../components/ToggleFullScreen";
import FindMemberIndex from "../components/FindMemberIndexInDataArray";
import GetUpdatetDataArray from "../components/GetUpdatetDataObject";

// ? Firebasefirestore  imports
import { db } from "../firebase-config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function FirestoreDataForm() {

  //#region React-Application logic

  // state to hold hold whole member data
  const [data, setData] = useState([]);
  //  tracking state for add a new member input fields
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPosition, setNewPosition] = useState("");

  // ? Handle state of member
  function handleChange(event) {
    event.preventDefault();

    // Get data from onChange event
    const idForChange = parseInt(event.target.id);
    const nameForChange = event.target.name;
    const valueForChange = event.target.value;

    // Get member index in data array
    const memberIndexToUpdate = FindMemberIndex(idForChange, data);
    if (memberIndexToUpdate === false) return; // If index was not correct found, return to prevent changing values accidentaly

    // handle checkbox exception
    if (event.target.type === "checkbox") {
      let newBool;
      if (
        data[memberIndexToUpdate][nameForChange] === "on" ||
        data[memberIndexToUpdate][nameForChange] === true
      ) {
        newBool = false;
      } else newBool = true;

      const newDataArray = GetUpdatetDataArray(
        memberIndexToUpdate,
        nameForChange,
        newBool,
        data
      );
      setData(newDataArray);
      return;
    } else {
      const newDataArray = GetUpdatetDataArray(
        memberIndexToUpdate,
        nameForChange,
        valueForChange,
        data
      );
      setData(newDataArray);
      return;
    }
  }

  // ? Create new form to add a new member
  function toggleNewMemberDiv(event) {
    event.preventDefault();

    // Toggle div, newButton image direction & save button
    // Get DOM-Elements
    const newMemberBtn = document.getElementById("new");
    const saveBtn = document.getElementById("save");
    const newMemberID = document.getElementById("newID");
    const newMemberFN = document.getElementById("new-firstName");
    const newMemberLN = document.getElementById("new-lastName");
    const newMemberPO = document.getElementById("new-position");

    // Toggle UI logic
    if (saveBtn.classList.contains('displayNone')) {
      toggle90degAnimation(newMemberBtn);
      newMemberBtn.title = "Neu anlegen zuklappen";
      saveBtn.classList.remove('displayNone');
      newMemberID.classList.remove('displayNone');
      newMemberFN.classList.remove('displayNone');
      newMemberLN.classList.remove('displayNone');
      newMemberPO.classList.remove('displayNone');
    } else {
      toggle90degAnimation(newMemberBtn);
      newMemberBtn.title = "Klicke um eine:n neue:n Kamerad:in anzulegen!";
      saveBtn.classList.add('displayNone');
      newMemberID.classList.add('displayNone');
      newMemberFN.classList.add('displayNone');
      newMemberLN.classList.add('displayNone');
      newMemberPO.classList.add('displayNone');
    }
  }

  //#endregion

  //#region React-Application UI-helper functions

  // ? Toggle the member info arrow
  function toggleMemberInfo(index) {
    // Get DOM-Element
    const memberInfoBtn = document.getElementById(`memberInfoBtn-${index}`);
    const memberWholeSection = document.querySelector(`.member-form-${index}`);
    const memberInfoSection = document.getElementById(`infoSection-${index}`);
    const memberFireTruck = document.querySelector(`.fireTruck-${index}`);
    const allMembersArray = document.querySelectorAll(".member-forms");

    // Toggle UI
    if (memberInfoSection.style.display === "none") {
      // If info section of member is hided...
      toggle90degAnimation(memberInfoBtn); // Initiate the 90deg turnaround animation of the button image element
      ToggleFullScreen();
      memberInfoBtn.title = "Info zuklappen"; // Change the tile of the button element
      memberInfoSection.style.display = "flex"; // Display the info section
      memberFireTruck.style.display = "flex"; // Display the fire truck image
      memberWholeSection.classList.add("visibleMemberSection-div"); // Add css-rules for the whole section (constant visible section + toggled section)
      for (let i = 0; i < allMembersArray.length; i++) {
        // Loop trough all member forms
        if (
          allMembersArray[i].classList.contains("visibleMemberSection-div") ===
          false
        ) {
          // display: none all elements which are not selected by user
          allMembersArray[i].classList.add("notSelectedMember-div");
        }
      }
    } else {
      // If info section of member is not hided,  the opposite of the above
      toggle90degAnimation(memberInfoBtn);
      memberInfoBtn.title = "Info aufklappen";
      memberInfoSection.style.display = "none";
      memberFireTruck.style.display = "none";
      for (let i = 0; i < allMembersArray.length; i++) {
        if (
          allMembersArray[i].classList.contains("visibleMemberSection-div") ===
          false
        )
          allMembersArray[i].classList.remove("notSelectedMember-div");
      }
      memberWholeSection.classList.remove("visibleMemberSection-div");
      if (document.fullscreenElement) {
        // Prevent to trigger ToggleFullScreen() again if user exit the member info fullscrreen mode with ESC
        ToggleFullScreen();
      }
    }
  }

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
    if (newFirstName === "" || newLastName === "" || newPosition === "") {
      alert("Bitte gib Vorname, Nachname und Dienstgrad ein!");
      return;
    }

    // Store new member in firestore database
    const dataCollectionRef = collection(db, "uniformen");
    await setDoc(
      doc(dataCollectionRef, `${data[data.length - 1].id + 1 || 0}`),
      {
        id: Number(data[data.length - 1].id + 1 || 0),
        firstName: newFirstName,
        lastName: newLastName,
        ffposition: newPosition,
      }
    );

    firestoreUIEffect("save", data[data.length - 1].id + 1 || 0);
  };

  // ? Update a member in the firestore database
  const handleUpdateFirestoreMember = async (id) => {
    // Get member index in data array
    const memberIndexToUpdate = FindMemberIndex(id, data);
    if (memberIndexToUpdate === false) {
      alert(
        `Update konnte leider nicht durchgeführt werden. Bitte kontaktieren Sie den technischen Support.`
      ); // Inform user that the update cannot be performed, please contact support
      return; // If index was not correct found, return to prevent updating member accidentaly
    }
    const updatingMemberObject = data[memberIndexToUpdate]; // Get whole member object from data array

    // Update member in firestore database
    const updatingMemberFSDoc = doc(db, "uniformen", `${id}`);
    await updateDoc(updatingMemberFSDoc, updatingMemberObject);

    firestoreUIEffect("update", id); // Initiate UI-Effect

    return;
  };

  // ? Delete a memberr in the firestore database
  const handleDeleteFirestoreMember = async (id) => {
    // Get member index in data array
    const memberIndexToUpdate = FindMemberIndex(id, data);
    if (memberIndexToUpdate === false) {
      alert(
        `Löschen konnte leider nicht durchgeführt werden. Bitte kontaktieren Sie den technischen Support.`
      ); // Inform user that delete cannot be performed, please contact support
      return; // If index was not correct found, return to prevent delete member accidentaly
    }

    if (
      window.confirm(
        `Willst du ${data[memberIndexToUpdate].ffposition} ${data[memberIndexToUpdate].firstName} ${data[memberIndexToUpdate].lastName} wirklich löschen? Der Datensatz kann nicht mehr hergestellt werden!`
      )
    ) {
      // Delete member in firestore database
      await deleteDoc(doc(db, "uniformen", `${id}`));
      firestoreUIEffect("delete", id);
      return;
    }
  };

  function firestoreUIEffect(type, id) {
    // get the correct btn element
    let memberUpdateBtn;
    type === "save"
      ? (memberUpdateBtn = document.querySelector(`#save`))
      : (memberUpdateBtn = document.querySelector(`.${type}-${id}`));

    // UI-Effect
    const updateUIEffect = [
      { backgroundColor: "white", color: "black" },
      { backgroundColor: "green", color: "white" },
      { backgroundColor: "white", color: "black" },
    ];
    const updateUIEffectTiming = {
      duration: 2000,
      iterations: 1,
    };
    memberUpdateBtn.animate(updateUIEffect, updateUIEffectTiming, {
      easing: "ease-in-out",
    });

    // Special Effect for update
    if (type === "update") {
      const ovAniStyle = [
        { backgroundColor: "red" },
        { backgroundColor: "gray" },
        { backgroundColor: "red" },
      ];

      const ovAniTiming = {
        duration: 1000,
        iterations: 1,
        easing: "ease-in-out",
      };

      document
        .querySelector(`.member-formMID-${id}`)
        .animate(ovAniStyle, ovAniTiming);
      return;
    }

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  //#endregion

  return (
     <div className="FirestoreDataForm">

              <div className="console">
                  <img
                  src="https://drive.google.com/uc?export=download&id=1u2Eib4hTRffN1aaTLscKze-L6dLN0RKl"
                  name="newBtn"
                  id={`new`}
                  alt="Arrow"
                  title={`Klicke um eine:n neue:n Kamerad:in anzulegen!
                              ©: deemakdaksina - https://www.flaticon.com/authors/deemakdaksina `}
                  onClick={toggleNewMemberDiv}
                  />
              </div>

              <div className="newMember-div">
                  <p className="id-value displayNone" id="newID">
                  {data.length || 0}.
                  </p>

                  <input
                  type="text"
                  placeholder="Vorname"
                  name="vorname"
                  id="new-firstName"
                  className="input-firstName displayNone"
                  onChange={(event) => {
                      setNewFirstName(event.target.value);
                  }}
                  required
                  />

                  <input
                  type="text"
                  placeholder="Nachname"
                  name="vorname"
                  id="new-lastName"
                  className="input-lastName displayNone"
                  onChange={(event) => {
                      setNewLastName(event.target.value);
                  }}
                  required
                  />

                  <input
                  type="text"
                  placeholder="Dienstgrad"
                  name="vorname"
                  id="new-position"
                  className="input-position displayNone"
                  onChange={(event) => {
                      setNewPosition(event.target.value);
                  }}
                  required
                  />

                <button
                  name="saveBtn"
                  id={`save`}
                  className='displayNone'
                  onClick={handleSaveNewFirestoreMember}
                  title="Klicke um die/den neue:n Kamerad:in anzulegen!"
                  >
                  speichern
                  </button>
              </div>

              <main className="firestore-data-wrapper">
                  <div className="data-labels-div">
                  <h3 className="label-ID">Nr. -</h3>
                      <h3 className="label-FN">Vorname,</h3>
                      <h3 className="label-LN">Nachname,</h3>
                      <h3 className="label-PO">Dienstgrad</h3>
                  </div>

                  <div className="data-array-wrapper">
                  {Children.toArray(
                      data.map((member, index) => (
                      <form
                          name={`memberForm-${index}`}
                          id={index}
                          className={`member-form-${index} member-formMID-${member.id} member-forms`}
                      >
                          {/* Member form fields before toggling info visible  */}

                          <section className="member-section-visible">
                          <p className="id-value">{index}.</p>

                          <input
                              type="text"
                              name="firstName"
                              id={member.id}
                              className="input-firstName"
                              value={data[index].firstName}
                              onChange={handleChange}
                          />

                          <input
                              type="text"
                              name="lastName"
                              id={member.id}
                              className="input-lastName"
                              value={data[index].lastName}
                              onChange={handleChange}
                          />

                          <input
                              type="text"
                              name="ffposition"
                              id={member.id}
                              className="input-position"
                              value={data[index].ffposition}
                              onChange={handleChange}
                          />

                          <img
                              src="https://drive.google.com/uc?export=download&id=15q0SsoW8GseByceDXJxG7UaclNQYBVJY"
                              className={`fireTruck fireTruck-${index}`}
                              style={{ display: "none" }}
                              alt='Fire truck'
                              title="©: freepik.com -  https://www.freepik.com/"
                          />

                          <img
                              src="https://drive.google.com/uc?export=download&id=1u2Eib4hTRffN1aaTLscKze-L6dLN0RKl"
                              name="memberInfoBtn"
                              id={`memberInfoBtn-${index}`}
                              className="memberInfoBtn"
                              alt="Arrow"
                              title={`Info aufklappen.
                                          ©: deemakdaksina - https://www.flaticon.com/authors/deemakdaksina `}
                              onClick={() => {
                              toggleMemberInfo(index);
                              }}
                          />
                          </section>

                          {/* Member info Form fields */}

                          <section
                          id={`infoSection-${index}`}
                          className="member-section-toToggle"
                          style={{ display: "none" }}
                          >
                          <div className="memberInfo-wrapper">
                              <h3 className="memberInfos-h3">Infos</h3>
                              <textarea
                              name="textarea"
                              id={member.id}
                              className="input-textarea"
                              value={data[index].textarea}
                              onChange={handleChange}
                              />

                          </div>

                          <div className="uniformenTypes-div gala-wrapper">
                              <h3>Galauniformen</h3>

                              <div className="galaLabel-div uniformenLabels-div">
                              <p className="uLabelsP1">Größe</p>
                              <p className=".uLabelsP2" title="Bereits ausgegeben?">
                                  aus?
                              </p>
                              </div>

                              <div className="mantel-div uniformenAssets-divs galaAsset">
                              <p>Mantel</p>

                              <input
                                  type="text"
                                  name="mantelS"
                                  id={member.id}
                                  value={data[index].mantelS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="mantelB"
                                  id={member.id}
                                  checked={data[index].mantelB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="jacke-div uniformenAssets-divs galaAsset">
                              <p>Jacke</p>

                              <input
                                  type="text"
                                  name="jackeS"
                                  id={member.id}
                                  value={data[index].jackeS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="jackeB"
                                  id={member.id}
                                  checked={data[index].jackeB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="hose-rock-div uniformenAssets-divs galaAsset">
                              <p>Hose</p>

                              <input
                                  type="text"
                                  name="hoseS"
                                  id={member.id}
                                  value={data[index].hoseS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="hoseB"
                                  id={member.id}
                                  checked={data[index].hoseB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="hemd-div uniformenAssets-divs galaAsset">
                              <p>Hemd</p>

                              <input
                                  type="text"
                                  name="hemdS"
                                  id={member.id}
                                  value={data[index].hemdS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="hemdB"
                                  id={member.id}
                                  checked={data[index].hemdB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="kappe-div uniformenAssets-divs galaAsset">
                              <p>Kappe</p>

                              <input
                                  type="text"
                                  name="kappeS"
                                  id={member.id}
                                  value={data[index].kappeS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="kappeB"
                                  id={member.id}
                                  checked={data[index].kappeB || false}
                                  onChange={handleChange}
                              />
                              </div>
                          </div>

                          <div className="uniformenTypes-div dienst-wrapper">
                              <h3>Dienstbekleidung</h3>

                              <div className="dienstbekleidungLabel-div uniformenLabels-div">
                              <p className="uLabelsP1">Größe</p>
                              <p className="uLabelsP2" title="Bereits ausgegeben?">
                                  aus?
                              </p>
                              </div>

                              <div className="pullover-div uniformenAssets-divs dienstAsset">
                              <p>Pullover</p>

                              <input
                                  type="text"
                                  name="pulloverS"
                                  id={member.id}
                                  value={data[index].pulloverS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="pulloverB"
                                  id={member.id}
                                  checked={data[index].pulloverB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="hose2-div uniformenAssets-divs dienstAsset">
                              <p>Hose</p>

                              <input
                                  type="text"
                                  name="hose2S"
                                  id={member.id}
                                  value={data[index].hose2S}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="hose2B"
                                  id={member.id}
                                  checked={data[index].hose2B || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="tshirt-div uniformenAssets-divs dienstAsset">
                              <p>T-Shirt</p>

                              <input
                                  type="text"
                                  name="tshirtS"
                                  id={member.id}
                                  value={data[index].tshirtS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="tshirtB"
                                  id={member.id}
                                  checked={data[index].tshirtB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="polo-div uniformenAssets-divs dienstAsset">
                              <p>Polo</p>

                              <input
                                  type="text"
                                  name="poloS"
                                  id={member.id}
                                  value={data[index].poloS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="poloB"
                                  id={member.id}
                                  checked={data[index].poloB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="Bluse-div uniformenAssets-divs dienstAsset">
                              <p>Bluse</p>

                              <input
                                  type="text"
                                  name="bluseS"
                                  id={member.id}
                                  value={data[index].bluseS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="bluseB"
                                  id={member.id}
                                  checked={data[index].bluseB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="fleece-div uniformenAssets-divs dienstAsset">
                              <p>Fleece</p>

                              <input
                                  type="text"
                                  name="fleeceS"
                                  id={member.id}
                                  value={data[index].fleeceS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="fleeceB"
                                  id={member.id}
                                  checked={data[index].fleeceB || false}
                                  onChange={handleChange}
                              />
                              </div>
                          </div>

                          <div className="uniformenTypes-div einsatz-wrapper">
                              <h3>Einsatzuniform</h3>

                              <div className="einsatzuniformenLabel-div uniformenLabels-div">
                              <p className="uLabelsP1">Größe</p>
                              <p className="uLabelsP2" title="Bereits ausgegeben?">
                                  aus?
                              </p>
                              </div>

                              <div className="schutzjacke-div uniformenAssets-divs einsatzAsset">
                              <p>Schutzjacke</p>

                              <input
                                  type="text"
                                  name="schutzjackeS"
                                  id={member.id}
                                  value={data[index].schutzjackeS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="schutzjackeB"
                                  id={member.id}
                                  checked={data[index].schutzjackeB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="schutzhose-div uniformenAssets-divs einsatzAsset">
                              <p>Schutzhose</p>

                              <input
                                  type="text"
                                  name="schutzhoseS"
                                  id={member.id}
                                  value={data[index].schutzhoseS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="schutzhoseB"
                                  id={member.id}
                                  checked={data[index].schutzhoseB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="einsatzstiefelschwarz-div uniformenAssets-divs einsatzAsset">
                              <p>Einsatzstiefel schwarz</p>

                              <input
                                  type="text"
                                  name="einsatzstiefelschwarzS"
                                  id={member.id}
                                  value={data[index].einsatzstiefelschwarzS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="einsatzstiefelschwarzB"
                                  id={member.id}
                                  checked={data[index].einsatzstiefelschwarzB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="einsatzstiefelgelb-div uniformenAssets-divs einsatzAsset">
                              <p>Einsatzstiefel gelb</p>

                              <input
                                  type="text"
                                  name="einsatzstiefelgelbS"
                                  id={member.id}
                                  value={data[index].einsatzstiefelgelbS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="einsatzstiefelgelbB"
                                  id={member.id}
                                  checked={data[index].einsatzstiefelgelbB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="einsatzhandschuhe-div uniformenAssets-divs einsatzAsset">
                              <p>Einsatzhandschuhe</p>

                              <input
                                  type="text"
                                  name="einsatzhandschuheS"
                                  id={member.id}
                                  value={data[index].einsatzhandschuheS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="einsatzhandschuheB"
                                  id={member.id}
                                  checked={data[index].einsatzhandschuheB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="einsatzstiefel-div uniformenAssets-divs einsatzAsset">
                              <p>Einsatzstiefel</p>

                              <input
                                  type="text"
                                  name="einsatzstiefelS"
                                  id={member.id}
                                  value={data[index].einsatzstiefelS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="einsatzstiefelB"
                                  id={member.id}
                                  checked={data[index].einsatzstiefelB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="kappe3-div uniformenAssets-divs einsatzAsset">
                              <p>Kappe</p>

                              <input
                                  type="text"
                                  name="kappe3S"
                                  id={member.id}
                                  value={data[index].kappe3S}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="kappe3B"
                                  id={member.id}
                                  checked={data[index].kappe3B || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="haube-div uniformenAssets-divs einsatzAsset">
                              <p>haube</p>

                              <input
                                  type="text"
                                  name="haubeS"
                                  id={member.id}
                                  value={data[index].haubeS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="haubeB"
                                  id={member.id}
                                  checked={data[index].haubeB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="helm-div uniformenAssets-divs einsatzAsset">
                              <p>Helm</p>

                              <input
                                  type="text"
                                  name="helmS"
                                  id={member.id}
                                  value={data[index].helmS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="helmB"
                                  id={member.id}
                                  checked={data[index].helmB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className="Gurt-div uniformenAssets-divs einsatzAsset">
                              <p>Gurt</p>

                              <input
                                  type="text"
                                  name="GurtS"
                                  id={member.id}
                                  value={data[index].GurtS}
                                  onChange={handleChange}
                              />

                              <input
                                  type="checkbox"
                                  name="GurtB"
                                  id={member.id}
                                  checked={data[index].GurtB || false}
                                  onChange={handleChange}
                              />
                              </div>
                          </div>

                          <div className="firestore-manipulate-div">

                                  <input
                                      type="button"
                                      name="updateBtn"
                                      id={member.id}
                                      title="Update die Daten der/des Kamerad:in in der Datenbank"
                                      className={`updateBtn update-${member.id}`}
                                      onClick={(event) => {
                                      handleUpdateFirestoreMember(member.id);
                                      }}
                                      defaultValue="update"
                                  />

                              <img
                                  src="https://drive.google.com/uc?export=download&id=1L1sxkr7IVMtQEHTjFgWudgX7jWbLJ8-c"
                                  className="memberInfo-fireImage"
                                  alt="Fire distinguisher"
                                  title="©: BZZRINCANTATION - https://www.flaticon.com/authors/BZZRINCANTATION"
                                  />

                                  <input
                                      type="button"
                                      name="deleteBtn"
                                      id={member.id}
                                      title="Kamerad:in unwiderruflich aus der Datenbank löschen"
                                      className={`deleteBtn delete-${member.id}`}
                                      onClick={(event) => {
                                      handleDeleteFirestoreMember(member.id);
                                      }}
                                      defaultValue="löschen"
                                  />
                          </div>
                          </section>
                      </form>
                      ))
                  )}
                  </div>
              </main>
      
            <Searchbar data={data} />

     </div>
      
  );
};
