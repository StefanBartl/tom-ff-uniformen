export default function ToggleOverflow (toggle) {
    // argument validation
    if(typeof toggle !== 'string') throw new TypeError(`Argument of ToggleOverflow() must be type of "string", you passed ${typeof toggle}`);
    if(toggle !== 'hide' && toggle !== 'show') throw new Error(`Only "hide" or "show" are allowed as arguments for ToggleOverflow(), you passed ${toggle}`);

    if(toggle === 'hide'){
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else if (toggle === 'show'){
        document.getElementsByTagName('body')[0].style.overflow = 'visible' // the default for the css property
    };

    return true;

};