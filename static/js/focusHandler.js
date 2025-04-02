const textInputArea = document.getElementById('textInputArea');
const hiddenInput = document.getElementById('hidden-input');
const caret = document.getElementById('caret');

textInputArea.addEventListener('click', e => {
    e.stopPropagation();//Stopping propagation(распространение)
    hiddenInput.focus();//Focus on input
    caret.style.display = 'block';
});

document.addEventListener('click', e => {
    if (!textInputArea.contains(e.target)) {//If clicked not in text area we should unfocus
        hiddenInput.blur();
        caret.style.display = 'none';
    }
});