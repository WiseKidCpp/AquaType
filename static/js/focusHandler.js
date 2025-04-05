import { textInputArea, hiddenInput, caret, presetsListMenu, openPresetsListButton, typesOfTextListMenu, openTypesOfTextListButton} from "./globalVars.js";
textInputArea.addEventListener('click', e => {
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
        console.log('close presets list menu');
        window.presetsListOpened = false;
        presetsListMenu.style.display = 'none';
    }
    if(!typesOfTextListMenu.contains(e.target) & !openTypesOfTextListButton.contains(e.target)) {
        console.log('close types of text list menu');
        window.typesOfTextListOpened = false;
        typesOfTextListMenu.style.display = 'none';
    }
});