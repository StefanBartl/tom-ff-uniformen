import ToggleFullScreen from '../components/ToggleFullScreen';
import ToggleOverflow from './ToggleOverflow';

export default function ToggleDetailedSearchbar(back){


  //#region Toggle Fullscreen

      // if function is invoked from 'back' button
      if(back === true){
        // To prevent double TogglingFullscreen, only invoke ToggleFullScreen if browser is in fullscree mode
        if (window.innerHeight === window.screen.height) {
          ToggleFullScreen(document.querySelector('.DetailedSearchbar'));
          if(window.innerWidth > 576){
            ToggleOverflow('show');
          };
        };
      } else {  // if function is invoked from 'detailsuche' button invoke Fullscreen anyway
        ToggleFullScreen(document.querySelector('.DetailedSearchbar'));
        if(window.innerWidth > 576){
          ToggleOverflow('hide');
        };
      };

  //#endregion


  //#region Animation

    const animationTime = 1000;
    const  toggleTiming  = { 
      duration: animationTime,
      iterations: 1,
      fill: 'forwards' ,
      easing: 'ease-in', 
  };

  let toggleState = document.querySelector('.detailedSearchbarToggle').getAttribute('data-visible');
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
      // Trigger animations
      document.querySelector('.DetailedSearchbar').animate(toggleConsoleFieldsKeyframes, toggleTiming);
  //#endregion


  //#region Toggling

      
      if(document.querySelector('.detailedSearchbarToggle').getAttribute('data-visible') === 'true'){
         document.querySelector('.detailedSearchbarToggle').setAttribute('data-visible', 'false'); // Toggle data-attribute
      } else {
         document.querySelector('.detailedSearchbarToggle').setAttribute('data-visible', 'true'); 
      };

  //#endregion


  // Make button after uncklickable/clickable to secure 'animation triggering overflow'
  document.querySelector('.detailedSearchbarToggle').style.pointerEvents = 'none';
  setTimeout(() => {document.querySelector('.detailedSearchbarToggle').style.pointerEvents = 'all';},  animationTime);

};