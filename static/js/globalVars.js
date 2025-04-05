window.typingTime = 0;
window.focusedOnInputArea = false;
window.correctCharacters = 0;
window.incorrectCharacters = 0;
window.finished = 0;
window.presetsListOpened = false;
window.typesOfTextListOpened = false;
window.currentTypeOfText = "randomWords";
window.currentPreset = "english"

export const textInputArea = document.getElementById('textInputArea');
export const openPresetsListButton = document.getElementById("openPresetsListButton");
export const openTypesOfTextListButton = document.getElementById("openTypesOfTextListButton");
export const presetsListMenu = document.getElementById("presetsListMenu");
export const typesOfTextListMenu = document.getElementById("typesOfTextListMenu");
export const hiddenInput = document.getElementById('hidden-input');
export const caret = document.getElementById('caret');

export function updateGlobals() {
    window.typingTime = 0;
    window.focusedOnInputArea = false;
    window.correctCharacters = 0;
    window.incorrectCharacters = 0;
    window.finished = 0;
    window.presetsListOpened = false;
    window.typesOfTextListOpened = false;
}