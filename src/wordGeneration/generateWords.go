package generateWord

import (
	"encoding/json"
	"math/rand"
	"os"
	"time"
)

type WordsData struct {
	Words []string `json:"words"`
}

type PresetsData struct {
	Presets      []string `json:"presets"`
	PresetsPaths []string `json:"presetsPaths"`
}

var words []string

var presetsListPath = "data/presets/presetsList.json"

func ConvertPath(id string) string {
	file, err := os.ReadFile(presetsListPath)
	if err != nil {
		return "Cannot read file(generateWords.go)"
	}

	var data PresetsData
	err = json.Unmarshal(file, &data) //Get from json file all content with name "word"
	if err != nil {
		return "Cannot unmarshal (generateWords.go)"
	}

	ids := data.Presets
	paths := data.PresetsPaths

	for i := 0; i < len(ids); i++ {
		if ids[i] == id {
			return paths[i]
		}
	}

	return "Cannot find path for index(generateWords.go)"
}

func LoadWords(filename string) error {
	println(filename)
	file, err := os.ReadFile(filename)
	if err != nil {
		return err
	}

	var data WordsData
	err = json.Unmarshal(file, &data) //Get from json file all content with name "word"
	if err != nil {
		return err
	}

	words = data.Words
	return nil
}

func GenerateRandomWords(count int) string {
	rand.NewSource(time.Now().UnixNano()) //Giving seed
	if len(words) == 0 {
		return ""
	}

	result := ""
	for i := 0; i < count; i++ {
		word := words[rand.Intn(len(words))] //Getting random word
		wrappedWord := ""
		for _, c := range word {
			wrappedWord += `<span class="char">` + string(c) + `</span>` //Adding word as letters
		}
		if i != count-1 { //We arent adding space after last word
			wrappedWord += `<span class="char" id="space">` + ` ` + `</span>` //Adding space after word
		}
		result += `<span class="wordContainer"><span class="word">` + wrappedWord + `</span></span>` //Adding word into container and in result
	}
	return result
}
