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

import "../styles/Overview.css";
import Headline from './Headline';
import FirestoreDataForm from './FirestoreDataForm';
import Contact from './Contact';

// import LoginButton from './LoginButton';
// import LogoutButton from './LogoutButton';

export default function Overview() {

  return (

    <div className="Overview">

        <Headline />
        <FirestoreDataForm />
        <Contact />

    </div>

  );

};
