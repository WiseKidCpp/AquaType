import { updateData } from "./inputHandler.js";
import { updateGlobals } from "./progressChecker.js";
async function sendRequest(presetElement) {
    console.log("sending data");
    try {
        const response = await fetch('/getWordsHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Preset: presetElement.id,
        }),
      });
  
        if (!response.ok) throw new Error('Ошибка запроса');
        const data = await response.json();
        
        const textInputArea = document.getElementById('textInputArea');
        if (textInputArea) {
            textInputArea.innerHTML = data.words;
            updateGlobals();
            updateData();
            console.log('Text updated successfully');
        }
    } catch (error) {
      console.error('Error(sendRequest):', error);
    }
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('presetsListButton')) {
        const clickedElement = e.target.closest('.presetsListButton');
        if (clickedElement) {
            sendRequest(clickedElement);
            window.presetsListOpened = false;
            presetsListMenu = document.getElementById('presetsListMenu');
            presetsListMenu.style.display = 'none';
        }
    }
});
