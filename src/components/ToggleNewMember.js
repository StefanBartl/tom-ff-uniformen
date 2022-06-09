import ToggleElementDisplay from "./ToggleElementDisplay";
 
 export default function ToggleNewMember(){

    const animationTime = 1000;
    const  toggleTiming  = { 
      duration: animationTime,
      iterations: 1,
      fill: 'forwards' ,
      easing: 'ease-in', 
  };

//#region toggle console

  let toggleState = document.querySelector('.newMemberToggle').getAttribute('data-visible');

  let toggleConsoleKeyframes;

    if(toggleState === 'false'){
          toggleConsoleKeyframes = [
              { height: '0vh'},
              { height: '20vh'}
            ];
    } else {
      toggleConsoleKeyframes = [
        { height: '20vh'},
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
    
    // Toggle data-attribute
    document.querySelector('.newMemberToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.newMemberToggle').setAttribute('data-visible', 'true')
      :  document.querySelector('.newMemberToggle').setAttribute('data-visible', 'false');

    // Toggle console title
    document.querySelector('.newMemberToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.newMemberToggle').title=`Klicke um die Konsole einzublenden`
      :  document.querySelector('.newMemberToggle').title=`Klicke um die Konsole auszublenden`;

    // Toggle pointer events
    document.querySelector('.newMemberToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.searchbarToggle').style.pointerEvents = 'all'
      :  document.querySelector('.searchbarToggle').style.pointerEvents = 'none';
      
      // Toggle blur other console button 
      document.querySelector('.newMemberToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.searchbarToggle').style.filter = 'blur(0)'
      :  document.querySelector('.searchbarToggle').style.filter = 'blur(.1rem)';

    // Make button after uncklickable/clickable to secure 'animation triggering overflow'
    document.querySelector('.newMemberToggle').style.pointerEvents = 'none';
    setTimeout(() => {document.querySelector('.newMemberToggle').style.pointerEvents = 'all';},  animationTime);

  };