import { useState } from 'react';
import  ToggleElementDisplay from '../components/ToggleElementDisplay';
import Toggle90degAnimation from '../components/Toggle90Animation';
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
            <div className='Searchbar displayNone'  style={{transform: 'scale(0)'}}>
                    <input type='text' name='firstName' placeholder='Vorname' className='searchbarFN-input searchbarInputs ' value={searchFirstName} onChange={handleChange} />
                    <input type='text' name='lastName' placeholder='Nachname' className='searchbarLN-input searchbarInputs ' value={searchLastName} onChange={handleChange} />
                    <input type='text' name='ffposition' placeholder='Dienstgrad' className='searchbarPO-input searchbarInputs ' value={searchPosition} onChange={handleChange} />
                    <button name='search' className='searchBtn searchbarToggle' onClick={handleClick}>Suche&nbsp;starten</button>
                    <button name='remove' className='removeBtn searchbarToggle' onClick={handleClick}>Löschen</button>
            </div>
    );
};