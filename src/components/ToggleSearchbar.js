export default function ToggleNewMember(){

    const animationTime = 1000;
    const  toggleTiming  = { 
      duration: animationTime,
      iterations: 1,
      fill: 'forwards' ,
      easing: 'ease-in', 
  };

//#region toggle console

  let toggleState = document.querySelector('.searchbarToggle').getAttribute('data-visible');

  let toggleConsoleKeyframes;

    if(window.innerWidth > 576){

      if(toggleState === 'false'){
        toggleConsoleKeyframes = [
            { height: '0vh'},
            { height: '15vh'}
          ];
  } else {
    toggleConsoleKeyframes = [
      { height: '15vh'},
      { height: '0vh'}
    ];
  };

    } else  {

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
    document.querySelector('.Searchbar').animate(toggleConsoleFieldsKeyframes, toggleTiming);
    
    // Toggle data-attribute
    document.querySelector('.searchbarToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.searchbarToggle').setAttribute('data-visible', 'true')
      :  document.querySelector('.searchbarToggle').setAttribute('data-visible', 'false');

    // Toggle searchbar button title
    document.querySelector('.searchbarToggle').getAttribute('data-visible') === 'false'
      ?  document.querySelector('.searchbarToggle').title=`Klicke um das Suchfeld einzublenden`
      :  document.querySelector('.searchbarToggle').title=`Klicke um das Suchfeld auszublenden`;

    // Toggle pointer events
    document.querySelector('.searchbarToggle').getAttribute('data-visible') === 'false'
    ?  document.querySelector('.newMemberToggle').style.pointerEvents = 'all'
    :  document.querySelector('.newMemberToggle').style.pointerEvents = 'none';
    
    // Toggle blur other console button 
    document.querySelector('.searchbarToggle').getAttribute('data-visible') === 'false'
    ?  document.querySelector('.newMemberToggle').style.filter = 'blur(0)'
    :  document.querySelector('.newMemberToggle').style.filter = 'blur(.1rem)';
    document.querySelector('.searchbarToggle').getAttribute('data-visible') === 'false'
    ?  document.querySelector('.detailedSearchbarToggle').style.filter = 'blur(0)'
    :  document.querySelector('.detailedSearchbarToggle').style.filter = 'blur(.1rem)';

    // Make button after uncklickable/clickable to secure 'animation triggering overflow'
    document.querySelector('.searchbarToggle').style.pointerEvents = 'none';
    setTimeout(() => {document.querySelector('.searchbarToggle').style.pointerEvents = 'all';},  animationTime);

  };