export default function toggle90degAnimation (element) {

  //#region animation setting

  const buttonRotateDownSpinning = [
    { transform: 'rotate(0deg) '},
    { transform: 'rotate(90deg)'}
  ];

  const buttonRotateUpSpinning = [
      { transform: 'rotate(90deg)' },
      { transform: 'rotate(0deg) '}
  ];

  const buttonRotateTiming = { 
      duration: 100,
      iterations: 1,
      fill: 'forwards' ,
      easing: 'ease-in', 
  };

  //#endregion

  if(element.getAttribute('data-toggled') === 'false' || element.getAttribute('data-toggled') === null){
        element.animate( buttonRotateDownSpinning, buttonRotateTiming )
        element.setAttribute('data-toggled', "true");
  } else {
        element.animate( buttonRotateUpSpinning, buttonRotateTiming )
        element.setAttribute('data-toggled', "false")
  };

};