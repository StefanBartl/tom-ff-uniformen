import '../styles/DetailedNewMember.css';
import React, { useState } from 'react'
import Select from 'react-select'
import DeleteSearchResult from '../components/DeleteSearchResult';
import firestoreUIEffect from '../components/FirestoreUIEffect';

// ? Firebasefirestore  imports for add new member
import { db } from '../firebase-config';
import {
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';

export default function DetailedNewMember (props) {

  //#region state
  const [ firstname, setFirstName ] = useState('');
  const [ lastname, setLastName ] = useState('');
  const [ ffposition, setffposition ] = useState('');
  const [ textarea, setTextarea ] = useState('');

  const [ mantelB, setMantelB ] = useState(false);
  const [ jackeB, setJackeB ] = useState(false);
  const [ hoseB, setHoseB ] = useState(false);
  const [ hemdB, setHemdB ] = useState(false);
  const [ kappeB, setKappeB ] = useState(false);
  const [ pulloverB, setPulloverB ] = useState(false);
  const [ hose2B, setHose2B ] = useState(false);
  const [ tshirtB, setTshirtB ] = useState(false);
  const [ poloB, setPoloB ] = useState(false);
  const [ bluseB, setBluseB ] = useState(false);
  const [ fleeceB, setFleeceB ] = useState(false);
  const [ schutzjackeB, setSchutzjackeB ] = useState(false);
  const [ schutzhoseB, setSchutzhoseB ] = useState(false);
  const [ einsatzstiefelschwarzB, setEinsatzstiefelschwarzB ] = useState(false);
  const [ einsatzstiefelgelbB, setEinsatzstiefelgelbB ] = useState(false);
  const [ einsatzhandschuheB, setEinsatzhandschuheB ] = useState(false);
  const [ kappe3B, setKappe3B ] = useState(false);
  const [ haubeB, setHaubeB ] = useState(false);
  const [ helmB, setHelmB ] = useState(false);
  const [ gurtB, setGurtB ] = useState(false);

  const [ mantelS, setMantelS ] = useState('');
  const [ jackeS, setJackeS ] = useState('');
  const [ hoseS, setHoseS ] = useState('');
  const [ hemdS, setHemdS ] = useState('');
  const [ kappeS, setKappeS ] = useState('');
  const [ pulloverS, setPulloverS ] = useState('');
  const [ hose2S, setHose2S ] = useState('');
  const [ tshirtS, setTshirtS ] = useState('');
  const [ poloS, setPoloS ] = useState('');
  const [ bluseS, setBluseS ] = useState('');
  const [ fleeceS, setFleeceS ] = useState('');
  const [ schutzjackeS, setSchutzjackeS ] = useState('');
  const [ schutzhoseS, setSchutzhoseS ] = useState('');
  const [ einsatzstiefelschwarzS, setEinsatzstiefelschwarzS ] = useState('');
  const [ einsatzstiefelgelbS, setEinsatzstiefelgelbS ] = useState('');
  const [ einsatzhandschuheS, setEinsatzhandschuheS ] = useState('');
  const [ kappe3S, setKappe3S ] = useState('');
  const [ haubeS, setHaubeS ] = useState('');
  const [ helmS, setHelmS ] = useState('');
  const [ gurtS, setGurtS ] = useState('');

//#endregion

 // react-select options
  const options = [
      { value: true, label: 'Ja' },
      { value: false, label: 'Nein' }
    ];


  // Add a new member to the firestore database
  const handleSaveNewFirestoreMember = async () => {

    if (firstname === '' || lastname === '' || ffposition === '') {
      alert('Bitte gib Vorname, Nachname und Dienstgrad ein!');
      document.querySelector('.dNewMember-back-button').click();
      return;
    }

    // Store new member in firestore database
    const dataCollectionRef = collection(db, 'uniformen');
    await setDoc(
      doc(dataCollectionRef,  `${props.data.length + 1}`),
      {
        id: props.data.length + 1,
        firstName: firstname,
        lastName: lastname,
        ffposition: ffposition,
        textarea: textarea,
        mantelS: mantelS,
        mantelB: mantelB,
        jackeS: jackeS,
        jackeB: jackeB,
        hoseS: hoseS,
        hoseB: hoseB,
        hemdS: hemdS,
        hemdB: hemdB,
        kappeS: kappeS,
        kappeB: kappeB,

        pulloverS: pulloverS,
        pulloverB: pulloverB,
        hose2S: hose2S,
        hose2B: hose2B,
        tshirtS: tshirtS,
        tshirtB: tshirtB,
        poloS: poloS,
        poloB: poloB,
        bluseS: bluseS,
        bluseB: bluseB,
        fleeceS: fleeceS,
        fleeceB: fleeceB,

        schutzjackeS: schutzjackeS,
        schutzjackeB: schutzjackeB,
        schutzhoseS: schutzhoseS,
        schutzhoseB: schutzhoseB,
        einsatzstiefelschwarzS: einsatzstiefelschwarzS,
        einsatzstiefelschwarzB: einsatzstiefelschwarzB,
        einsatzstiefelgelbS: einsatzstiefelgelbS,
        einsatzstiefelgelbB: einsatzstiefelgelbB,
        einsatzhandschuheS: einsatzhandschuheS,
        einsatzhandschuheB: einsatzhandschuheB,
        kappe3S: kappe3S,
        kappe3B: kappe3B,
        haubeS: haubeS,
        haubeB: haubeB,
        helmS: helmS,
        helmB: helmB,
        gurtS: gurtS,
        gurtB: gurtB,
      }
    );
    firestoreUIEffect('save', props.data.length);
  };


  return (

    <div className='Detailed-new-Member'  style={{transform: 'scale(0)'}}>

            <section className='leftSection'>
                     <h3>Vorname</h3>
                    <input name='firstName' className='dNM-text-input' onChange={(event) => {setFirstName(event.target.value)}} value={firstname} />
                    <h3>Nachname</h3>
                    <input name='lastName' className='dNM-text-input' onChange={(event) => {setLastName(event.target.value)}} value={lastname} />
                    <h3>Dienstgrad</h3>
                    <input name='ffposition' className='dNM-text-input' onChange={(event) => {setffposition(event.target.value)}} value={ffposition} />
                    <h3>Infos</h3>
                    <textarea name='textarea' className='dNM-text-input' onChange={(event) => {setTextarea(event.target.value)}} value={textarea}   />         

                    <div className='dNewMember-Buttons'>
                        <button className='dNewMember-anlegen-button consoleBtn' onClick={handleSaveNewFirestoreMember}>anlegen</button>
                        <button className='dNewMember-back-button consoleBtn' onClick={() => {props.toggle(true)}}>zurück</button>
                    </div>
            </section>

            <section className='dNMGalauniformen dNMUniformen-Sections'>
                <h3>Galauniformen</h3>
                <div className='dNM-assets'>
                    <h4>Mantel</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setMantelS(event.target.value)}} value={mantelS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setMantelB(undefined): setMantelB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Jacke</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setJackeS(event.target.value)}} value={jackeS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setJackeB(undefined): setJackeB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Hose</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setHoseS(event.target.value)}} value={hoseS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setHoseB(undefined): setHoseB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Hemd</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setHemdS(event.target.value)}} value={hemdS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setHemdB(undefined): setHemdB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Kappe</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setKappeS(event.target.value)}} value={kappeS}   /> 
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setKappeB(undefined): setKappeB(choice.value) }} />
                </div>
            </section>        

            <section className='dNMDienstuniformen dNMUniformen-Sections'>
                <h3>Dienstuniformen</h3>
                <div className='dNM-assets'>
                    <h4>Pullover</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setPulloverS(event.target.value)}} value={pulloverS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setPulloverB(undefined): setPulloverB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Hose</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setHose2S(event.target.value)}} value={hose2S}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setHose2B(undefined): setHose2B(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>T-Shirt</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setTshirtS(event.target.value)}} value={tshirtS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setTshirtB(undefined): setTshirtB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Polo</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setPoloS(event.target.value)}} value={poloS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setPoloB(undefined): setPoloB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Bluse</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setBluseS(event.target.value)}} value={bluseS}   />     
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setBluseB(undefined): setBluseB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Fleece</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setFleeceS(event.target.value)}} value={fleeceS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setFleeceB(undefined): setFleeceB(choice.value) }} />
                </div>
            </section>        

            <section className='dNMEinsatzuniformen dNMUniformen-Sections'>
                <h3>Einsatzuniformen</h3>
                <div className='dNM-assets'>
                    <h4>Schutzjacke</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setSchutzjackeS(event.target.value)}} value={schutzjackeS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setSchutzjackeB(undefined): setSchutzjackeB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Schutzhose</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setSchutzhoseS(event.target.value)}} value={schutzhoseS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setSchutzhoseB(undefined): setSchutzhoseB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Einsatzstiefel schwarz</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setEinsatzstiefelschwarzS(event.target.value)}} value={einsatzstiefelschwarzS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setEinsatzstiefelschwarzB(undefined): setEinsatzstiefelschwarzB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Einsatzstiefel gelb</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setEinsatzstiefelgelbS(event.target.value)}} value={einsatzstiefelgelbS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setEinsatzstiefelgelbB(undefined): setEinsatzstiefelgelbB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Einsatzhandschuhe</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setEinsatzhandschuheS(event.target.value)}} value={einsatzhandschuheS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setEinsatzhandschuheB(undefined): setEinsatzhandschuheB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Kappe</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setKappe3S(event.target.value)}} value={kappe3S}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setKappe3B(undefined): setKappe3B(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Haube</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setHaubeS(event.target.value)}} value={haubeS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setHaubeB(undefined): setHaubeB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Helm</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setHelmS(event.target.value)}} value={helmS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setHelmB(undefined): setHelmB(choice.value) }} />
                </div>
                <div className='dNM-assets'>
                    <h4>Gurt</h4>
                    <input type='text' className='dNM-text-input-uniforms' onChange={(event) => {setGurtS(event.target.value)}} value={gurtS}   />         
                    <Select options={options} className='dNM-select' isClearable='true' onChange={(choice) => { choice === null ? setGurtB(undefined): setGurtB(choice.value) }} />
                </div>
            </section>        

    </div>
  );
  
};