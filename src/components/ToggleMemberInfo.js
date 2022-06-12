import ToggleFullScreen from '../components/ToggleFullScreen';
import toggle90degAnimation from '../components/Toggle90Animation';
import ToggleOverflow from './ToggleOverflow';

// ? Toggle the member info arrow
  export default function toggleMemberInfo(index) {

    // Get DOM-Element
    const memberInfoBtn = document.getElementById(`memberInfoBtn-${index}`);
    const memberWholeSection = document.querySelector(`.member-form-${index}`);
    const memberInfoSection = document.getElementById(`infoSection-${index}`);
    const allMembersArray = document.querySelectorAll('.member-forms');
    // Toggle UI

    if (memberInfoSection.style.display === 'none') {

      // If info section of member is hided...
      // Toggle backgound color of elements
      document.querySelector('.member-forms').style.backgroundColor = 'red';
      document.querySelector('.id-value').style.color = 'white';
      // Add css-rules for the whole section (constant visible section + toggled section)
      memberWholeSection.classList.add('visibleMemberSection-div');
      // Initiate the 90deg turnaround animation of the button image element
      toggle90degAnimation(memberInfoBtn); 
      // Toggle to fullscreen
      ToggleFullScreen(memberWholeSection);
      // Change the tile of the button element
      memberInfoBtn.title = 'Info zuklappen'; 
       // Display the info section
      memberInfoSection.style.display = 'flex';

      for (let i = 0; i < allMembersArray.length; i++) {
        // Loop trough all member forms
        if ( allMembersArray[i].classList.contains('visibleMemberSection-div') === false) {
          // display: none all elements which are not selected by user
          allMembersArray[i].classList.add('notSelectedMember-div');
        };
      };
      if(window.innerWidth > 576){ToggleOverflow('hide');};
    } else {

      // If info section of member is not hided,  the opposite of the above
      document.querySelector('.member-forms').style.backgroundColor = 'lightgray';
      toggle90degAnimation(memberInfoBtn);
      if (document.fullscreenElement) {
        // Prevent to trigger ToggleFullScreen() again if user exit the member info fullscrreen mode with ESC
        ToggleFullScreen();
      };
      memberInfoBtn.title = 'Info aufklappen';
      memberInfoSection.style.display = 'none';

      for (let i = 0; i < allMembersArray.length; i++) {
        if (
          allMembersArray[i].classList.contains('visibleMemberSection-div') ===
          false
        )
          allMembersArray[i].classList.remove('notSelectedMember-div');
      };

      memberWholeSection.classList.remove('visibleMemberSection-div');
      if(window.innerWidth > 576){ToggleOverflow('show');};

    };
    
  };