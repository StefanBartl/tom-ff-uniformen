export default function toggle90degAnimation (element) {

    if(!element.classList.contains('add90degAni')){
      element.classList.add('add90degAni');
      element.classList.remove('remove90degAni');
    } else {
      element.classList.remove('add90degAni');
      element.classList.add('remove90degAni');
    };
  
  };