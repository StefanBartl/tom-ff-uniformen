export default function GetFileCSV(data){
  
    // Building the CSV from the Data two-dimensional array
    // Each column is separated by ";" and new line "\n" for next row
    var csvContent = '';
    data.forEach(function(infoArray, index) {
     let dataString = infoArray.join(';');
      csvContent += index < data.length ? dataString + '\n' : dataString;
    });
    
    // The download function takes a CSV string, the filename and mimeType as parameters
    var download = function(content, fileName, mimeType) {
      var a = document.createElement('a');
      mimeType = mimeType || 'application/octet-stream';
    
      if (navigator.msSaveBlob) { // IE10
        navigator.msSaveBlob(new Blob([content], {
          type: mimeType
        }), fileName);
      } else if (URL && 'download' in a) { //html5 A[download]
        a.href = URL.createObjectURL(new Blob([content], {
          type: mimeType
        }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        window.location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
      }
    }
    
    download(csvContent, 'uniformen.csv', 'text/csv;encoding:utf-8');
  };