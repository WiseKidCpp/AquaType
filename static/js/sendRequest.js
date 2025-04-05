import { updateData } from "./inputHandler.js";
import { updateGlobals, textInputArea } from "./globalVars.js";
async function sendRequest(element) {
  if(element.classList.contains('presetsListButton')) {
    console.log("sending data(preset)");
    try {
      const response = await fetch('/getWordsHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Preset: element.id,
          Type: window.currentTypeOfText,
        }),
      });
  
      if (!response.ok) throw new Error('Request error(sendRequest.js)');
      const responseData = await response.json();
        
      window.currentPreset = element.id;
      textInputArea.innerHTML = responseData.words;
      updateGlobals();
      updateData();
      console.log('Text updated successfully');
    } catch (error) {
      console.error('Error(sendRequest.js):', error);
    }
  }
  else if(element.classList.contains('typesOfTextListButton')) {
    console.log("sending data(type of text)");
    try {
      const response = await fetch('/getWordsHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Preset: window.currentPreset,
          Type: element.id,
        }),
      });
  
      if (!response.ok) throw new Error('Request error(sendRequest.js)');
      const responseData = await response.json();
        
      window.currentPreset = element.id;
      textInputArea.innerHTML = responseData.words;
      updateGlobals();
      updateData();
      console.log('Text updated successfully');
    } catch (error) {
      console.error('Error(sendRequest.js):', error);
    }
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
  if (e.target.classList.contains('typesOfTextListButton')) {
    const clickedElement = e.target.closest('.typesOfTextListButton');
    if (clickedElement) {
        sendRequest(clickedElement);
        window.typesOfTextListOpend = false;
        presetsListMenu = document.getElementById('typesOfTextListButton');
        presetsListMenu.style.display = 'none';
    }
  }
});
