import { updateCaretPosition } from "./updateCaretPosition.js";
export function checkLetter(e, data) {
    if (e.key === 'Backspace') {
        if (data.currentCharIndex > data.lastErasable) {
            data.currentCharIndex--;
            data.chars[data.currentCharIndex].classList.remove('correct', 'incorrect', 'spaceIncorrect');
            data = updateCaretPosition(data);
        }
        e.preventDefault();
        return data;
    }
    
    if (data.currentCharIndex >= data.chars.length) return data;//If array is ended
    
    if (!/^[a-zA-Zа-яА-Я ]$/.test(e.key)) { //Only alphabet letters
        e.preventDefault();
        return data;
    }

    const currentChar = data.chars[data.currentCharIndex];
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
    
    data.currentCharIndex++;
    data = updateCaretPosition(data);
    e.preventDefault();
    return data;
}