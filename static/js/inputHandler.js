const hiddenInput = document.getElementById('hidden-input');
const textArea = document.getElementById('textInputArea');
const caret = document.getElementById('caret');
let currentCharIndex = 0;
let chars = [];

function init() {
    chars = Array.from(textArea.querySelectorAll('.char'));
    if (chars.length > 0) {
        caret.style.display = 'block'; // Включаем видимость
        updateCaretPosition();
    }
    
    window.addEventListener('resize', updateCaretPosition);
}

function updateCaretPosition() {
    if (currentCharIndex >= chars.length) return;
    
    const charElement = chars[currentCharIndex];
    const rect = charElement.getBoundingClientRect();
    const parentRect = textArea.getBoundingClientRect();
    
    // Позиция в начале символа
    caret.style.left = `${rect.left - parentRect.left}px`;
    caret.style.top = `${rect.top - parentRect.top}px`;
    caret.style.height = `${rect.height}px`;
}

hiddenInput.addEventListener('keydown', e => {
    if (currentCharIndex >= chars.length) return;

    // Обработка Backspace
    if (e.key === 'Backspace') {
        if (currentCharIndex > 0) {
            currentCharIndex--;
            chars[currentCharIndex].classList.remove('correct', 'incorrect');
            updateCaretPosition();
        }
        e.preventDefault();
        return;
    }

    // Фильтрация только букв и пробелов
    if (!/^[a-zA-Zа-яА-Я ]$/.test(e.key)) {
        e.preventDefault();
        return;
    }

    const currentChar = chars[currentCharIndex];
    const expectedChar = currentChar.textContent;

    if (e.key === expectedChar) {
        currentChar.classList.add('correct');
    } else {
        currentChar.classList.add('incorrect');
    }
    
    currentCharIndex++;
    updateCaretPosition();
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', init);    