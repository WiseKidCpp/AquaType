package wordgeneration

import (
	"encoding/json"
	"math/rand"
	"os"
	"time"
)

type WordsData struct {
	Words []string `json:"words"`
}

var words []string

func LoadWords(filename string) error {
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

func GenerateRandomWords(length int) string {
	rand.NewSource(time.Now().UnixNano()) //Giving seed
	if len(words) == 0 {
		return ""
	}

	result := ""
	for i := 0; i < length; i++ {
		word := words[rand.Intn(len(words))] //Getting random word
		wrappedWord := ""
		for _, c := range word {
			wrappedWord += `<span class="char">` + string(c) + `</span>` //Adding word as letters
		}
		if i != length-1 { //We arent adding space after last word
			wrappedWord += `<span class="char" id="space">` + ` ` + `</span>` //Adding space after word
		}
		result += `<span class="wordContainer"><span class="word">` + wrappedWord + `</span></span>` //Adding word into container and in result
	}
	return result
}
