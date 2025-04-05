function countSecond() {
    if(window.focusedOnInputArea & !window.finished) {
        window.typingTime+=0.1;
    }
}

const timer = setInterval(countSecond, 100);

export function calculateCPM() {
    return window.correctCharacters*60/window.typingTime; 
}

export function calculateAccuracy() {
    if(window.incorrectCharacters) {
        return window.correctCharacters/(window.incorrectCharacters+window.correctCharacters)*100;
    }
    return 100;
}
