import "../styles/LogoutButton.css";

export default function LogoutButton(){

  // Logout button to delete session key & enable login shield 
  function handleLogout (event) {
    event.preventDefault();
    // Ask user for logout
    if (window.confirm("Willst du dich ausloggen?") === true) {
        // If true, remove session key from local storage
        localStorage.removeItem('loginKey');
        // Reload lock app
        window.location.reload();
    } else {
        return;
    };
  };

  return (
            <div className="logout-button-div">
                  <button type='submit' className="logout-button" title="Ausloggen" onClick={handleLogout}>logout</button>
            </div>
  );

};