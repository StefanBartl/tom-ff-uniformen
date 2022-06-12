export default function ToggleSearchbar(){

//#region animations

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
                { height: '10vh'},
                { height: '20vh'}
              ];
      } else {
        toggleConsoleKeyframes = [
          { height: '20vh'},
          { height: '10vh'}
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
    setTimeout(() => {document.querySelector('.searchbarToggle').style.pointerEvents = 'all';},  animationTime);

//#endregion

//#region  toggle elements
   if (document.querySelector('.searchbarToggle').getAttribute('data-visible') === 'false' ){
      document.querySelector('.searchbarToggle').setAttribute('data-visible', 'true');  // Toggle data-attribute
      document.querySelector('.searchbarToggle').title=`Klicke um das Suchfeld auszublenden`; // Toggle searchbar button title
      document.querySelector('.newMemberToggle').style.pointerEvents = 'none'; // Toggle pointer events
      document.querySelector('.newMemberToggle').style.filter = 'blur(.1rem)'; // Toggle blur other console buttons... 
      document.querySelector('.detailedSearchbarToggle').style.filter = 'blur(.1rem)';
      document.querySelector('.removeSearch').style.filter = 'blur(.1rem)';
      document.querySelector('.detailMemberToggle').style.filter = 'blur(.1rem)';
    } else {
      document.querySelector('.searchbarToggle').setAttribute('data-visible', 'false');
      document.querySelector('.searchbarToggle').title=`Klicke um das Suchfeld einzublenden`; 
      document.querySelector('.newMemberToggle').style.pointerEvents = 'all'; 
      document.querySelector('.newMemberToggle').style.filter = 'blur(0)'; 
      document.querySelector('.detailedSearchbarToggle').style.filter = 'blur(0)';
      document.querySelector('.removeSearch').style.filter = 'blur(0)';
      document.querySelector('.detailMemberToggle').style.filter = 'blur(0rem)';
    };

//#endregion

  // Make button after uncklickable/clickable to secure 'animation triggering overflow'
  document.querySelector('.searchbarToggle').style.pointerEvents = 'none';

};