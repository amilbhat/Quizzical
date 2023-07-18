const quizBtn = document.querySelector(".quiz-start-btn")
const quizMain = document.querySelector(".quiz-main")
const scoreBoard = document.querySelector(".scoreboard")
const intro= document.querySelector(".intro")
const getOption = document.getElementById("option")
const answerBtn = document.getElementById("answer-btn")

const numberOfQuestions = 5
let correctAnswer  = {}
let selectedAnswer = {}
let score = 0

quizBtn.addEventListener("click",()=>{
    quizBtn.disabled = "true";
    setTimeout(()=> {
        intro.style.display = "none"
        quizMain.style.display = "flex"
    }, 1000)

    fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`)
    .then(response => response.json())
    .then(function(quizData) {
            showData(quizData)
    })
    .catch ((error) => {
        alert(`Ther was an error: \n${error}`)
    })
})



// Option Randomize
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



let correctChoices=[]
function showData(quizData) {
    let quizHtml = ""
    quizResult = quizData.results
    for(let i = 0; i < quizResult.length;i++){
        let quizOptionHtml = ""
        let quizOption = []
        correctAnswer[`question-${i}`] = quizData.results[`${i}`].correct_answer
        quizOption.push(quizResult[i].correct_answer)
        correctChoices.push(quizResult[i].correct_answer)

        for (let option in quizResult[i].incorrect_answers){
            quizOption.push(quizResult[i].incorrect_answers[option])
        }
        randomize(quizOption)
        for (let option in quizOption){ 
            quizOptionHtml += `
                <div class="option-container">
                    <input type="radio" id='${quizOption[option]}' name="question-${i}" value='${quizOption[option]}' class="option">
                    <label for='${quizOption[option]}' class="option-label ${quizOption[option]}">${quizOption[option]}</label>
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
            return i
        }
    }
}


    // Selected Answers Stored Here
answerBtn.addEventListener("click",()=>{
    // Storing the selected answers in selectedAnswer Object 
    try{
            for (let i=0 ; i < numberOfQuestions ; i++){
                selectedAnswer[`question-${i}`] = checkedOption(document.getElementsByName(`question-${i}`)).value
            }
            checkAnswer()
        }
        catch(err) {
            alert("Make Sure to select all options")
        }
    
    
})

function checkAnswer() {
    for (let i=0;i < numberOfQuestions; i++){
        if (correctAnswer[`question-${i}`] === selectedAnswer[`question-${i}`]){
            score++;
            document.getElementsByClassName(checkedOption(document.getElementsByName(`question-${i}`)).value)[0].setAttribute("id", "correct");
        }else {
            document.getElementsByClassName(checkedOption(document.getElementsByName(`question-${i}`)).value)[0].setAttribute("id", "incorrect");
        }
    }
    calculateScore(score)
}

function calculateScore(score) {
    scoreBoard.style.display = "flex";
    scoreBoard.innerHTML=`
        <p id="score">Your Score is ${score} out of 5 </p>
        <button class = "retry-btn"><a href="./index.html">Retry</a></button>`
    quizBtn.disabled = "false";
}












