// ? CSS, React and function imports
import '../styles/FirestoreDataForm.css';
import { useState, useEffect, Children } from 'react';
import Searchbar from './Searchbar';
import toggleMemberInfo from '../components/ToggleMemberInfo';
import FindMemberIndex from '../components/FindMemberIndexInDataArray';
import GetUpdatetDataArray from '../components/GetUpdatetDataObject';
import firestoreUIEffect from '../components/FirestoreUIEffect';
import ToggleSearchbar from '../components/ToggleSearchbar';
import ToggleNewMember from '../components/ToggleNewMember';
import NewMember from '../higherOrderComponents/NewMember';
import PrintButton from '../higherOrderComponents/PrintButton';
import ExportButton from './ExportButton';

// ? Firebasefirestore  imports
import { db } from '../firebase-config';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export default function FirestoreDataForm() {

  //#region React-Application logic

  // state to hold hold whole member data
  const [data, setData] = useState([]);

  // ? Handle state of member
  function handleChange(event) {
    event.preventDefault();

    // Get data from onChange event
    const idForChange = parseInt(event.target.id);
    const nameForChange = event.target.name;
    const valueForChange = event.target.value;

    // Get member index in data array
    const memberIndexToUpdate = FindMemberIndex(idForChange, data);
    if (memberIndexToUpdate === false) return; // If index was not correct found, return to prevent changing values accidentaly

    // handle checkbox exception
    if (event.target.type === 'checkbox') {
      let newBool;
      if (
        data[memberIndexToUpdate][nameForChange] === 'on' ||
        data[memberIndexToUpdate][nameForChange] === true
      ) {
        newBool = false;
      } else newBool = true;

      const newDataArray = GetUpdatetDataArray(
        memberIndexToUpdate,
        nameForChange,
        newBool,
        data
      );
      setData(newDataArray);
      return;
    } else {
      const newDataArray = GetUpdatetDataArray(
        memberIndexToUpdate,
        nameForChange,
        valueForChange,
        data
      );
      setData(newDataArray);
      return;
    }
  }

  //#endregion


  //#region Firebase firestore

  // ? Fetch database from Firebase
  useEffect(() => {
    const dataCollectionRef = collection(db, 'uniformen');
    const getData = async function fetchingData() {
      const fetchedData = await getDocs(dataCollectionRef);

      setData(
        fetchedData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          firstName: doc.firstName,
          lastName: doc.lastName,
          ffposition: doc.ffposition,
          textarea: doc.textarea || '',

          mantelS: doc.mantelS,
          mantelB: doc.mantelB,
          jackeS: doc.jackeS,
          jackeB: doc.jackeB,
          hoseS: doc.hoseS,
          hoseB: doc.hoseB,
          hemdS: doc.hemdS,
          hemdB: doc.hemdB,
          kappeS: doc.kappeS,
          kappeB: doc.kappeB,

          pulloverS: doc.pulloverS,
          pulloverB: doc.pulloverB,
          hose2S: doc.hose2S,
          hose2B: doc.hose2B,
          tshirtS: doc.tshirtS,
          tshirtB: doc.tshirtB,
          poloS: doc.poloS,
          poloB: doc.poloB,
          bluseS: doc.bluseS,
          bluseB: doc.bluseB,
          fleeceS: doc.fleeceS,
          fleeceB: doc.fleeceB,

          schutzjackeS: doc.schutzjackeS,
          schutzjackeB: doc.schutzjackeB,
          schutzhoseS: doc.schutzhoseS,
          schutzhoseB: doc.schutzhoseB,
          einsatzstiefelschwarzS: doc.einsatzstiefelschwarzS,
          einsatzstiefelschwarzB: doc.einsatzstiefelschwarzB,
          einsatzstiefelgelbS: doc.einsatzstiefelgelbS,
          einsatzstiefelgelbB: doc.einsatzstiefelgelbB,
          einsatzhandschuheS: doc.einsatzhandschuheS,
          einsatzhandschuheB: doc.einsatzhandschuheB,
          kappe3S: doc.kappe3S,
          kappe3B: doc.kappe3B,
          haubeS: doc.haubeS,
          haubeB: doc.haubeB,
          helmS: doc.helmS,
          helmB: doc.helmB,
          gurtS: doc.gurtS,
          gurtB: doc.gurtB,
        }))        
      );
      setData(
        fetchedData.docs.map((doc) => ({ ...doc.data(), nullentry: null }))
      );
    };
    getData();
  }, []);



  // ? Update a member in the firestore database
  const handleUpdateFirestoreMember = async (id) => {
    // Get member index in data array
    const memberIndexToUpdate = FindMemberIndex(id, data);
    if (memberIndexToUpdate === false) {
      alert(
        `Update konnte leider nicht durchgeführt werden. Bitte kontaktieren Sie den technischen Support.`
      ); // Inform user that the update cannot be performed, please contact support
      return; // If index was not correct found, return to prevent updating member accidentaly
    }
    const updatingMemberObject = data[memberIndexToUpdate]; // Get whole member object from data array

    // Update member in firestore database
    const updatingMemberFSDoc = doc(db, 'uniformen', `${id}`);
    await updateDoc(updatingMemberFSDoc, updatingMemberObject);

    firestoreUIEffect('update', id); // Initiate UI-Effect

    return;
  };

  // ? Delete a memberr in the firestore database
  const handleDeleteFirestoreMember = async (id) => {
    // Get member index in data array
    const memberIndexToUpdate = FindMemberIndex(id, data);
    if (memberIndexToUpdate === false) {
      alert(
        `Löschen konnte leider nicht durchgeführt werden. Bitte kontaktieren Sie den technischen Support.`
      ); // Inform user that delete cannot be performed, please contact support
      return; // If index was not correct found, return to prevent delete member accidentaly
    }

    if (
      window.confirm(
        `Willst du ${data[memberIndexToUpdate].ffposition} ${data[memberIndexToUpdate].firstName} ${data[memberIndexToUpdate].lastName} wirklich löschen? Der Datensatz kann nicht mehr hergestellt werden!`
      )
    ) {
      // Delete member in firestore database
      await deleteDoc(doc(db, 'uniformen', `${id}`));
      firestoreUIEffect('delete', id);
      return;
    }
  };



  //#endregion

  return (

     <div className='FirestoreDataForm'>

                <div className='console' style={{height: '5vh'}} >

                      <div className='consoleButtons'>

                              <button className='newMemberToggle' data-visible='false' onClick={ToggleNewMember}  title={`Klicke um einen Kamerad neu anzulegen`} >Neu&nbsp;anlegen</button>

                              <button className='searchbarToggle' data-visible='false' onClick={ToggleSearchbar} title={`Klicke um das Suchfeld einzublenden`}>Suchfeld</button>

                              <ExportButton data={data} />

                      </div>

                      <div  className='consoleBars'>

                          <NewMember data={data} />
                          
                          <Searchbar data={data} />

                      </div>


                </div>

              <main className='firestore-data-wrapper'>

                  <div className='data-labels-div'>
                  <h3 className='label-ID'>Nr. -</h3>
                      <h3 className='label-FN'>Vorname,</h3>
                      <h3 className='label-LN'>Nachname,</h3>
                      <h3 className='label-PO'>Dienstgrad</h3>
                  </div>

                  <div className='data-array-wrapper'>
                  {Children.toArray(
                      data.map((member, index) => (
                      <form
                          name={`memberForm-${index}`}
                          id={index}
                          className={`member-form-${index} member-formMID-${member.id} member-forms`}
                      >
                          {/* Member form fields before toggling info visible  */}

                          <section className='member-section-visible'>
                          <p className='id-value'>{index}.</p>

                          <input
                              type='text'
                              name='firstName'
                              id={member.id}
                              className='input-firstName'
                              value={data[index].firstName}
                              onChange={handleChange}
                          />

                          <input
                              type='text'
                              name='lastName'
                              id={member.id}
                              className='input-lastName'
                              value={data[index].lastName}
                              onChange={handleChange}
                          />

                          <input
                              type='text'
                              name='ffposition'
                              id={member.id}
                              className='input-position'
                              value={data[index].ffposition}
                              onChange={handleChange}
                          />

                          <img
                              src='https://drive.google.com/uc?export=download&id=15q0SsoW8GseByceDXJxG7UaclNQYBVJY'
                              className={`fireTruck fireTruck-${index}`}
                              style={{ display: 'none' }}
                              alt='Fire truck'
                              title='©: freepik.com -  https://www.freepik.com/'
                          />

                          <img
                              src='https://drive.google.com/uc?export=download&id=1u2Eib4hTRffN1aaTLscKze-L6dLN0RKl'
                              name='memberInfoBtn'
                              id={`memberInfoBtn-${index}`}
                              className='memberInfoBtn'
                              alt='Arrow'
                              title={`Info aufklappen.
                                          ©: deemakdaksina - https://www.flaticon.com/authors/deemakdaksina `}
                              onClick={() => {
                              toggleMemberInfo(index);
                              }}
                          />
                          </section>

                          {/* Member info Form fields */}

                          <section
                          id={`infoSection-${index}`}
                          className='member-section-toToggle'
                          style={{ display: 'none' }}
                          >
                          <div className='memberInfo-wrapper'>
                              <h3 className='memberInfos-h3'>Infos</h3>
                              <textarea
                              name='textarea'
                              id={member.id}
                              className='input-textarea'
                              value={data[index].textarea}
                              onChange={handleChange}
                              />

                          </div>

                          <div className='uniformenTypes-div gala-wrapper'>
                              <h3>Galauniformen</h3>

                              <div className='galaLabel-div uniformenLabels-div'>
                              <p className='uLabelsP1'>Größe</p>
                              <p className='.uLabelsP2' title='Bereits ausgegeben?'>
                                  aus?
                              </p>
                              </div>

                              <div className='mantel-div uniformenAssets-divs galaAsset'>
                              <p>Mantel</p>

                              <input
                                  type='text'
                                  name='mantelS'
                                  id={member.id}
                                  value={data[index].mantelS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='mantelB'
                                  id={member.id}
                                  checked={data[index].mantelB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='jacke-div uniformenAssets-divs galaAsset'>
                              <p>Jacke</p>

                              <input
                                  type='text'
                                  name='jackeS'
                                  id={member.id}
                                  value={data[index].jackeS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='jackeB'
                                  id={member.id}
                                  checked={data[index].jackeB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='hose-rock-div uniformenAssets-divs galaAsset'>
                              <p>Hose</p>

                              <input
                                  type='text'
                                  name='hoseS'
                                  id={member.id}
                                  value={data[index].hoseS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='hoseB'
                                  id={member.id}
                                  checked={data[index].hoseB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='hemd-div uniformenAssets-divs galaAsset'>
                              <p>Hemd</p>

                              <input
                                  type='text'
                                  name='hemdS'
                                  id={member.id}
                                  value={data[index].hemdS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='hemdB'
                                  id={member.id}
                                  checked={data[index].hemdB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='kappe-div uniformenAssets-divs galaAsset'>
                              <p>Kappe</p>

                              <input
                                  type='text'
                                  name='kappeS'
                                  id={member.id}
                                  value={data[index].kappeS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='kappeB'
                                  id={member.id}
                                  checked={data[index].kappeB || false}
                                  onChange={handleChange}
                              />
                              </div>
                          </div>

                          <div className='uniformenTypes-div dienst-wrapper'>
                              <h3>Dienstbekleidung</h3>

                              <div className='dienstbekleidungLabel-div uniformenLabels-div'>
                              <p className='uLabelsP1'>Größe</p>
                              <p className='uLabelsP2' title='Bereits ausgegeben?'>
                                  aus?
                              </p>
                              </div>

                              <div className='pullover-div uniformenAssets-divs dienstAsset'>
                              <p>Pullover</p>

                              <input
                                  type='text'
                                  name='pulloverS'
                                  id={member.id}
                                  value={data[index].pulloverS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='pulloverB'
                                  id={member.id}
                                  checked={data[index].pulloverB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='hose2-div uniformenAssets-divs dienstAsset'>
                              <p>Hose</p>

                              <input
                                  type='text'
                                  name='hose2S'
                                  id={member.id}
                                  value={data[index].hose2S}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='hose2B'
                                  id={member.id}
                                  checked={data[index].hose2B || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='tshirt-div uniformenAssets-divs dienstAsset'>
                              <p>T-Shirt</p>

                              <input
                                  type='text'
                                  name='tshirtS'
                                  id={member.id}
                                  value={data[index].tshirtS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='tshirtB'
                                  id={member.id}
                                  checked={data[index].tshirtB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='polo-div uniformenAssets-divs dienstAsset'>
                              <p>Polo</p>

                              <input
                                  type='text'
                                  name='poloS'
                                  id={member.id}
                                  value={data[index].poloS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='poloB'
                                  id={member.id}
                                  checked={data[index].poloB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='Bluse-div uniformenAssets-divs dienstAsset'>
                              <p>Bluse</p>

                              <input
                                  type='text'
                                  name='bluseS'
                                  id={member.id}
                                  value={data[index].bluseS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='bluseB'
                                  id={member.id}
                                  checked={data[index].bluseB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='fleece-div uniformenAssets-divs dienstAsset'>
                              <p>Fleece</p>

                              <input
                                  type='text'
                                  name='fleeceS'
                                  id={member.id}
                                  value={data[index].fleeceS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='fleeceB'
                                  id={member.id}
                                  checked={data[index].fleeceB || false}
                                  onChange={handleChange}
                              />
                              </div>
                          </div>

                          <div className='uniformenTypes-div einsatz-wrapper'>
                              <h3>Einsatzuniform</h3>

                              <div className='einsatzuniformenLabel-div uniformenLabels-div'>
                              <p className='uLabelsP1'>Größe</p>
                              <p className='uLabelsP2' title='Bereits ausgegeben?'>
                                  aus?
                              </p>
                              </div>

                              <div className='schutzjacke-div uniformenAssets-divs einsatzAsset'>
                              <p>Schutzjacke</p>

                              <input
                                  type='text'
                                  name='schutzjackeS'
                                  id={member.id}
                                  value={data[index].schutzjackeS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='schutzjackeB'
                                  id={member.id}
                                  checked={data[index].schutzjackeB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='schutzhose-div uniformenAssets-divs einsatzAsset'>
                              <p>Schutzhose</p>

                              <input
                                  type='text'
                                  name='schutzhoseS'
                                  id={member.id}
                                  value={data[index].schutzhoseS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='schutzhoseB'
                                  id={member.id}
                                  checked={data[index].schutzhoseB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='einsatzstiefelschwarz-div uniformenAssets-divs einsatzAsset'>
                              <p>Einsatzstiefel schwarz</p>

                              <input
                                  type='text'
                                  name='einsatzstiefelschwarzS'
                                  id={member.id}
                                  value={data[index].einsatzstiefelschwarzS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='einsatzstiefelschwarzB'
                                  id={member.id}
                                  checked={data[index].einsatzstiefelschwarzB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='einsatzstiefelgelb-div uniformenAssets-divs einsatzAsset'>
                              <p>Einsatzstiefel gelb</p>

                              <input
                                  type='text'
                                  name='einsatzstiefelgelbS'
                                  id={member.id}
                                  value={data[index].einsatzstiefelgelbS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='einsatzstiefelgelbB'
                                  id={member.id}
                                  checked={data[index].einsatzstiefelgelbB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='einsatzhandschuhe-div uniformenAssets-divs einsatzAsset'>
                              <p>Einsatzhandschuhe</p>

                              <input
                                  type='text'
                                  name='einsatzhandschuheS'
                                  id={member.id}
                                  value={data[index].einsatzhandschuheS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='einsatzhandschuheB'
                                  id={member.id}
                                  checked={data[index].einsatzhandschuheB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='einsatzstiefel-div uniformenAssets-divs einsatzAsset'>
                              <p>Einsatzstiefel</p>

                              <input
                                  type='text'
                                  name='einsatzstiefelS'
                                  id={member.id}
                                  value={data[index].einsatzstiefelS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='einsatzstiefelB'
                                  id={member.id}
                                  checked={data[index].einsatzstiefelB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='kappe3-div uniformenAssets-divs einsatzAsset'>
                              <p>Kappe</p>

                              <input
                                  type='text'
                                  name='kappe3S'
                                  id={member.id}
                                  value={data[index].kappe3S}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='kappe3B'
                                  id={member.id}
                                  checked={data[index].kappe3B || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='haube-div uniformenAssets-divs einsatzAsset'>
                              <p>haube</p>

                              <input
                                  type='text'
                                  name='haubeS'
                                  id={member.id}
                                  value={data[index].haubeS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='haubeB'
                                  id={member.id}
                                  checked={data[index].haubeB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='helm-div uniformenAssets-divs einsatzAsset'>
                              <p>Helm</p>

                              <input
                                  type='text'
                                  name='helmS'
                                  id={member.id}
                                  value={data[index].helmS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='helmB'
                                  id={member.id}
                                  checked={data[index].helmB || false}
                                  onChange={handleChange}
                              />
                              </div>

                              <div className='Gurt-div uniformenAssets-divs einsatzAsset'>
                              <p>Gurt</p>

                              <input
                                  type='text'
                                  name='GurtS'
                                  id={member.id}
                                  value={data[index].GurtS}
                                  onChange={handleChange}
                              />

                              <input
                                  type='checkbox'
                                  name='GurtB'
                                  id={member.id}
                                  checked={data[index].GurtB || false}
                                  onChange={handleChange}
                              />
                              </div>
                          </div>

                          <div className='firestore-manipulate-div'>

                                  <input
                                      type='button'
                                      name='updateBtn'
                                      id={member.id}
                                      title='Update die Daten der/des Kamerad:in in der Datenbank'
                                      className={`updateBtn update-${member.id}`}
                                      onClick={(event) => {
                                      handleUpdateFirestoreMember(member.id);
                                      }}
                                      defaultValue='update'
                                  />

                              <PrintButton />

                              <img
                                  src='https://drive.google.com/uc?export=download&id=1L1sxkr7IVMtQEHTjFgWudgX7jWbLJ8-c'
                                  className='memberInfo-fireImage'
                                  alt='Fire distinguisher'
                                  title='©: BZZRINCANTATION - https://www.flaticon.com/authors/BZZRINCANTATION'
                                  />

                                  <input
                                      type='button'
                                      name='deleteBtn'
                                      id={member.id}
                                      title='Kamerad:in unwiderruflich aus der Datenbank löschen'
                                      className={`deleteBtn delete-${member.id}`}
                                      onClick={(event) => {
                                      handleDeleteFirestoreMember(member.id);
                                      }}
                                      defaultValue='löschen'
                                  />
                          </div>
                          </section>

                      </form>
                      ))
                  )}
                  </div>

              </main>
      
     </div>

  );
};
