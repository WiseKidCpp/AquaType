package presetsList

import (
	"encoding/json"
	"math/rand"
	"os"
	"time"
)

type PresetsData struct {
	Presets []string `json:"presets"`
}

var presets []string

func GetPresetsList(filename string) error {
	file, err := os.ReadFile(filename)
	if err != nil {
		return err
	}

	var data PresetsData
	err = json.Unmarshal(file, &data) //Get from json file all content with name "word"
	if err != nil {
		return err
	}

	presets = data.Presets
	return nil
}

func ShowPresetsList() string {
	rand.NewSource(time.Now().UnixNano()) //Giving seed
	if len(presets) == 0 {
		return ""
	}

	result := ""

	for i := 0; i < len(presets); i++ {
		currentPreset := presets[i]
		result += `<button class="presetsListButton" id="` + currentPreset + `">` + currentPreset + `</button>` //Adding word into container and in result
	}
	return result
}
