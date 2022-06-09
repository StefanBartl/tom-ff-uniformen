import { useState } from 'react';
import InsertElementAfterNode from '../components/InsertElementAfterNode';
import '../styles/Searchbar.css';

export default function Searchbar(props){

    const [ searchFirstName, setSearchFirstName ] = useState('');
    const [ searchLastName, setSearchLastName ] = useState('');
    const [ searchPosition, setSearchPosition ] = useState('');
    // const [ matchingObject, setMatchingObject ] = useState({});

    function handleChange(event){
        event.preventDefault();

        // set state
        if(event.target.name === 'firstName'){
            setSearchFirstName(event.target.value);
        }else if(event.target.name === 'lastName'){
            setSearchLastName(event.target.value);
        } else if(event.target.name === 'ffposition'){
            setSearchPosition(event.target.value);
        };
        
    };

    function getSearchedObject(){
        
        let matchingObjects = [];

        //#region Search conditions

        // If user searches only with only one string (next 3 conditions)
        if(searchFirstName.length !== 0 && searchLastName.length === 0 && searchPosition.length === 0){
            // Map trough firestore data array
            props.data.map(el => {
                // If the firstName string of the element contains the searchstring
                if(el.firstName.indexOf(searchFirstName) !== -1){
                    // Push object to array
                matchingObjects.push(el);
                };   
            });
        };

        if(searchLastName.length !== 0 && searchFirstName.length === 0 && searchPosition.length === 0){
            props.data.map(el => {
                if(el.lastName.indexOf(searchLastName) !== -1){
                matchingObjects.push(el);
                };   
            });
        };

        if(searchPosition.length !== 0 && searchLastName.length === 0 && searchFirstName.length === 0){
            props.data.map(el => {
                if(el.ffposition.indexOf(searchPosition) !== -1){
                matchingObjects.push(el);
                };   
            });
        };

        // If user is searching with all 3 strings
        if(searchPosition.length !== 0 && searchLastName.length !== 0 && searchFirstName.length !== 0){
            props.data.map(el => {
                if(el.firstName.indexOf(searchFirstName) !== -1 && el.lastName.indexOf(searchLastName) !== -1 &&  el.ffposition.indexOf(searchPosition) !== -1){
                matchingObjects.push(el);
                };   
            });
        };

        // If user is searching with 2 strings (next 3 conditions)
        if(searchPosition.length !== 0 && searchLastName.length !== 0 && searchFirstName.length === 0){
            props.data.map(el => {
                if(el.firstName.indexOf(searchFirstName) !== -1 && el.lastName.indexOf(searchLastName) !== -1){
                matchingObjects.push(el);
                };   
            });
        };

        if(searchPosition.length !== 0 && searchLastName.length === 0 && searchFirstName.length !== 0){
            props.data.map(el => {
                if(el.firstName.indexOf(searchFirstName) !== -1 &&  el.ffposition.indexOf(searchPosition) !== -1){
                matchingObjects.push(el);
                };   
            });
        };

        if(searchPosition.length === 0 && searchLastName.length !== 0 && searchFirstName.length !== 0){
            props.data.map(el => {
                if(el.lastName.indexOf(searchLastName) !== -1 &&  el.ffposition.indexOf(searchPosition) !== -1){
                matchingObjects.push(el);
                };   
            });
        };

        //#endregion

        if(matchingObjects.length > 0) { // If at least one object with id is in array
            
            // Hide every no matches 
            const allFormsArr = document.querySelectorAll('.member-forms');
            for (const form of allFormsArr) {
                    form.style.display = 'none';
            };
            // Show match 
            for(let i = 0; i < matchingObjects.length; i++){
                document.querySelector(`.member-formMID-${matchingObjects[i].id}`).style.display = 'flex';
            };

        } else { // Show no match
            // Lock search button 
            document.querySelector('.searchBtn').style.pointerEvents = 'none';

            // Create element
            const noMatch = document.createElement('div');
            noMatch.classList.add('noMatch-class');
            noMatch.innerText = `Leider kein Treffer!`;
            noMatch.id = 'noMatch-Div';
            // Insert it in DOM
            InsertElementAfterNode(document.querySelector('.searchbarToggle'), noMatch);
            // Create and appen animation
            const noMatchEffect = [
                { opacity: '0'},
                { opacity: '1'},
                { opacity: '0'},
                { opacity: '1'},
                { opacity: '0'},
                { opacity: '1'},
                { opacity: '0'}
              ];
            
              const noMatchTiming = { 
                  duration: 2000,
                  iterations: 1,
                  fill: 'forwards' ,
                  easing: 'ease-in', 
              };
            document.getElementById('noMatch-Div').animate(noMatchEffect, noMatchTiming);
            // set search button active again and remove element from dom after 2 seconds
            setTimeout(() => {
                document.getElementById('noMatch-Div').remove();
                document.querySelector('.searchBtn').style.pointerEvents = 'all';
        }, 2000);

        };

    };

    function handleClick(event){
        event.preventDefault();

        if(event.target.name === 'search'){
            getSearchedObject();
        } else if(event.target.name === 'remove'){
            // Set back input fields
            setSearchFirstName('');
            setSearchLastName('');
            setSearchPosition('');
            const allFormsArr = document.querySelectorAll('.member-forms');
            for (const form of allFormsArr) {
                    form.style.display = 'flex';
            };
        };

    };

    return (
            <div className='Searchbar'  style={{transform: 'scale(0)'}}>
                    <input type='text' name='firstName' placeholder='Vorname' className='searchbarFN-input searchbarInputs ' value={searchFirstName} onChange={handleChange} />
                    <input type='text' name='lastName' placeholder='Nachname' className='searchbarLN-input searchbarInputs ' value={searchLastName} onChange={handleChange} />
                    <input type='text' name='ffposition' placeholder='Dienstgrad' className='searchbarPO-input searchbarInputs ' value={searchPosition} onChange={handleChange} />
                    <button name='search' className='searchBtn searchbarToggle' onClick={handleClick}>Suche&nbsp;starten</button>
                    <button name='remove' className='removeBtn searchbarToggle' onClick={handleClick}>Löschen</button>
            </div>
    );
    
};