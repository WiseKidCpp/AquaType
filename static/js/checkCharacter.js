import { updateCaretPosition } from "./updateCaretPosition.js";
import { calculateCPM, calculateAccuracy } from "./progressChecker.js";
export function checkCharacter(e, data) {
    if (e.key === 'Backspace' & !window.finished) {
        if (data.currentCharIndex > data.lastErasable) {
            data.currentCharIndex--;
            if(data.chars[data.currentCharIndex].classList.contains('correct')) {
                window.correctCharacters--;
            }
            else {
                window.incorrectCharacters--;
            }
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
        window.correctCharacters++;
    } else {
        if(expectedChar === ` `) {
            currentChar.classList.add('spaceIncorrect');
        }
        currentChar.classList.add('incorrect');
        window.incorrectCharacters++;
    }
    
    
    data.currentCharIndex++;
    data = updateCaretPosition(data);
    
    if(data.currentCharIndex === data.chars.length) {
        console.log(`Correct characters:` + window.correctCharacters);
        console.log(`Incorrect characters:` + window.incorrectCharacters);
        console.log(`Time:` + window.typingTime);
        console.log(`CPM:` + calculateCPM());
        console.log(`Accuracy: ` + calculateAccuracy() + `%`);
        data.caret.classList.add(`nondisplay`);
        window.finished = 1;
        return data;
    }
    
    e.preventDefault();
    return data;
}