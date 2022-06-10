import '../styles/DetailedSearchbar.css';
import React, { useState, Component } from 'react'
import Select from 'react-select'

export default function DetailedSearchbar(props){

    const [ searchPosition, setSearchPosition ] = useState('');
    const [ mantel1, setMantel1 ] = useState('');

    const options = [
        { value: true, label: 'Ja' },
        { value: false, label: 'Nein' }
      ]

    // function handleChange(event){
    //     event.preventDefault();

    //     // set state
    //     if(event.target.name === 'firstName'){
    //         setSearchFirstName(event.target.value);
    //     }else if(event.target.name === 'lastName'){
    //         setSearchLastName(event.target.value);
    //     } else if(event.target.name === 'ffposition'){
    //         setSearchPosition(event.target.value);
    //     };
        
    // };

    // function getSearchedObject(){
        
    //     let matchingObjects = [];

    //     //#region Search conditions

    //     // If user searches only with only one string (next 3 conditions)
    //     if(searchFirstName.length !== 0 && searchLastName.length === 0 && searchPosition.length === 0){
    //         // Map trough firestore data array
    //         props.data.map(el => {
    //             // If the firstName string of the element contains the searchstring
    //             if(el.firstName.indexOf(searchFirstName) !== -1){
    //                 // Push object to array
    //             matchingObjects.push(el);
    //             };   
    //             return true;
    //         });
    //     };

    //     if(searchLastName.length !== 0 && searchFirstName.length === 0 && searchPosition.length === 0){
    //         props.data.map(el => {
    //             if(el.lastName.indexOf(searchLastName) !== -1){
    //             matchingObjects.push(el);
    //             };   
    //             return true;
    //         });
    //     };

    //     if(searchPosition.length !== 0 && searchLastName.length === 0 && searchFirstName.length === 0){
    //         props.data.map(el => {
    //             if(el.ffposition.indexOf(searchPosition) !== -1){
    //             matchingObjects.push(el);
    //             };   
    //             return true;
    //         });
    //     };

    //     // If user is searching with all 3 strings
    //     if(searchPosition.length !== 0 && searchLastName.length !== 0 && searchFirstName.length !== 0){
    //         props.data.map(el => {
    //             if(el.firstName.indexOf(searchFirstName) !== -1 && el.lastName.indexOf(searchLastName) !== -1 &&  el.ffposition.indexOf(searchPosition) !== -1){
    //             matchingObjects.push(el);
    //             };   
    //             return true;
    //         });
    //     };

    //     // If user is searching with 2 strings (next 3 conditions)
    //     if(searchPosition.length !== 0 && searchLastName.length !== 0 && searchFirstName.length === 0){
    //         props.data.map(el => {
    //             if(el.firstName.indexOf(searchFirstName) !== -1 && el.lastName.indexOf(searchLastName) !== -1){
    //             matchingObjects.push(el);
    //             };   
    //             return true;
    //         });
    //     };

    //     if(searchPosition.length !== 0 && searchLastName.length === 0 && searchFirstName.length !== 0){
    //         props.data.map(el => {
    //             if(el.firstName.indexOf(searchFirstName) !== -1 &&  el.ffposition.indexOf(searchPosition) !== -1){
    //             matchingObjects.push(el);
    //             };   
    //             return true;
    //         });
    //     };

    //     if(searchPosition.length === 0 && searchLastName.length !== 0 && searchFirstName.length !== 0){
    //         props.data.map(el => {
    //             if(el.lastName.indexOf(searchLastName) !== -1 &&  el.ffposition.indexOf(searchPosition) !== -1){
    //             matchingObjects.push(el);
    //             };   
    //             return true;
    //         });
    //     };

    //     //#endregion

    //     if(matchingObjects.length > 0) { // If at least one object with id is in array
            
    //         // Hide every no matches 
    //         const allFormsArr = document.querySelectorAll('.member-forms');
    //         for (const form of allFormsArr) {
    //                 form.style.display = 'none';
    //         };
    //         // Show match 
    //         for(let i = 0; i < matchingObjects.length; i++){
    //             document.querySelector(`.member-formMID-${matchingObjects[i].id}`).style.display = 'flex';
    //         };

    //     } else { // Alert no match

    //         window.alert(`Die Suche war leider nicht erolgreich`);
            
    //     };

    // };

    // function handleClick(event){
    //     event.preventDefault();

    //     if(event.target.name === 'search'){
    //         getSearchedObject();
    //     } else if(event.target.name === 'remove'){
    //         // Set back input fields
    //         setSearchFirstName('');
    //         setSearchLastName('');
    //         setSearchPosition('');
    //         const allFormsArr = document.querySelectorAll('.member-forms');
    //         for (const form of allFormsArr) {
    //                 form.style.display = 'flex';
    //         };
    //     };

    // };


    return (

            <div className='DetailedSearchbar'  style={{transform: 'scale(0)'}}>

                    <section className='dSearchGalauniformen dSearchUniformen-Sections'>
                        <h3>Galauniformen</h3>
                        <div>
                             <h4></h4>
                        </div>
                            <Select options={options} className='select' isClearable='true' onChange={(choice) => {
                                choice === null 
                                    ? setMantel1(undefined) 
                                    : setMantel1(choice.value)
                                }} />
                    </section>        

                    <section className='dSearchDienstuniformen dSearchUniformen-Sections'>
                        <h3>Dienstuniformen</h3>

                    </section>        

                    <section className='dSearchEinsatzuniformen dSearchUniformen-Sections'>
                        <h3>Einsatzuniformen</h3>

                    </section>        

                    <section className='dSearchButtons'>
                        <button className='dSearchSearchBtn' >suchen</button>
                        <button className='dSearchDeleteBtn' >löschen</button>
                    </section>

            </div>
    );
    
};