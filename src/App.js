// !                 === known issues list ===
// TODO Finishing: CSS for most devices & make app nice 
// TODO Finishing: CSS Cleanout / CSS-Separation 
// TODO CHECK EVERY FUNCTION & test arguments etc..
// ! Abklären: Position select? Select bei member info statt string? Detaillierte new member anlegen function?

import "./styles/App.css";
import LoginShield from './higherOrderComponents/LoginShield';
import LogoutButton from './higherOrderComponents/LogoutButton';
import Headline from './higherOrderComponents/Headline';
import FirestoreDataForm from './higherOrderComponents/FirestoreDataForm';
import Contact from './higherOrderComponents/Contact';
import LocalStorageGetWithExpiry from "./components/LocalStorageGetWithExpiry";
import TestKey from './components/TestKey';
import PrintButton from "./higherOrderComponents/PrintButton";
// import PrintButton from './higherOrderComponents/PrintButton';


export default function App() {

// Check if loginKey is expired
LocalStorageGetWithExpiry('loginKey');

  return (
    
          TestKey('loginKey') === true

          ? <div className="App">
              <div className="headline-logout-div">
                    <Headline />
                    <LogoutButton />
              </div>
              <FirestoreDataForm /> 
              <Contact />
              <PrintButton />
            </div>

          : <div>
                <h3 className="noData" title="Click to go back" onClick={()=>{window.location.reload()}}>No data if not logged in!</h3>
                <LoginShield />
          </div> 
    
  );
};
