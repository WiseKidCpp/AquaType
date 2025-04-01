const textInputArea = document.getElementById('textInputArea');
const hiddenInput = document.getElementById('hidden-input');

textInputArea.addEventListener('click', e => {
    e.stopPropagation();//Stopping propagation(распространение)
    hiddenInput.focus();//Focus on input
});

document.addEventListener('click', e => {
    if (!textInputArea.contains(e.target)) {//If clicked not in text area we shoud unfocus
        hiddenInput.blur();
    }
});