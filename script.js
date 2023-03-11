const quizBtn = document.querySelector(".quiz-start-btn")
const quizMain = document.querySelector(".quiz-main")
const intro= document.querySelector(".intro")
const getOption = document.getElementById("option")
const answerBtn = document.getElementById("answer-btn")

const numberOfQuestions = 5


quizBtn.addEventListener("click",()=>{
    intro.style.display = "none"
    quizMain.style.display = "flex"
})




function randomize(values) {
    let index = values.length,
    randomIndex;
    
    while (index != 0) {
        randomIndex = Math.floor(Math.random() * index);
        index--;
        
        [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
    }
    return values;
}
fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`)
// fetch("./sample_input.json")
.then(response => response.json())
    .then(function(quizData) {
        showData(quizData)
})

function showData(quizData) {
    let quizHtml = ""
    quizResult = quizData.results
    for(let i = 0; i < quizResult.length;i++){
        let quizOptionHtml = ""
        let quizOption = []
        quizOption.push(quizResult[i].correct_answer)
        for (let option in quizResult[i].incorrect_answers){
            quizOption.push(quizResult[i].incorrect_answers[option])
        }
        for (let option in quizOption){ 
            quizOptionHtml += `
                <div class="option-container">
                    <input type="radio" id='${quizOption[option]}' name="question-${i}" value='${quizOption[option]}' class="option">
                    <label for='${quizOption[option]}' class="option-label">${quizOption[option]}</label>
                </div>
            `
        }
        quizHtml += `
            <section class="question" id="question">
                    <h3 class="quiz-question">Q${i+1}:  ${quizResult[i].question}</h3>
                    <div class="quiz-options" id="quiz-options">
                        ${quizOptionHtml}
                    </div>
                </section>
        `
    }
    document.getElementById("quiz-question-container").innerHTML = quizHtml
}

function checkedOption(arr){
    for (let i of arr){
        if (i.checked){
            return i.value
        }
    }}

// Selected Answers Stored Here
let selectedAnswer = {}
answerBtn.addEventListener("click", ()=>{
    for (let i=0 ; i < numberOfQuestions ; i++){
        selectedAnswer[`question-${i}`] = checkedOption(document.getElementsByName(`question-${i}`))
    }

    console.log(selectedAnswer)
})
