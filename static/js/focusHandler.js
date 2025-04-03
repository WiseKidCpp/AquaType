const textInputArea = document.getElementById('textInputArea');
const hiddenInput = document.getElementById('hidden-input');
const caret = document.getElementById('caret');
const presetsListMenu = document.getElementById("presetsListMenu");
const openPresetsListButton = document.getElementById("openPresetsListButton");

textInputArea.addEventListener('click', e => {
    //e.stopPropagation();//Stopping propagation(распространение)
    hiddenInput.focus();//Focus on input
    caret.style.display = 'block';
    window.focusedOnInputArea = true;
});

document.addEventListener('click', e => {
    if (!textInputArea.contains(e.target)) {//If clicked not in text area we should unfocus
        hiddenInput.blur();
        caret.style.display = 'none';
        window.focusedOnInputArea = false;
    }
    if(!presetsListMenu.contains(e.target) & !openPresetsListButton.contains(e.target)) {
        window.presetsListOpened = false;
        presetsListMenu.style.display = 'none';
    }
});