const quizBtn = document.querySelector(".quiz-start-btn")
const quizMain = document.querySelector(".quiz-main")
const intro= document.querySelector(".intro")
const getOption= document.querySelector(".option")


// quizBtn.addEventListener("click",()=>{
//     intro.style.display = "none"
//     quizMain.style.display = "flex"
// })

// getOption.addEventListener("click",()=>{
//     if (getOption.innerText=="Adios"){
//         console.log("passed")
//     }
//     else{
//         console.log("Failed")
//     }
// })


// Correct answer = data.results[0].correct_answer

fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(response => response.json())
    .then(function(quizData) {
        let quizResult = quizData.results
        let quizHtml = ""
        
        for (let data of quizResult){
            let quizOption = []
            quizOption.push(data.correct_answer)
            for (let option of data.incorrect_answers){
                quizOption.push(option)
            }
            
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
            
            randomize(quizOption)
            let quizOptionHtml = ""
            for (let option in quizOption) {
                quizOptionHtml += `
                
                `
            }

            quizHtml += `
                <section class="question" id="question">
                    <h3 class="quiz-question">${data.question}</h3>
                    <div class="quiz-options" id="quiz-options">

                        <button class="option">${data.incorrent}</button>
                        <button class="option">hola</button>
                        <button class="option">Salir</button>
                        <button class="option">walii</button>
                    </div>
                </section>
            `
        }
    })






