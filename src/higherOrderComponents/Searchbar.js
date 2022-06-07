import { useState } from "react";
import  ToggleElementDisplay from "../components/ToggleElementDisplay";


export default function Searchbar(props){

    const [ searchFirstName, setSearchFirstName ] = useState('');
    const [ searchLastName, setSearchLastName ] = useState('');
    const [ searchPosition, setSearchPosition ] = useState('');
    const [ matchingObject, setMatchingObject ] = useState({});

    function handleChange(event){
        event.preventDefault();

        // set state
        if(event.target.name === 'firstName'){
            setSearchFirstName(event.target.value);
        }else if(event.target.name === 'lastName'){
            setSearchLastName(event.target.value);
        } else if(event.target.name === 'firstName'){
            setSearchPosition(event.target.value);
        };
        
    };

    function getSearchedObject(){
        
        let matchingObjects = props.data.filter(el => el.firstName === searchFirstName);
        if(matchingObjects.length > 0) { // If at least one object with id is in array
            
            // Hide every no matches 
            const allFormsArr = document.querySelectorAll('.member-forms');
            for (const form of allFormsArr) {
                    form.classList.add('displayNone');
            };
            // Show match 
            for(let i = 0; i < matchingObjects.length; i++){
                document.querySelector(`.member-formMID-${matchingObjects[i].id}`).classList.remove('displayNone');
            };

        } else { // Remove no matches class to make sure class is removed if seacrhbar strings are deleted 
            
            matchingObjects = [];
            const allFormsArr = document.querySelectorAll('.member-forms');
            for (const form of allFormsArr) {
                    form.classList.remove('displayNone');
            };

        };
    };

    function handleClick(event){
        event.preventDefault();

        if(event.target.name === 'search'){
            getSearchedObject();
        } else if(event.target.name === 'remove'){
            setSearchFirstName('');
            setSearchLastName('');
            setSearchPosition('');
            const allFormsArr = document.querySelectorAll('.member-forms');
            for (const form of allFormsArr) {
                    form.classList.remove('displayNone');
            };
        };

    };


    return (
            <div className="Searchbar">
                    <img
                    src="https://drive.google.com/uc?export=download&id=1u2Eib4hTRffN1aaTLscKze-L6dLN0RKl"
                    name="searchbarBtn"
                    id={`search`}
                    alt="Arrow"
                    title={`Klicke um die Suchbar anzuzeigen / zu verstecken!
                                ©: deemakdaksina - https://www.flaticon.com/authors/deemakdaksina `}
                    onClick={() => {ToggleElementDisplay('searchbarToggle')}}
                    />
                    <input type='text' name="firstName" className='searchbarFN-input searchbarInputs searchbarToggle' value={searchFirstName} onChange={handleChange} />
                    <input type='text' name="lastName" className='searchbarLN-input searchbarInputs searchbarToggle' value={searchLastName} onChange={handleChange} />
                    <input type='text' name="ffposition" className='searchbarPO-input searchbarInputs searchbarToggle' value={searchPosition} onChange={handleChange} />
                    <button name="search" className="searchBtn searchbarToggle" onClick={handleClick}>Suche starten</button>
                    <button name="remove" className="removeBtn searchbarToggle" onClick={handleClick}>Löschen</button>
            </div>
    );
};