import { useState } from 'react';
import SetSessionKey from '../components/LocalStorageSetWithExpiry';
import TestKey from '../components/TestKey';
import '../styles/LoginShield.css';

export default function LoginShield(){

    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState('');
 
     function handleChange (event){
     event.target.name === 'user'
         ? setUser(event.target.value)
         : setPassword(event.target.value);
     };
 
     function handleLog(event){
         event.preventDefault(); 
 
         // Check authorization
         if( (user === process.env.REACT_APP_USER_ADMIN && password === process.env.REACT_APP_USER_ADMINPW)
         ||   (user === process.env.REACT_APP_USER_TOM && password === process.env.REACT_APP_USER_TOMPW)
         ){
             // Set session key
             SetSessionKey('loginKey', process.env.REACT_APP_USER_KEY, 7200000); // 2 hours
             // Remove login wrapper
             window.location.reload();
         } else {
             // Create login fail message
             const loginFailMessage = document.createElement('h3');
             loginFailMessage.classList.add('login-failMessage');
             loginFailMessage.innerText= 'Login failed';
             // Append it to the form element
             document.querySelector('.login-form').appendChild(loginFailMessage)
             // Remove it after 3 seconds
             setTimeout(()=>{document.querySelector('.login-failMessage').remove()}, 3000);
         };
         
     };
 
    return (TestKey('loginKey') !== true ?     
            <div className='login-shield'>
            <form className='login-form'>
                <h2>FF-Kaltenleutgeben</h2>
                <h2>Uniformen-Datenbank</h2>
                <h2>Login</h2>
                <div className='userLabelDiv'>
                        <label htmlFor='user'>User: </label>
                        <input type='text' name='user' placeholder='user' value={user}onChange={handleChange} />
                </div>
                <div className='passwordLabelDiv'>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' placeholder='password' value={password} onChange={handleChange}  />
                </div>
                <button onClick={handleLog}>OK</button>
            </form>
        </div>
        : <p></p>
    );
};