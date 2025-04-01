const textInputArea = document.getElementById('textInputArea');
const hiddenInput = document.getElementById('hidden-input');

textInputArea.addEventListener('click', e => {
    e.stopPropagation();
    hiddenInput.focus();
});

document.addEventListener('click', e => {
    if (!textInputArea.contains(e.target)) {
        hiddenInput.blur();
    }
});