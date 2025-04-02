import { checkLetter } from "./checkLetter.js";
import { updateCaretPosition } from "./updateCaretPosition.js";

class allData {
    hiddenInput = document.getElementById('hidden-input');
    textArea = document.getElementById('textInputArea');
    caret = document.getElementById('caret');
    currentCharIndex = 0;
    lastRowCharIndex = 0;
    lastErasable = 0;
    currentRow = 1;
    chars = [];
    deleteString() {
        console.log("removing");
        for (let i = this.lastRowCharIndex-1; i >= 0; i--) {
           this.chars[i].remove();
        }
    }
}

let data = new allData;

function init() {
    data.chars = Array.from(data.textArea.querySelectorAll('.char'));//Getting all letters
    if (data.chars.length) {
        data.caret.style.display = 'block'; //Show caret if we have anything
        data = updateCaretPosition(data);
    }
    window.addEventListener('resize', data = updateCaretPosition(data));//If size of window changes we change position of caret
}

data.hiddenInput.addEventListener('keydown', e => {        
    checkLetter(e, data);
});

document.addEventListener('DOMContentLoaded', init);//When everything is parsed and executed