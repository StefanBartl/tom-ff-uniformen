import { useState } from 'react';
import '../styles/Searchbar.css';
import DeleteSearchResult
 from '../components/DeleteSearchResult';
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
                return true;
            });
        };

        if(searchLastName.length !== 0 && searchFirstName.length === 0 && searchPosition.length === 0){
            props.data.map(el => {
                if(el.lastName.indexOf(searchLastName) !== -1){
                matchingObjects.push(el);
                };   
                return true;
            });
        };

        if(searchPosition.length !== 0 && searchLastName.length === 0 && searchFirstName.length === 0){
            props.data.map(el => {
                if(el.ffposition.indexOf(searchPosition) !== -1){
                matchingObjects.push(el);
                };   
                return true;
            });
        };

        // If user is searching with all 3 strings
        if(searchPosition.length !== 0 && searchLastName.length !== 0 && searchFirstName.length !== 0){
            props.data.map(el => {
                if(el.firstName.indexOf(searchFirstName) !== -1 && el.lastName.indexOf(searchLastName) !== -1 &&  el.ffposition.indexOf(searchPosition) !== -1){
                matchingObjects.push(el);
                };   
                return true;
            });
        };

        // If user is searching with 2 strings (next 3 conditions)
        if(searchPosition.length !== 0 && searchLastName.length !== 0 && searchFirstName.length === 0){
            props.data.map(el => {
                if(el.firstName.indexOf(searchFirstName) !== -1 && el.lastName.indexOf(searchLastName) !== -1){
                matchingObjects.push(el);
                };   
                return true;
            });
        };

        if(searchPosition.length !== 0 && searchLastName.length === 0 && searchFirstName.length !== 0){
            props.data.map(el => {
                if(el.firstName.indexOf(searchFirstName) !== -1 &&  el.ffposition.indexOf(searchPosition) !== -1){
                matchingObjects.push(el);
                };   
                return true;
            });
        };

        if(searchPosition.length === 0 && searchLastName.length !== 0 && searchFirstName.length !== 0){
            props.data.map(el => {
                if(el.lastName.indexOf(searchLastName) !== -1 &&  el.ffposition.indexOf(searchPosition) !== -1){
                matchingObjects.push(el);
                };   
                return true;
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

        } else { // Alert no match

            window.alert(`Die Suche war leider nicht erolgreich`);
            DeleteSearchResult();
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
            DeleteSearchResult();
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