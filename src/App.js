// !                 === To-Do list ===
// TODO Finish: CSS for most devices & make app nice
// TODO Finish: Get rid of ""
// TODO Bonus: Get file from data to print
// TODO Bonus: Adding new atributes in dataform by user
// TODO Bonus: Data filter and export function
// TODO Bonus: Function END-Testing!
// TODO Bonus: CSS & JS Guidelines check
// TODO Bonus: Whats about the google drive requests? Maybe await?
// TODO Why is useEffect nullentry needed ?
// TODO DEPLOY !!! :-)

import "./styles/App.css";
import LoginShield from './higherOrderComponents/LoginShield';
import LogoutButton from './higherOrderComponents/LogoutButton';
import Headline from './higherOrderComponents/Headline';
import FirestoreDataForm from './higherOrderComponents/FirestoreDataForm';
import Contact from './higherOrderComponents/Contact';
import LocalStorageGetWithExpiry from "./components/LocalStorageGetWithExpiry";
import TestKey from './components/TestKey';
import PrintButton from './higherOrderComponents/PrintButton';


export default function App() {
// Check if loginKey is expired
LocalStorageGetWithExpiry('loginKey');


  return (
    
          TestKey('loginKey') === true

          ? <div className="App">
              <div className="headline-logout-div">
                    <PrintButton  />
                    <Headline />
                    <LogoutButton />
              </div>
              <FirestoreDataForm /> 
              <Contact />
            </div>

          : <div>
                <h3 className="noData" title="Click to go back" onClick={()=>{window.location.reload()}}>No data if not logged in!</h3>
                <LoginShield />
          </div> 
    
  );
};
