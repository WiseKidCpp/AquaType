const hiddenInput = document.getElementById('hidden-input');
const textArea = document.getElementById('textInputArea');
const caret = document.getElementById('caret');
let currentCharIndex = 0;
let chars = [];

function init() {
    chars = Array.from(textArea.querySelectorAll('.char'));//Getting all letters
    if (chars.length) {
        caret.style.display = 'block'; //Show caret if we have anything
        updateCaretPosition();
    }
    window.addEventListener('resize', updateCaretPosition);//If size of window changes we change position of caret
}

function updateCaretPosition() {
    if (currentCharIndex >= chars.length) return;//If array is ended
    
    const charElement = chars[currentCharIndex];//Current letter
    const rect = charElement.getBoundingClientRect();//Getting info about current letter
    const parentRect = textArea.getBoundingClientRect();//Getting info about parent container
    
    caret.style.left = `${rect.left - parentRect.left}px`;//Setting caret left position
    caret.style.top = `${rect.top - parentRect.top}px`;//Setting caret top position
}

hiddenInput.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
        if (currentCharIndex > 0) {
            currentCharIndex--;
            chars[currentCharIndex].classList.remove('correct', 'incorrect');
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

    const currentChar = chars[currentCharIndex];//Я устал делать комменты простите
    const expectedChar = currentChar.textContent;

    if (e.key === expectedChar) {
        currentChar.classList.add('correct');//Adding correct that changes color
    } else {
        currentChar.classList.add('incorrect');
    }
    
    currentCharIndex++;
    updateCaretPosition();
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', init);//When all is parsed and executed