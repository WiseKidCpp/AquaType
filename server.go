package main

import (
	wordgeneration "AquaType/wordgenerator" // Замените на реальный путь
	"html/template"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	// Генерация случайной фразы
	randomString := wordgeneration.GenerateRandomPhrase(5)

	// Загрузка HTML-шаблона
	tmpl, err := template.ParseFiles("index.html")
	if err != nil {
		http.Error(w, "Ошибка загрузки шаблона: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Данные для шаблона
	data := struct {
		RandomText string
	}{
		RandomText: randomString,
	}

	// Рендеринг
	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, "Ошибка рендеринга: "+err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	// Загрузка слов из JSON
	err := wordgeneration.LoadWords("data/words/en/en1.json")
	if err != nil {
		panic("Не удалось загрузить слова: " + err.Error())
	}

	// Роутинг
	http.HandleFunc("/", handler)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Запуск сервера
	println("Сервер запущен: http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
