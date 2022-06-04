export default function GetUpdatetDataArray(memberIndex, keyToUpdate, valueToUpdate, dataStateArray){
  // Argument validation
  if(typeof memberIndex !== 'number' || typeof keyToUpdate !== 'string' || Array.isArray(dataStateArray) === false ) throw new TypeError(`Please provide correct types for all of the arguments 'memberIndex', 'keyToUpdate' & 'dataStateArray' `);
  if(typeof valueToUpdate !== 'string' && typeof valueToUpdate !== 'number' && typeof valueToUpdate !== 'boolean') throw new TypeError(`Argument 'valueToUpdate' has no the correct type`);
  if(memberIndex < 0) throw new RangeError(`Argument 'memberIndex' must be over 0`);

  const newData = [];  // New array to hold the new dataStateArray object 

  for (let i = 0; i < dataStateArray.length; i++) {
      newData.push(dataStateArray[i]);
      if (i === memberIndex) {
        newData[i][keyToUpdate] = valueToUpdate;
      };
  };

  return newData;
};