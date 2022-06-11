export default function FindMemberIndexInDataArray(firestorID, data){

  // Argument validation
  if( typeof firestorID !== 'number' ) throw new TypeError(`Argument 'firestoreID' must be type of 'number'.`);
  if( Array.isArray(data) === false ) throw new TypeError(`Argument 'data' must be type of 'object' & an array.`);
  if( firestorID < 0 ) throw new RangeError(`Argument 'firestorID' must have a 'number' value over 0. You submitted ${firestorID}`);
  if( data.length < 1) throw new RangeError(`Argument 'data' must contain at least 1 object`);
  
  let memberIndexToUpdate; 
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === firestorID) {
      memberIndexToUpdate = i;
      };
    };

  if(memberIndexToUpdate === undefined) return false;
  return memberIndexToUpdate;
  
};

//! Returns false if it cannot find an matching index with given ID in submitted data array