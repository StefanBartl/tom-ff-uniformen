import "../styles/Authentication.css";
import LoginShield from './LoginShield';

export default function Aut() {

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
      <div className="Authentication">
          <button type='submit' className="logout-button" title="Ausloggen" onClick={handleLogout}>Logout</button>
           <LoginShield />
      </div>
  );
};
