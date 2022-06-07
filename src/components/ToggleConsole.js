  // Toggle the console for the database
  export default function ToggleConsole(){

    const animationTime = 1000;
    const  toggleTiming  = { 
      duration: animationTime,
      iterations: 1,
      fill: 'forwards' ,
      easing: 'ease-in', 
  };

//#region toggle console

  let toggleState = document.querySelector('.consoleToggle').getAttribute('data-visible');

  let toggleConsoleKeyframes;

    if(toggleState === 'false'){
          toggleConsoleKeyframes = [
              { height: '0vh'},
              { height: '30vh'}
            ];
    } else {
      toggleConsoleKeyframes = [
        { height: '30vh'},
        { height: '0vh'}
      ];
    };
  
   
//#endregion


//#region togle console fields

let toggleConsoleFieldsKeyframes;

 if(toggleState === 'false'){
       toggleConsoleFieldsKeyframes = [
           { transform: 'scale(0)', opacity: '0' },
           { transform: 'scale(1)', opacity: '1' }
         ];
 } else {
   toggleConsoleFieldsKeyframes = [
    { transform: 'scale(1)', opacity: '1' },
    { transform: 'scale(0)', opacity: '0' }
   ];
 };

//#endregion

    // Trigger animations
    document.querySelector('.console').animate(toggleConsoleKeyframes, toggleTiming);
    document.querySelector('.newMember-div').animate(toggleConsoleFieldsKeyframes, toggleTiming);
    document.querySelector('.Searchbar').animate(toggleConsoleFieldsKeyframes, toggleTiming);

    // Toggle data-attribute
    document.querySelector('.consoleToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.consoleToggle').setAttribute('data-visible', 'true')
      :  document.querySelector('.consoleToggle').setAttribute('data-visible', 'false');

    // Make button after uncklickable/clickable to secure 'animation triggering overflow'
    document.querySelector('.consoleToggle').style.pointerEvents = 'none';
    setTimeout(() => {document.querySelector('.consoleToggle').style.pointerEvents = 'all';},  animationTime);

  };