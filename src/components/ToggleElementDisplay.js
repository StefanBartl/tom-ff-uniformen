export default function ToggleElementDisplay(element){

    const allElementsArray = document.querySelectorAll(`.${element}`);
    for (const form of allElementsArray) {
        if(form.classList.contains('displayNone')){
            form.classList.remove('displayNone');
        }else{
            form.classList.add('displayNone');
        };
    };

};