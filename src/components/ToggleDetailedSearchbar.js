export default function ToggleDetailedSearchbar(){

//#region Animation

    const animationTime = 1000;
    const  toggleTiming  = { 
      duration: animationTime,
      iterations: 1,
      fill: 'forwards' ,
      easing: 'ease-in', 
  };

//#region toggle console

  let toggleState = document.querySelector('.detailedSearchbarToggle').getAttribute('data-visible');

  let toggleConsoleKeyframes;

  if(window.innerWidth > 576){

    if(toggleState === 'false'){
      toggleConsoleKeyframes = [
          { height: '0vh'},
          { height: '1vh'}
        ];
} else {
  toggleConsoleKeyframes = [
    { height: '1vh'},
    { height: '0vh'}
  ];
};

  } else {

    if(toggleState === 'false'){
      toggleConsoleKeyframes = [
          { height: '0vh'},
          { height: '1vh'}
        ];
} else {
  toggleConsoleKeyframes = [
    { height: '1vh'},
    { height: '0vh'}
  ];
};

  };
  
   
//#endregion


//#region toggle console fields

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
    document.querySelector('.DetailedSearchbar').animate(toggleConsoleFieldsKeyframes, toggleTiming);
    
//#endregion

//#region Toggling

    // Toggle data-attribute
    document.querySelector('.detailedSearchbarToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.detailedSearchbarToggle').setAttribute('data-visible', 'true')
      :  document.querySelector('.detailedSearchbarToggle').setAttribute('data-visible', 'false');

    // Toggle console title
    document.querySelector('.detailedSearchbarToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.detailedSearchbarToggle').title=`Klicke um das detailierte Suchfeld einzublenden`
      :  document.querySelector('.detailedSearchbarToggle').title=`Klicke um das detailierte Suchfeld auszublenden`;

    // Toggle pointer events
    document.querySelector('.detailedSearchbarToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.searchbarToggle').style.pointerEvents = 'all'
      :  document.querySelector('.searchbarToggle').style.pointerEvents = 'none';
      
      // Toggle blur other console button 
      document.querySelector('.detailedSearchbarToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.searchbarToggle').style.filter = 'blur(0)'
      :  document.querySelector('.searchbarToggle').style.filter = 'blur(.1rem)';
      document.querySelector('.detailedSearchbarToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.newMemberToggle').style.filter = 'blur(0)'
      :  document.querySelector('.newMemberToggle').style.filter = 'blur(.1rem)';

//#endregion

    // Make button after uncklickable/clickable to secure 'animation triggering overflow'
    document.querySelector('.detailedSearchbarToggle').style.pointerEvents = 'none';
    setTimeout(() => {document.querySelector('.detailedSearchbarToggle').style.pointerEvents = 'all';},  animationTime);

  };