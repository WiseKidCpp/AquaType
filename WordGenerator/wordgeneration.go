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

// Загружает слова из JSON-файла
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
	rand.NewSource(time.Now().UnixNano())
	return nil
}

// Генерирует случайную строку из N слов
func GenerateRandomPhrase(length int) string {
	if len(words) == 0 {
		return ""
	}

	result := ""
	for i := 0; i < length; i++ {
		result += words[rand.Intn(len(words))] + " "
	}
	return result
}
