window.typingTime = 0;
window.focusedOnInputArea = false;
window.correctCharacters = 0;
window.incorrectCharacters = 0;
window.finished = 0;

function countSecond() {
    if(window.focusedOnInputArea & !window.finished) {
        window.typingTime+=0.1;
    }
    //console.log(window.typingTime);
}
const timer = setInterval(countSecond, 100);
export function calculateCPM() {
    return window.correctCharacters*60/window.typingTime; 
}
export function calculateAccuracy() {
    if(window.incorrectCharacters) {
        return window.correctCharacters/window.incorrectCharacters*100;
    }
    return 100;
}
