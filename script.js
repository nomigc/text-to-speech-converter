//require elements
const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis;
let isSpeaking = true;

function voices(){
    for(let voice of synth.getVoices()){
        // "google english us" voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        // passing voice and language in option tag
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend" , option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utternance.voice = voice;
        }
    }
    synth.speak(utternance); //speak text
}

speechBtn.addEventListener("click" , e =>{
    e.preventDefault();
    if(textarea.value !==""){
        if(!synth.speaking){
            textToSpeech(textarea.value);

        }
        if(textarea.value.length > 80){
            // pause speech and resuem speech 
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech"
            }
            else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech"
            }
            // text again change to convert to speech after speech is end
            setInterval( () =>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            });
        }
        else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});