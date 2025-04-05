const topDiff = 5;
const leftDiff = -2;

export function updateCaretPosition(data) {
    if (data.currentCharIndex >= data.chars.length) return data;//If array is ended
    
    let rect = data.chars[data.currentCharIndex].getBoundingClientRect();//Getting info about current letter
    let parentRect = data.textArea.getBoundingClientRect();//Getting info about parent container
    
    let caretTop = parseInt((data.caret.style.top).slice(0, -2));
    caretTop -= topDiff;
    
    let letterTop = rect.top - parentRect.top;
    let letterLeft = rect.left - parentRect.left;
    
    if(caretTop>=0) {
        if(caretTop < letterTop) {
            data.caret.classList.add('moveMomentally');
            data.currentRow++;
            if(data.currentRow >= 4) {
                let lastCharacter = data.chars[data.chars.length-1].getBoundingClientRect();
                if(parentRect.height<=lastCharacter.top-parentRect.top) {
                    data.lastErasable = data.lastRowCharIndex;
                    data.deleteString();
                    data.currentRow--;
                    rect = data.chars[data.currentCharIndex].getBoundingClientRect();
                    letterTop = rect.top - parentRect.top;
                    letterLeft = rect.left - parentRect.left;
                }
            }
            data.preLastRowCharIndex = data.lastRowCharIndex;
            data.lastRowCharIndex = data.currentCharIndex;
            console.log(data.lastRowCharIndex);
        }
        else if(caretTop > letterTop) {
            data.caret.classList.add('moveMomentally');
            data.currentRow--;
        }
        else {
            data.caret.classList.remove('moveMomentally');
        }
    }

    data.caret.style.left = `${letterLeft + leftDiff}px`;//Setting caret left position
    data.caret.style.top = `${letterTop + topDiff}px`;//Setting caret top position

    return data;
}