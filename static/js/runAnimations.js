const caret = document.getElementById('caret');
if (caret) {
    setInterval(() => {
        caret.classList.toggle('blink');
    }, 500);
}