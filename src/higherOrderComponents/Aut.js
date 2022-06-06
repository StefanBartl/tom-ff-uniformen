import { useState } from "react";
import "../styles/Aut.css";

export default function Aut() {

   const [ user, setUser ] = useState('');
   const [ password, setPassword ] = useState('');

    function handleChange (event){
    event.target.name === 'user'
        ? setUser(event.target.value)
        : setPassword(event.target.value);
    };

    function handleLog(event){
        event.preventDefault(); 

        if( (user === process.env.REACT_APP_USER_ADMIN && password === process.env.REACT_APP_USER_ADMINPW)
        ||   (user === process.env.REACT_APP_USER_TOM && password === process.env.REACT_APP_USER_TOMPW)
        ){
            // Set session key
            localStorage.setItem('loginKey', process.env.REACT_APP_USER_KEY);
            // Make sure deleting key at least after timeout time
            setTimeout(()=>{localStorage.removeItem('loginKey');},  36000000)
            // Remove login wrapper
            document.querySelector('.Aut').remove();
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

    function handleLogout (event) {
        event.preventDefault();
        // Ask user for logout
        if (window.confirm("Willst du dich ausloggen?") == true) {
            // If true, remove session key from local storage
            localStorage.removeItem('loginKey');
            // Reloead app
            window.location.reload();
        } else {
            return;
        };
    };

  return (
      <div>
          <button type='submit' className="logout-button" title="Ausloggen" onClick={handleLogout}>Logout</button>

            { localStorage.loginKey !== `${process.env.REACT_APP_USER_KEY}`
                ? <div className="Aut">
                        <form className="login-form">
                            <h2>FF-Kaltenleutgeben</h2>
                            <h2>Uniformen-Datenbank</h2>
                            <h2>Login</h2>
                            <div className="userLabelDiv">
                                    <label htmlFor="user">User: </label>
                                    <input type='text' name='user' placeholder="user" value={user}onChange={handleChange} />
                            </div>
                            <div className="passwordLabelDiv">
                                    <label htmlFor="password">Password: </label>
                                    <input type='password' name='password' placeholder="password" value={password} onChange={handleChange}  />
                            </div>
                            <button onClick={handleLog}>OK</button>
                        </form>
                    </div>
                :
                <p></p>
            }
      </div>

  );
};
