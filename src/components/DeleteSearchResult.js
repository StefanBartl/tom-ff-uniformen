export default function DeleteSearchResult(){
    const allFormsArr = document.querySelectorAll('.member-forms');
    for (const form of allFormsArr) {
            form.style.display = 'flex';
    };
};