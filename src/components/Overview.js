import { useState, useEffect, Children } from 'react';
import './Overview.css';
import './Form.css';

// ? Firebase imports
import { db } from '../firebase-config';
import { collection, getDocs, setDoc, doc, deleteDoc  } from 'firebase/firestore'; 

export default function Overview() {

  const [ data, setData ] = useState([]); 

  // ? Fetch database from Firebase
  useEffect(() =>{
      const dataCollectionRef = collection(db, "uniformen");
      const getData = async function fetchingData () {
        const fetchedData = await getDocs(dataCollectionRef);
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), firstName: doc.firstName })));
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), lastName: doc.lastName })));
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), ffposition: doc.ffposition })));
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), nullentry: null })));
      };
      getData();
  }, []);

  // ? Create new Member / put it in the database
  const [ newFirstName, setNewFirstName ] = useState("");
  const [ newLastName, setNewLastName ] = useState("");
  const [ newPosition, setNewPosition ] = useState("");

  // ? Create new form to add a new member
  function handleNew (event) {
    event.preventDefault();
  };

    // ? Add a new member to he database
  const createMember = async () => {
    const dataCollectionRef = collection(db, "uniformen");
     await setDoc(doc(dataCollectionRef, `${data.length}`),{ id: Number(data.length), firstName: newFirstName, lastName: newLastName, ffposition: newPosition });
  };

  // Comment out to quickly add a new test member to database ==>
  // const createNewTestMember = (async function newTestMember () {
  //   await setDoc(doc(dataCollectionRef, "0"), {
  //     id: "0", firstName: "Tes", lastName: "ter", ffposition: "opop"
  // })}
  //());

  // ? Handle state of data
 function handleChange (event){
  // console.log(event.target.value)
  //  const newData = [];
  // const upObj = data[event.target.id - 1];
  // upObj[event.target.name] = event.target.value;
  // console.log(upObj);
  // for(let i = 0; i < data.length; i++){ 
  //   newData.push(data[i]);
  //   if(i === event.target.id - 1){
  //     newData[i] = upObj
  //   }
  // }
  // setData(newData);
 };
      
  // ? Delete a member 
 const handleDelete = async (id) => {
    const docId = `${id}`;
    await deleteDoc(doc(db, "uniformen", docId));
 };

 // !!X PUSH DATA
  function handleUpdate (event) {
    // event.preventDefault();
  };


  return (
    <div className="Overview">
        <h1 className="ov-main-title">Feuerwehr-Uniform-Datenbank</h1>

        <div className='mainBtn'>
              <div className='newBtn-div'>
                  <button type='submit' name='newBtn' id={`new`}className='newBtn manBtn formFields' onClick={handleNew}>Neu anlegen</button> {/* TODO - new field should be at top */ }
                  <button type='submit' name='saveBtn' id={`save`}className='saveBtn manBtn formFields' onClick={createMember}>Neu speichern</button> 
              </div>
            <button type='submit' name='updateBtn' id={`update`}className='updateBtn manBtn formFields' onClick={handleUpdate}>Daten speichern</button> 
        </div>

        <div className='newMember-div'>
          <p className='idVal formFields'>{data.length}</p>
          <input type='text' placeholder='Vorname' name='vorname' className='inp-FN formFields' onChange={(event) => {setNewFirstName(event.target.value)}} />
          <input type='text' placeholder='Nachname' name='vorname' className='inp-LN formFields' onChange={(event) => {setNewLastName(event.target.value)}} />
          <input type='text' placeholder='Position' name='vorname' className='inp-PO formFields' onChange={(event) => {setNewPosition(event.target.value)}} />        
        </div>

        <div className="form-div">
        { Children.toArray(data.map(member =>
            <form name='dataForm' className='data-form'>
                  <p className='idVal formFields'>{member.id}</p>
                  <input type='text'  name='firstName'   className='inp-FN formFields' value={member.firstName} onChange={handleChange} />
                  <input type='text'  name='lastName'  className='inp-LN formFields' value={member.lastName} onChange={handleChange}  /> 
                  <input type='text'  name='ffposition'  className='inp-PO formFields' value={member.ffposition} onChange={handleChange} />
                  <button type='submit' name='delete' className='deleteBtn manBtn formFields' onClick={() => {handleDelete(member.id)}}>Löschen</button> 
            </form>
        ))}
        </div>

    </div>
  );

};