// !                 === To-Do list ===
// TODO Finish: CSS for most devices & make app nice
// TODO Bonus: Data filter function
// TODO Bonus: Searchbar or smth similar
// TODO Bonus: Adding new atributes in dataform by user
// TODO Bonus: Function END-Testing!
// TODO Bonus: CSS & JS Guidelines check
// TODO Bonus: Whats about the google drive requests? Maybe await?
// TODO Why is useEffect nullentry needed ?
// TODO DEPLOY !!! :-)

import "./styles/App.css";
import Authentication from './higherOrderComponents/Authentication';
import LoginShield from './higherOrderComponents/LoginShield';
import Headline from './higherOrderComponents/Headline';
import FirestoreDataForm from './higherOrderComponents/FirestoreDataForm';
import Contact from './higherOrderComponents/Contact';
import LocalStorageGetWithExpiry from "./components/LocalStorageGetWithExpiry";
import TestKey from './components/TestKey';

export default function App() {
// Check if loginKey is expired
LocalStorageGetWithExpiry('loginKey');

  return (
    
          TestKey('loginKey') === true

          ? <div className="App">
              <Headline />
              <FirestoreDataForm /> 
              <Contact />
            </div>

          : <LoginShield />
    
  );
};
