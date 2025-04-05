import { checkCharacter } from "./checkCharacter.js";
import { updateCaretPosition } from "./updateCaretPosition.js";

class allData {
    hiddenInput = document.getElementById('hidden-input');
    textArea = document.getElementById('textInputArea');
    caret = document.getElementById('caret');
    currentCharIndex = 0;
    lastRowCharIndex = 0;
    preLastRowCharIndex = 0;
    lastErasable = 0;
    currentRow = 1;
    chars = [];
    deleteString() {
        console.log("removing");
        for (let i = this.preLastRowCharIndex-1; i >= 0; i--) {
           this.chars[i].remove();
        }
    }
}

let data = new allData;

function init() {
    data.caret.classList.remove('nondisplay');
    data.caret.display = 'none';
    data.chars = Array.from(data.textArea.querySelectorAll('.char'));//Getting all letters
    if (data.chars.length) {
        data = updateCaretPosition(data);
    }
    window.addEventListener('resize', data = updateCaretPosition(data));//If size of window changes we change position of caret
}

export function updateData() {
    console.log("updating data")
    data = new allData;
    init();
}

data.hiddenInput.addEventListener('keydown', e => {        
    checkCharacter(e, data);
});

document.addEventListener('DOMContentLoaded', init);//When everything is parsed and executed