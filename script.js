const quizBtn = document.querySelector(".quiz-start-btn")
const quizMain = document.querySelector(".quiz-main")
const intro= document.querySelector(".intro")
const getOption = document.getElementById("option")
const answerBtn = document.getElementById("answer-btn")

const numberOfQuestions = 5
let correctAnswer  = {}
let selectedAnswer = {}


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
// fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`)
fetch("./sample_input.json")
.then(response => response.json())
    .then(function(quizData) {
        showData(quizData)
})
    // .then(function(quizData){
    //     display_ans(quizData)
    // })

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
answerBtn.addEventListener("click",()=>{
    // Storing the selected answers in selectedAnswer Object 
    for (let i=0 ; i < numberOfQuestions ; i++){
        selectedAnswer[`question-${i}`] = checkedOption(document.getElementsByName(`question-${i}`))
    }
    
    console.log(checkAnswer(selectedAnswer, correctAnswer))
    console.log(selectedAnswer)
    console.log(correctAnswer)
    
})

// Function not working
function checkAnswer(selectedAnswer, correctAnswer) {
    let incorrectSelected = []
    for (let i; i < correctAnswer.length ; i++){
        if (selectedAnswer[`question-${i}`] === correctAnswer[`question-${i}`]){
            incorrectSelected.push(`question-${i}`)
            incorrectSelected.push(`i`)
        }else{
            incorrectSelected.push("False")
        }
    }
    return incorrectSelected
}


// Fix Check answer 




// Change correct answer to green
// Change Wrong answer to Red
// Display Score 
// Additional Tasks ..........
// Add Number of questions option








