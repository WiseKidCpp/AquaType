package main

import (
	presetsList "AquaType/src/requests"
	generateWord "AquaType/src/wordGeneration"
	"encoding/json"
	"html/template"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	var wordsCnt int = 50

	randomWords := generateWord.GenerateRandomWords(wordsCnt) //Generating some words
	presetsListObj := presetsList.ShowPresetsList()

	tmpl, err := template.ParseFiles("mainPage.html") //Parsing html file
	if err != nil {
		http.Error(w, "Maket loading error(server.go): "+err.Error(), http.StatusInternalServerError)
		return
	}

	data := struct {
		RandomText  template.HTML //{{.RandomText}}
		PresetsList template.HTML
	}{
		RandomText:  template.HTML(randomWords), //Adding randomWords in html file
		PresetsList: template.HTML(presetsListObj),
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, "Executing error(server.go): "+err.Error(), http.StatusInternalServerError)
	}
}

type RequestData struct {
	Preset string `json:"preset"`
}

func getWordsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	if r.Method != "POST" {
		http.Error(w, "Method denied(server.go)", http.StatusMethodNotAllowed)
		return
	}

	var data RequestData
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "Parse error in JSON (server.go): "+err.Error(), http.StatusBadRequest)
		return
	}

	err := generateWord.LoadWords(generateWord.ConvertPath(data.Preset))
	if err != nil {
		panic("Loading words error(request,server.go): " + err.Error())
	}
	words := generateWord.GenerateRandomWords(50)

	response := map[string]interface{}{
		"words": words,
	}

	json.NewEncoder(w).Encode(response)
}

func main() {
	err := generateWord.LoadWords("data/presets/en/englishSimple.json") //Getting default words from json file
	if err != nil {
		panic("Loading words error(server.go): " + err.Error())
	}

	err = presetsList.GetPresetsList("data/presets/presetsList.json")
	if err != nil {
		panic("Loading presets list error(server.go): " + err.Error())
	}

	http.HandleFunc("/", handler)
	http.HandleFunc("/getWordsHandler", getWordsHandler)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	println("Сервер запущен: http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
