export default function firestoreUIEffect(type, id) {
    // get the correct btn element
    let memberUpdateBtn;
    type === 'save'
      ? (memberUpdateBtn = document.querySelector(`#save`))
      : (memberUpdateBtn = document.querySelector(`.${type}-${id}`));

    // UI-Effect
    const updateUIEffect = [
      { backgroundColor: 'white', color: 'black' },
      { backgroundColor: 'green', color: 'white' },
      { backgroundColor: 'white', color: 'black' },
    ];
    const updateUIEffectTiming = {
      duration: 2000,
      iterations: 1,
    };
    memberUpdateBtn.animate(updateUIEffect, updateUIEffectTiming, {
      easing: 'ease-in-out',
    });

    // Special Effect for update
    if (type === 'update') {
      const ovAniStyle = [
        { backgroundColor: 'red' },
        { backgroundColor: 'gray' },
        { backgroundColor: 'red' },
      ];

      const ovAniTiming = {
        duration: 1000,
        iterations: 1,
        easing: 'ease-in-out',
      };

      document
        .querySelector(`.member-formMID-${id}`)
        .animate(ovAniStyle, ovAniTiming);
      return;
    }

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }