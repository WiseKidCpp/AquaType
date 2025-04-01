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
	err = json.Unmarshal(file, &data)
	if err != nil {
		return err
	}

	words = data.Words
	return nil
}

func GenerateRandomWords(length int) string {
	rand.NewSource(time.Now().UnixNano())
	if len(words) == 0 {
		return ""
	}

	result := ""
	for i := 0; i < length; i++ {
		word := words[rand.Intn(len(words))]
		wrappedWord := ""
		for _, c := range word {
			wrappedWord += `<span class="char">` + string(c) + `</span>`
		}
		wrappedWord += `<span class="char">` + ` ` + `</span>`
		result += `<span class="word">` + wrappedWord + `</span><span class="space"></span>`
	}
	return result
}
