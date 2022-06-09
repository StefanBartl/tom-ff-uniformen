export default function ToggleElementDisplay(element, solo){

    if(solo === true){
        const elementToToggle = document.querySelector(`.${element}`);
            if(elementToToggle.classList.contains('displayNone')){
                elementToToggle.classList.remove('displayNone');
            }else{
                elementToToggle.classList.add('displayNone');
            };
        } else {
            const allElementsArray = document.querySelectorAll(`.${element}`);
            for (const elementToToggle of allElementsArray) {
                if(elementToToggle.classList.contains('displayNone')){
                    elementToToggle.classList.remove('displayNone');
                }else{
                    elementToToggle.classList.add('displayNone');
                };
            };
        };

};