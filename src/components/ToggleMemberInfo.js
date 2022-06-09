import ToggleFullScreen from '../components/ToggleFullScreen';
import toggle90degAnimation from '../components/Toggle90Animation';

// ? Toggle the member info arrow
  export default function toggleMemberInfo(index) {
    // Get DOM-Element
    const memberInfoBtn = document.getElementById(`memberInfoBtn-${index}`);
    const memberWholeSection = document.querySelector(`.member-form-${index}`);
    const memberInfoSection = document.getElementById(`infoSection-${index}`);
    const memberFireTruck = document.querySelector(`.fireTruck-${index}`);
    const allMembersArray = document.querySelectorAll('.member-forms');

    // Toggle UI
    if (memberInfoSection.style.display === 'none') {
      // If info section of member is hided...
      toggle90degAnimation(memberInfoBtn); // Initiate the 90deg turnaround animation of the button image element
      ToggleFullScreen();
      memberInfoBtn.title = 'Info zuklappen'; // Change the tile of the button element
      memberInfoSection.style.display = 'flex'; // Display the info section
      memberFireTruck.style.display = 'flex'; // Display the fire truck image
      memberWholeSection.classList.add('visibleMemberSection-div'); // Add css-rules for the whole section (constant visible section + toggled section)
      for (let i = 0; i < allMembersArray.length; i++) {
        // Loop trough all member forms
        if (
          allMembersArray[i].classList.contains('visibleMemberSection-div') ===
          false
        ) {
          // display: none all elements which are not selected by user
          allMembersArray[i].classList.add('notSelectedMember-div');
        }
      }
    } else {
      // If info section of member is not hided,  the opposite of the above
      toggle90degAnimation(memberInfoBtn);
      memberInfoBtn.title = 'Info aufklappen';
      memberInfoSection.style.display = 'none';
      memberFireTruck.style.display = 'none';
      for (let i = 0; i < allMembersArray.length; i++) {
        if (
          allMembersArray[i].classList.contains('visibleMemberSection-div') ===
          false
        )
          allMembersArray[i].classList.remove('notSelectedMember-div');
      }
      memberWholeSection.classList.remove('visibleMemberSection-div');
      if (document.fullscreenElement) {
        // Prevent to trigger ToggleFullScreen() again if user exit the member info fullscrreen mode with ESC
        ToggleFullScreen();
      }
    }
  };
