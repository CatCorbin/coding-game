document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-btn');
    const questionContainer = document.getElementById('question-container');
    const endContainer = document.getElementById('end-container');
    const questionElement = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer-btn');
    const initialsInput = document.getElementById('initials');
    const submitButton = document.getElementById('submit-btn');
    const finalScoreDisplay = document.getElementById('final-score');

    let currentQuestionIndex = 0;
    //timer starts countdown at 60 seconds
    let time = 60;

    startButton.addEventListener('click', startQuiz);

    function startQuiz() {
        startButton.classList.add('hide');
        questionContainer.classList.remove('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach((answer, index) => {
            answerButtons[index].innerText = answer.text;
            answerButtons[index].addEventListener('click', () => {
                if (index === question.correct) {
                    //if answer is correct, move to next question
                } else {
                    //if the answer is incorrect, subtract 3 extra seconds from timer
                    time -= 3; 
                }
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    setNextQuestion();
                } else {
                    endQuiz();
                }
            });
        });
    }

    function endQuiz() {
        questionContainer.classList.add('hide');
        endContainer.classList.remove('hide');
        //displays the final score
        finalScoreDisplay.innerText = time;
    }

    function resetState() {
        while (answerButtons.length > 0) {
            answerButtons[0].classList.remove('hide');
        }
    }
});

const questions = [
    {
        question: 'Commonly used data types do NOT include:',
        answers: [
            { text: 'strings', correct: false },
            { text: 'booleans', correct: false },
            { text: 'alerts', correct: true },
            { text: 'numbers', correct: false }
        ]
    },
    {
        question: 'A condition in an if/else statement is enclosed with:',
        answers: [
            { text: 'parentheses', correct: true },
            { text: 'curly brackets', correct: false },
            { text: 'quotes', correct: false },
            { text: 'square brackets', correct: false }
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store:',
        answers: [
            { text: 'numbers and strings', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'booleans', correct: false },
            { text: 'all of the above', correct: true }
        ]
    },
    {
        question: 'String values must be enclosed within _____ when being assigned to variables:',
        answers: [
            { text: 'commas', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'quotes', correct: true },
            { text: 'parentheses', correct: false }
        ]
    },
];