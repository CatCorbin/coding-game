document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-btn');
    const questionContainer = document.getElementById('question-container');
    const endContainer = document.getElementById('end-container');
    const questionElement = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer-btn');
    const initialsInput = document.getElementById('initials');
    const submitButton = document.getElementById('submit-btn');
    const finalScoreDisplay = document.getElementById('final-score');
    var timer = document.getElementById('timer');
    var message = document.getElementById('message');

    let currentQuestionIndex = 0;
    //timer starts countdown at 75 seconds
    let time = 75;
    let setIntervalId = ''
    let scoresList = JSON.parse(localStorage.getItem("scoresList")) || []
    startButton.addEventListener('click', startQuiz);

    //when the "Lets code!"" button is pushed, the questions appear and the timer starts
    function startQuiz() {
        startButton.classList.add('hide');
        questionContainer.classList.remove('hide');
        setIntervalId = setInterval(countdown, 1000);
        setNextQuestion();
    }
    function countdown() {
        if (time < 0) {
            clearInterval(setIntervalId)
        } else {
            timer.textContent = time--
        }
    }
    function setNextQuestion() {
        message.textContent = ""
        //resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach((answer, index) => {
            answerButtons[index].innerText = answer.text;
            answerButtons[index].addEventListener('click', () => {
                if (question.answers[index].correct) {
                    message.textContent = "Correct!"
                    //if answer is correct, move to next question
                } else {
                    //if the answer is incorrect, subtract 3 extra seconds from timer
                    time -= 3;
                    message.textContent = "Wrong!"
                }
                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        setNextQuestion();
                    } else {
                        endQuiz();
                    }
                }, 500)
            });
        });
    }

    function endQuiz() {
        clearInterval(setIntervalId);
        questionContainer.classList.add('hide');
        endContainer.classList.remove('hide');
        //displays the final score
        finalScoreDisplay.innerText = timer.textContent;
    }

    function resetState() {
        while (answerButtons.length > 0) {
            answerButtons[0].classList.remove('hide');
        }
    }
    submitButton.addEventListener("click", function () {
        let user = {
            initial: initialsInput.value,
            score: timer.textContent
        }
        scoresList.push(user)
        localStorage.setItem("scoresList", JSON.stringify(scoresList))
    })
});