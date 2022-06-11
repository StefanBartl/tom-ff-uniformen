export default function toggle90degAnimation (element) {
  
  // Argument validation
  if(typeof element !== 'object') throw new TypeError(`Argument 'element' must be type of 'object' `);

  //#region animation setting

  const buttonRotateDownSpinning = [
    { transform: 'rotate(90deg) '},
    { transform: 'rotate(0deg)'}
  ];

  const buttonRotateUpSpinning = [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(90deg) '}
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
        return;
  } else {
        element.animate( buttonRotateUpSpinning, buttonRotateTiming )
        element.setAttribute('data-toggled', "false")
        return;
  };
  
};