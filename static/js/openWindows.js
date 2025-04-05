import { openPresetsListButton, presetsListMenu, openTypesOfTextListButton, typesOfTextListMenu } from "./globalVars.js";

openPresetsListButton.onclick = function() {
    if(window.presetsListOpened) {
        console.log('close presets list menu(button)');
        window.presetsListOpened = false;
        presetsListMenu.style.display = 'none';
    }
    else {
        console.log('open presets list menu(button)');
        window.presetsListOpened = true;
        presetsListMenu.style.display = 'block';
    }
}

openTypesOfTextListButton.onclick = function() {
    if(window.typesOfTextListOpened) {
        console.log('close types of text list menu(button)');
        window.typesOfTextListOpened = false;
        typesOfTextListMenu.style.display = 'none';
    }
    else {
        console.log('open types of text list menu(button)');
        window.typesOfTextListOpened = true;
        typesOfTextListMenu.style.display = 'block';
    }
}