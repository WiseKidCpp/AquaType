import { caret } from "./globalVars.js";
if (caret) {
    setInterval(() => {
        caret.classList.toggle('blink');
    }, 500);
}