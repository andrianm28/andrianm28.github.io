const subbtn = document.querySelector("#sub-button")
const restartbtn = document.querySelector("#restart")
const textbtn = document.querySelector("#new-text")
const text = document.querySelector("#typing-box")
const dropdownChoice = document.querySelector(".select-box")
const wpmHTML = document.querySelector(".WPM")
const cpmHTML = document.querySelector(".CPM")
const timer = document.querySelector(".timer")

let testText = document.querySelector("#text-case")
let minutes = 0, seconds = 0, ms = 0, WPM = 0, CPM = 0
let numWords = 0, letterIndex = 0, wordIndex = 0, numberOfMistakes = 0
let interval, spanArray = [], letterArray = [], errorState

function displayZero(time){
    time <= 9 ? time = "0" + time : time
    return time
}

function runTimer(){ 
    timer.innerHTML = displayZero(minutes) + ":" + displayZero(seconds) + ":" + displayZero(ms)
    ms++
    displayWPM_and_CPM(minutes, seconds, ms);
    if(seconds === 60){
        seconds = 0
        minutes++
    }
    if(ms === 100){
        ms = 0
        seconds++
    }
}

function startTimer(){
    let textLength = text.value.length
    textLength === 0 ? interval = setInterval(runTimer, 10) : interval
}

function restartTest(){
    clearInterval(interval)
    timer.innerHTML = "00:00:00"
    text.value = ""
    minutes = 0; seconds = 0; ms = 0
    text.style.border = "6px solid grey"
    wpmHTML.innerHTML = "WPM: 00"
    cpmHTML.innerHTML = "CPM: 00"
    letterIndex = 0
    wordIndex = 0
    WPM = 0
    CPM = 0
    numWords = 0
    numberOfMistakes = 0
    spanArray.map(char => {
        char.style.background = 'white'
        char.style.color = 'black'
    });
}

function countWords(){
    let textLength = text.value.length;
    text.value.substring((textLength-1), textLength) == " " ? numWords++ : numWords
}

function displayWPM_and_CPM(mins, secs, ms){
    let totalSeconds = (mins*60) + secs + (ms/100);
    let textInput = text.value
    let numChars = textInput.length
    let wpmHTML2 = "CPM: " + CPM
    let cpmHTML2 = "WPM: " + WPM
    CPM = Math.floor((numChars / totalSeconds) * 60)
    WPM = Math.floor((numWords / totalSeconds) * 60)
    wpmHTML.innerHTML = wpmHTML2
    cpmHTML.innerHTML = cpmHTML2
}

function checkStringEquality() {
    let textInput = text.value
    let completeTestText = testText.value
    let parsedTestText
    console.log(textInput)
    console.log(completeTestText)
    console.log(timer.innerHTML)
    if(timer.innerHTML[1] === '1'){
        text.style.border = "8px solid green"
        clearInterval(interval)
        alert((`Your score: ${wpmHTML.innerHTML} ${cpmHTML.innerHTML}`))
    } else if(textInput == parsedTestText){
        errorState = false
        text.style.border = "8px solid lightblue"
    } else{
        if(!errorState)
            numberOfMistakes++
        errorState = true
        text.style.border = "8px solid pink"
    }
}

function highlightWords(){
    console.log(text.value)
    let textInput = text.value;
    let textLength = textInput.length;
    let inputLetter = textInput.substring((textLength - 1), textLength)
    if(letterArray[letterIndex] == inputLetter){
        letterIndex++
        spanArray[wordIndex].style.background = "green"
        spanArray[wordIndex].style.borderRadius = "5px"
        if(letterArray[letterIndex] == " "){
            spanArray[wordIndex].style.background = "lightgreen"
            spanArray[wordIndex].style.color = "white"
            spanArray[wordIndex].style.borderRadius = "5px"
            wordIndex++;
        }
    }
    else {
        spanArray[wordIndex].style.background = "red"
        spanArray[wordIndex].style.borderRadius = "5px"
        numberOfMistakes++
    }
}

function createLetterArray(){
    for(let i = 0; i < spanArray.length; i++){
        let separatedWord = spanArray[i].innerHTML
        separatedLetter = separatedWord.split("")
        for(let j = 0; j < separatedWord.length; j++){
            letterArray.push(separatedLetter[j])
        }
    }
}

function createTestText(text){
    let testTextValue = text
    let separatedText = testTextValue.split(" ")
    spanArray = []
    letterArray = [];
    testText.innerHTML = ""
    for(let i = 0; i < separatedText.length; i++){
        let separatedWord = document.createElement("span")
        let node = document.createTextNode((separatedText[i] + " "))
        separatedWord.appendChild(node)
        spanArray.push(separatedWord);
        testText.appendChild(separatedWord)
    }
    createLetterArray()
}

textcase = `Tos emam teu acan Bade kamana deui Iraha kadieu Tos Lami teu uih Kumaha ieu urang teu bisa Ulah loba gaya Geus teu kuat Hayang Kawin Ulah nyo'o hp wae Hapunten Abdi teu Tiasa dongkap Teu kuat hayang seuri Punten upami WC palih mana nya Neng aa sono Punten pangnyandakeun eta Maneh mah jahat ih Geura nyangu geus lapar Ti isuk can mandi Ulah garelut didieu Abdi teu damang Geura sare geus peuting Loba laleur di imah maneh mah Eta ucing paraban Karunya Bapa abdi bageur Mamah abdi bageur Maneh mah beuki heureuy Ulah lila teuing atuh Maneh mah ngabohong wae Lanceuk urang mah lalaki Tong tarik teuing atuh mawana Hayang nginum Sorangan wae Ti peuting keneh can balik Tos lami pupus Geura dicalana Teu gaduh acis Keur beberesih Maneh haus teu Teu kadenge ulah laun teuing Abdi bogoh kasalira Ulah loba gaya bisi dicabok Eta baju tilepan Ulah kadieu ngebul  Kin antosan sakedap deui Meuli sangu timana Mani keueung peuting tadi Malam tadi begitu sunyi Abdi sieun ku dosa Keur ngorong Maen bola jeung si eta mah di tengkasan wae Ulin atuh tong cicing wae Arateul awak`
createTestText(textcase.toLowerCase())
text.addEventListener("keyup", checkStringEquality, false)
text.addEventListener("keydown", highlightWords, false)
text.addEventListener("keypress", startTimer, false)
text.addEventListener("keyup", countWords, false)
restartbtn.addEventListener("click", restartTest, false)
