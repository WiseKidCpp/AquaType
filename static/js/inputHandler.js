const hiddenInput = document.getElementById('hidden-input');
const textArea = document.getElementById('textInputArea');
const caret = document.getElementById('caret');
const topDiff = 5;
const leftDiff = -2;
let currentCharIndex = 0;
let lastRowCharIndex = 0;
let lastErasable = 0;
let currentRow = 1;
let chars = [];

function init() {
    chars = Array.from(textArea.querySelectorAll('.char'));//Getting all letters
    if (chars.length) {
        caret.style.display = 'block'; //Show caret if we have anything
        updateCaretPosition();
    }
    window.addEventListener('resize', updateCaretPosition);//If size of window changes we change position of caret
}

function deleteString(currentChar) {
    console.log("removing");
    for (let i = currentChar-1; i >= 0; i--) {
        chars[i].remove();
    }
}

function updateCaretPosition() {
    if (currentCharIndex >= chars.length) return;//If array is ended
    
    const charElement = chars[currentCharIndex];//Current letter
    let rect = charElement.getBoundingClientRect();//Getting info about current letter
    let parentRect = textArea.getBoundingClientRect();//Getting info about parent container
    
    let caretTop = parseInt((caret.style.top).slice(0, -2));
    caretTop -= topDiff;
    
    let letterTop = rect.top - parentRect.top;
    let letterLeft = rect.left - parentRect.left;
    
    if(caretTop>=0) {
        if(caretTop < letterTop) {
            caret.classList.add('moveMomentally');
            currentRow++;
            if(currentRow >= 3) {
                lastErasable = lastRowCharIndex;
                deleteString(lastRowCharIndex);
                currentRow--;
                rect = charElement.getBoundingClientRect();
                parentRect = textArea.getBoundingClientRect();
                letterTop = rect.top - parentRect.top;
                letterLeft = rect.left - parentRect.left;
            }
            lastRowCharIndex = currentCharIndex;
        }
        else if(caretTop > letterTop) {
            caret.classList.add('moveMomentally');
            currentRow--;
        }
        else {
            caret.classList.remove('moveMomentally');
        }
    }


    caret.style.left = `${letterLeft + leftDiff}px`;//Setting caret left position
    caret.style.top = `${letterTop + topDiff}px`;//Setting caret top position

}

hiddenInput.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
        if (currentCharIndex > lastErasable) {
            currentCharIndex--;
            chars[currentCharIndex].classList.remove('correct', 'incorrect', 'spaceIncorrect');
            updateCaretPosition();
        }
        e.preventDefault();
        return;
    }
    
    if (currentCharIndex >= chars.length) return;//If array is ended
    
    if (!/^[a-zA-Zа-яА-Я ]$/.test(e.key)) { //Only alphabet letters
        e.preventDefault();
        return;
    }

    const currentChar = chars[currentCharIndex];
    const expectedChar = currentChar.textContent;

    console.log(expectedChar);

    if (e.key === expectedChar) {
        currentChar.classList.add('correct');//Adding correct that changes color
    } else {
        if(expectedChar === ` `) {
            currentChar.classList.add('spaceIncorrect');
        }
        currentChar.classList.add('incorrect');
    }
    
    currentCharIndex++;
    updateCaretPosition();
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', init);//When all is parsed and executed