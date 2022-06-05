// !                 === To-Do list ===
// TODO Login-System
// TODO Finish: CSS for most devices & make app nice
// TODO Finish: CSS & JS Guidelines check
// TODO Bonus: Whats about the google drive requests? Maybe await?
// TODO Bonus: Datenauswertung
// TODO Bonus: Searchbar or smth
// TODO Bonus: Adding new atributes
// TODO Bonus: Function END-Testing!
// TODO Why is  useEffect nullentry needed ?
// TODO DEPLOY !!! :-)

import "./styles/App.css";
import Headline from './higherOrderComponents/Headline';
import FirestoreDataForm from './higherOrderComponents/FirestoreDataForm';
import Contact from './higherOrderComponents/Contact';

export default function App() {

  return (
    <div className="App">
        <Headline />
        <FirestoreDataForm /> 
        <Contact />
    </div>
  );
};
