import ToggleFullScreen from "../components/ToggleFullScreen";
import ToggleOverflow from "./ToggleOverflow";

export default function ToggleDetailedNewMember(back) {
  //#region Toggle Fullscreen

  // if function is invoked from 'back' button
  if (back === true) {
    // To prevent double TogglingFullscreen, only invoke ToggleFullScreen if browser is in fullscree mode
    if (window.innerHeight === window.screen.height) {
      // ToggleFullScreen(document.querySelector(".Detailed-new-Member"));
      if (window.innerWidth > 576) {
        ToggleOverflow("show");
      }
    }
  } else {
    // if function is invoked from 'detailsuche' button invoke Fullscreen anyway
    // ToggleFullScreen(document.querySelector(".Detailed-new-Member"));
    if (window.innerWidth > 576) {
      ToggleOverflow("hide");
    }
  }

  //#endregion

  //#region Animation

  const animationTime = 1000;
  const toggleTiming = {
    duration: animationTime,
    iterations: 1,
    fill: "forwards",
    easing: "ease-in",
  };

  let toggleState = document
    .querySelector(".detailMemberToggle")
    .getAttribute("data-visible");
  let toggleConsoleFieldsKeyframes;

  if (toggleState === "false") {
    toggleConsoleFieldsKeyframes = [
      { transform: "scale(0)", opacity: "0" },
      { transform: "scale(1)", opacity: "1" },
    ];
  } else {
    toggleConsoleFieldsKeyframes = [
      { transform: "scale(1)", opacity: "1" },
      { transform: "scale(0)", opacity: "0" },
    ];
  }
  // Trigger animations
  document
    .querySelector(".Detailed-new-Member")
    .animate(toggleConsoleFieldsKeyframes, toggleTiming);
  //#endregion

  if (
    document
      .querySelector(".detailMemberToggle")
      .getAttribute("data-visible") === "true"
  ) {
    document
      .querySelector(".detailMemberToggle")
      .setAttribute("data-visible", "false"); // Toggle data-attribute
  } else {
    document
      .querySelector(".detailMemberToggle")
      .setAttribute("data-visible", "true");
  }

  // Make button after uncklickable/clickable to secure 'animation triggering overflow'
  document.querySelector(".detailMemberToggle").style.pointerEvents = "none";
  setTimeout(() => {
    document.querySelector(".detailMemberToggle").style.pointerEvents = "all";
  }, animationTime);
}
