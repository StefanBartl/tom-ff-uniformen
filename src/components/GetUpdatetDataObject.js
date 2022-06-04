export default function GetUpdatetDataArray(memberIndex, keyToUpdate, valueToUpdate, dataStateArray){

    const newData = [];  // New array to hold the new dataStateArray object 

    for (let i = 0; i < dataStateArray.length; i++) {
        newData.push(dataStateArray[i]);
        if (i === memberIndex) {
          newData[i][keyToUpdate] = valueToUpdate;
        };
      };
      return newData;

};