const openPresetsListButton = document.getElementById("openPresetsListButton");
const presetsListMenu = document.getElementById("presetsListMenu");

openPresetsListButton.onclick = function() {
    if(window.presetsListOpened) {
        window.presetsListOpened = false;
        presetsListMenu.style.display = 'none';
    }
    else {
        window.presetsListOpened = true;
        presetsListMenu.style.display = 'block';
    }
}