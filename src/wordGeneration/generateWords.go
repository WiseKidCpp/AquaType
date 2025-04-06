package generateWords

import (
	"encoding/json"
	"math/rand"
	"os"
	"strings"
	"time"
)

type WordsData struct {
	Words []string `json:"words"`
	Text  string   `json:"text"`
}

type TextData struct {
	Count int      `json:"count"`
	Name  []string `json:"name"`
	Path  []string `json:"path"`
}

type PresetsData struct {
	Presets      []string `json:"presets"`
	PresetsPaths []string `json:"presetsPaths"`
	Texts        []string `json:"texts"`
}

var words []string

var presetsListPath = "data/presets/presetsList.json"

func ConvertPath(id, typeOfText string) string {
	if typeOfText == "randomWords" {
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
	if typeOfText == "fullText" {
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
		texts := data.Texts

		for i := 0; i < len(ids); i++ {
			if ids[i] == id {
				return texts[i]
			}
		}
	}
	return "Cannot get type of text(generateWords.go)"
}

func LoadWords(filename, typeOfText string) error {
	if typeOfText == "randomWords" {
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
	if typeOfText == "fullText" {
		println(filename)
		file, err := os.ReadFile(filename)
		if err != nil {
			return err
		}

		var data TextData
		err = json.Unmarshal(file, &data) //Get from json file all content with name "word"
		if err != nil {
			return err
		}

		path := data.Path[rand.Intn(data.Count)]

		println(path)

		filePath, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		var dataPath WordsData
		err = json.Unmarshal(filePath, &dataPath) //Get from json file all content with name "word"
		if err != nil {
			return err
		}

		words = strings.Fields(dataPath.Text)

		return nil
	}
	return nil
}

func GenerateText(count int, typeOfText string) string {
	if typeOfText == "randomWords" {
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
	if typeOfText == "fullText" {
		result := ""
		for i := 0; i < len(words); i++ {
			word := words[i]
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
	return "unnamed type of text (generateWords.go)"
}
