import '../styles/DetailedSearchbar.css';
import React, { useState } from 'react'
import Select from 'react-select'
import DeleteSearchResult from '../components/DeleteSearchResult';

export default function DetailedSearchbar(props){

  //#region state
    const [ ffposition, setffposition ] = useState('');
    const [ mantelB, setMantelB ] = useState('');
    const [ jackeB, setJackeB ] = useState('');
    const [ hoseB, setHoseB ] = useState('');
    const [ hemdB, setHemdB ] = useState('');
    const [ kappeB, setKappeB ] = useState('');
    const [ pulloverB, setPulloverB ] = useState('');
    const [ hose2B, setHose2B ] = useState('');
    const [ tshirtB, setTshirtB ] = useState('');
    const [ poloB, setPoloB ] = useState('');
    const [ bluseB, setBluseB ] = useState('');
    const [ fleeceB, setFleeceB ] = useState('');
    const [ schutzjackeB, setSchutzjackeB ] = useState('');
    const [ schutzhoseB, setSchutzhoseB ] = useState('');
    const [ einsatzstiefelschwarzB, setEinsatzstiefelschwarzB ] = useState('');
    const [ einsatzstiefelgelbB, setEinsatzstiefelgelbB ] = useState('');
    const [ einsatzhandschuheB, setEinsatzhandschuheB ] = useState('');
    const [ kappe3B, setKappe3B ] = useState('');
    const [ haubeB, setHaubeB ] = useState('');
    const [ helmB, setHelmB ] = useState('');
    const [ gurtB, setGurtB ] = useState('');
//#endregion

   // react-select options
    const options = [
        { value: true, label: 'Ja' },
        { value: false, label: 'Nein' }
      ]

    function handleSearch (){

        // Get all paramters from DetailedSearchbar()
        const searchParameters = {

          ffposition: ffposition,

          mantelB: mantelB,
          jackeB: jackeB,
          hoseB: hoseB,
          hemdB: hemdB,
          kappeB: kappeB,

          pulloverB: pulloverB,
          hose2B: hose2B,
          tshirtB: tshirtB,
          poloB: poloB,
          bluseB: bluseB,
          fleeceB: fleeceB,

          schutzjackeB: schutzjackeB,
          schutzhoseB: schutzhoseB,
          einsatzstiefelschwarzB: einsatzstiefelschwarzB,
          einsatzstiefelgelbB: einsatzstiefelgelbB,
          einsatzhandschuheB: einsatzhandschuheB,
          kappe3B: kappe3B,
          haubeB: haubeB,
          helmB: helmB,
          gurtB: gurtB,

        };

        let selectedParameters = [];
        // iterate trough all parameters
       for (const key in searchParameters) {
          if (Object.hasOwnProperty.call(searchParameters, key)) {
               const element = searchParameters[key];
               // If ffposition is selected, push key and element to array
               if(key === 'ffposition' && element !== ""){selectedParameters.push([key, element, true])};
               // if any parameter is true, push key to array
               if(element === true || element === false) selectedParameters.push([key, element])
          }
       }

       let foundMembers = [];

       // loop trough data
       for (const member of props.data) {
          // loop trough member object
         for (const key in member) {
          // get all keys and elements from member
          if (Object.hasOwnProperty.call(member, key)) {
                    // loop trough trough selected parammeters
                    selectedParameters.forEach(e => {
                         // If key matches with a selected parameter its a match, but...
                         if(e[0] === key) {
                    // Testing if the corresponnend boolean parameter must be done, to check if the paramater is setted true and not false 
                    // Get the boolean key string without last charswqA
                    let getBool = key.slice(0, -1);
                    // replace it with B
                    getBool += 'B';
                    // if search parameter is true & not ffposition
                    if(e[1] === true && e.length !== 3){          
                    // if the boolean value of the matched parameter of this member is set true, match is perfect, push it to the foundMembers array. except...
                    if(member[getBool]=== true){
                         // exception: if position parameter is given, check if the found  member match with it
                         if(key === 'ffposition' && ffposition !== ''){
                              if(member.ffposition === ffposition){
                                   foundMembers.push(member.id);
                              } else {return;};
                         }
                         foundMembers.push(member.id);
                    };

               } else if (e[1] === false && e.length !== 3){
               
                    // if the boolean value of the matched parameter of this member is set not true, match is perfect,...
                    if(member[getBool] === false){
                         
                         // exception: if position parameter is given, check if the found  member match with it
                         if(key === 'ffposition' && ffposition === ''){
                              if(member.ffposition === ffposition){
                                   foundMembers.push(member.id);
                              } else {return;};
                         }
                         foundMembers.push(member.id);
                    };
                         // If ffposition is the only parameter, key and value matches, match is perfect 
               } else if (selectedParameters.length === 1 && key === 'ffposition' && member.ffposition === ffposition){
                    foundMembers.push(member.id);
               };
                  };
               });
            };
         };
       }; 

          // Remove double matches from IDArray (if one member matched with more than 1 parameter, his ID would be more than once in foundMembers)
          let uniqueIDArray = foundMembers.filter((element, index) => {
               return foundMembers.indexOf(element) === index;
          });

          // Hide every no matches 
          const allFormsArr = document.querySelectorAll('.member-forms');
          for (const form of allFormsArr) {
                    form.style.display = 'none';
          };
          // Show match 
          for(let i = 0; i < uniqueIDArray.length; i++){
               document.querySelector(`.member-formMID-${uniqueIDArray[i]}`).style.display = 'flex';
          };

          // notificate user about match result
          if(uniqueIDArray.length < 1){
               window.alert(`Die Suche war leider nicht erfolgreich...`);
               DeleteSearchResult();
          } else {window.alert(`Die Suche war erfolgreich!`);}; //  

       console.log(uniqueIDArray);

    };

    function handleDelete () {
            // Set back input fields
            setffposition('');
            DeleteSearchResult();        
    };

    return (

            <div className='DetailedSearchbar'  style={{transform: 'scale(0)'}}>
                    <section className='leftSection'>
                            <h3>Dienstgrad</h3>
                            <input className='dffposition-input' onChange={(event) => {setffposition(event.target.value)}} value={ffposition} />
                    
                            <div className='dSearchButtons'>
                                <button className='dSearchSearchBtn' onClick={handleSearch}>suchen</button>
                                <button className='dSearchDeleteBtn' onClick={handleDelete}>löschen</button>
                                <button className='dSearchToggleBtn' onClick={() => {props.toggle(true)}}>zurück</button>
                            </div>
                    </section>

                    <section className='dSearchGalauniformen dSearchUniformen-Sections'>
                        <h3>Galauniformen</h3>
                        <div className='dSearch-assets'>
                             <h4>Mantel</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setMantelB(undefined): setMantelB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Jacke</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setJackeB(undefined): setJackeB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Hose</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setHoseB(undefined): setHoseB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Hemd</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setHemdB(undefined): setHemdB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Kappe</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setKappeB(undefined): setKappeB(choice.value) }} />
                        </div>
                    </section>        

                    <section className='dSearchDienstuniformen dSearchUniformen-Sections'>
                        <h3>Dienstuniformen</h3>
                        <div className='dSearch-assets'>
                             <h4>Pullover</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setPulloverB(undefined): setPulloverB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Hose</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setHose2B(undefined): setHose2B(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>T-Shirt</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setTshirtB(undefined): setTshirtB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Polo</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setPoloB(undefined): setPoloB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Bluse</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setBluseB(undefined): setBluseB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Fleece</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setFleeceB(undefined): setFleeceB(choice.value) }} />
                        </div>
                    </section>        

                    <section className='dSearchEinsatzuniformen dSearchUniformen-Sections'>
                        <h3>Einsatzuniformen</h3>
                        <div className='dSearch-assets'>
                             <h4>Schutzjacke</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setSchutzjackeB(undefined): setSchutzjackeB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Schutzhose</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setSchutzhoseB(undefined): setSchutzhoseB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Einsatzstiefel schwarz</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setEinsatzstiefelschwarzB(undefined): setEinsatzstiefelschwarzB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Einsatzstiefel gelb</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setEinsatzstiefelgelbB(undefined): setEinsatzstiefelgelbB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Einsatzhandschuhe</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setEinsatzhandschuheB(undefined): setEinsatzhandschuheB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Kappe</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setKappe3B(undefined): setKappe3B(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Haube</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setHaubeB(undefined): setHaubeB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Helm</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setHelmB(undefined): setHelmB(choice.value) }} />
                        </div>
                        <div className='dSearch-assets'>
                             <h4>Gurt</h4>
                             <Select options={options} className='dSearch-select' isClearable='true' onChange={(choice) => { choice === null ? setGurtB(undefined): setGurtB(choice.value) }} />
                        </div>
                    </section>        

            </div>
    );
    
};