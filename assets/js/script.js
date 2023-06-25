// Section DOM declarations
const introScreen = document.querySelector("#intro");
const questionScreen = document.querySelector("#question");
const finishScreen = document.querySelector("#finish");
const scoresScreen = document.querySelector("#scores");
const timesUpScreen = document.querySelector("#times-up");

// Intro DOM delcarations
const scoreButton = document.querySelector("#nav-scores");
const startButton = document.querySelector("#start-button");

// Questions DOM declarations
const heading = document.querySelector("#question h2");
const questionP = document.querySelector("#question p");
const answers = document.querySelectorAll("#question li");
const correct = document.querySelector("#question #correct");
const timerHeading = document.querySelector("#question #timer");

// Finished screen DOM declarations
const finalScore = document.querySelector("#finish ul");
const initialsForm = document.querySelector("#finish form");
const initialsInput = document.querySelector("#finish input");

// Questions that I found online about DOM for the quiz along with answers
const questionLibrary = [
    {
        text: `Which of the following expressions can be used to select the element with the HTML attribute id="first"?`,
        answers: [
            {
                text: `document.querySelector('first')`,
                correct: false
            },
            {
                text: `document.getElementById('first')`,
                correct: false
            },
            {
                text: `Both of the above`,
                correct: true
            },
            {
                text: `None of the above`,
                correct: false
            }
        ]
    },
    {
        text: `What symbol do you use to declare an array in JavaScript?`,
        answers: [
            {
                text: `Square brackets: []`,
                correct: true
            },
            {
                text: `Parentheses: ()`,
                correct: false
            },
            {
                text: `Curly brackets: {}`,
                correct: false
            },
            {
                text: `Back ticks: \`\``,
                correct: false
            }
        ]
    },
    {
        text: `What is the difference between triple equals (===) and double equals (==) in JavaScript?`,
        answers: [
            {
                text: `Double equals sets a variable equal to a value, triple equals compares values/variables`,
                correct: false
            },
            {
                text: `Double equals compares value and type, triple equals only compares value`,
                correct: false
            },
            {
                text: `There is no difference`,
                correct: false
            },
            {
                text: `Triple equals compares value and type, double equals only compares value`,
                correct: true
            }
        ]
    },
    {
        text: `What is a major advantage of using back ticks (\`\`) for enclosing strings?`,
        answers: [
            {
                text: `They look cool`,
                correct: false
            },
            {
                text: `They are better for performance`,
                correct: false
            },
            {
                text: `Makes it easier for string operations`,
                correct: true
            },
            {
                text: `There is no advantage`,
                correct: false
            }
        ]
    },
    {
        text: `When passing an object or array into local storage, what method must be used?`,
        answers: [
            {
                text: `JSON.parse()`,
                correct: false
            },
            {
                text: `.toString()`,
                correct: false
            },
            {
                text: `JSON.stringify()`,
                correct: true
            },
            {
                text: `.join()`,
                correct: false
            }
        ]
    },
    {
        text: `The Document Object Model (DOM) is a hierarchy that most closely resembles what object?`,
        answers: [
            {
                text: `a tower`,
                correct: false
            },
            {
                text: `a spiderweb`,
                correct: false
            },
            {
                text: `a tree`,
                correct: true
            },
            {
                text: `a tournament bracket`,
                correct: false
            }
        ]
    },
    {
        text: `Every node in the DOM represents what?`,
        answers: [
            {
                text: `a view`,
                correct: false
            },
            {
                text: `a section`,
                correct: false
            },
            {
                text: `an HTML element`,
                correct: true
            },
            {
                text: `a link`,
                correct: false
            }
        ]
    },
    {
        text: `What method allows us to add an attribute to a DOM element?`,
        answers: [
            {
                text: `element.getAttribute()`,
                correct: false
            },
            {
                text: `element.createAttribute()`,
                correct: false
            },
            {
                text: `element.setAttribute()`,
                correct: true
            },
            {
                text: `element.makeAttribute()`,
                correct: false
            }
        ]
    },
    {
        text: `Inside which HTML element do we put the JavaScript?`,
        answers: [
            {
                text: `<javascript>`,
                correct: false
            },
            {
                text: `<js>`,
                correct: false
            },
            {
                text: `<script>`,
                correct: true
            },
            {
                text: `<scripting>`,
                correct: false
            }
        ]
    },
    {
        text: `According to the DOM, everything in an HTML document is a _________ .`,
        answers: [
            {
                text: `Tree`,
                correct: false
            },
            {
                text: `Node`,
                correct: true
            },
            {
                text: `Table`,
                correct: false
            },
            {
                text: `Branches`,
                correct: false
            }
        ]
    }
]

// Record score for each round. Accessed by startGame() and showFinishScreen()
let tally = {
    correct: 0,
    incorrect: 0,
    timeLeftCount: 0
}

// Function to show intro on page load or if user chooses to play again
const init = () => {
    scoresScreen.classList.add("hide");
    introScreen.classList.remove("hide");
    scoreButton.classList.remove("hide");
}

// Function to start the quiz after Intro screen */
const startQuiz = () => {
    introScreen.classList.add("hide");
    scoreButton.classList.add("hide");
    questionScreen.classList.remove("hide");

    // Clears existing correct message if user reinitiates game after completing
    correct.innerHTML = "";

    // Record scores for each round
    let correctCount = 0;
    let incorrectCount = 0;

    // Declares empty array for the four answers to each question
    const answerText = document.querySelectorAll("#question li span");

    // Set how many seconds you want the quiz duration to be
    let timeLeft = 60;
    timerHeading.textContent = `Timer: ${timeLeft}`;

    document.querySelector("#question #timer").innerText = `Timer: ${timeLeft}`;

    // "Index" value to go to next question after answer is clicked
    let questionCounter = 0;

    // Function to switch questions once answered
    const questionServer = (question) => {
        heading.textContent = `Question ${question + 1}`;
        questionP.textContent = questionLibrary[question].text;
        let answerCounter = 0;
        answers.forEach(answer => {
            answerText[answerCounter].textContent = questionLibrary[question].answers[answerCounter].text;
            // answer.appendChild(answerText[answerCounter - 1]);
            answer.setAttribute("data-correct", `${questionLibrary[question].answers[answerCounter].correct}`);
            answerCounter++;
        })
    }

    const timerFunction = () => {
        timerHeading.textContent = `Timer: ${timeLeft}`;

        // Implements if timer runs out
        if (timeLeft <= 0) {
            // Prevents questionTimer from continuing to run in background
            clearInterval(questionTimer);
            questionScreen.classList.add("hide");
            timesUpScreen.classList.remove("hide");
            // Removes answer event listeners so they aren't stacked on next startGame() call
            answers.forEach(answer => {
                answer.removeEventListener("click", questionChecker);
            })
            let timeLeft2 = 2;
            // Timer for how long Times Up screen displays
            const timesUpTimer = setInterval(function () {
                if (timeLeft2 === 0) {
                    // Prevents timesUpTimer from continuing to run in background
                    clearInterval(timesUpTimer);
                    timesUpScreen.classList.add("hide");
                    // Stores finish time and scores in global tally object
                    tally.timeLeftCount = timeLeft;
                    tally.correct = correctCount;
                    tally.incorrect = incorrectCount;
                    showFinishScreen();
                }
                timeLeft2--;
            }, 1000);
            // Prevents timeLeft decrementer from running again (resulting in -1 final time) if timer hits 0
            return;
        }
        timeLeft--;
        // Sets 1 second interval
    }

    // Start timer once you start the quiz
    const questionTimer = setInterval(timerFunction, 1000);

    // Initializes first question before event listeners take over
    questionServer(0);

    // Function to evaluate if questions are correct and serve next question
    const questionChecker = event => {

        if (
            // Checks list item and parent of list item (if user clicks on span)
            (event.target.dataset.correct === "true") ||
            (event.target.parentElement.dataset.correct === "true")
        ) {
            correctCount++;
            correct.innerHTML = "<em>Correct!</em>";
        } else {
            // Makes sure timer doesn't drop into negative value on screen
            if (timeLeft >= 5) {
                timeLeft -= 5;
            } else {
                timeLeft = 0;
            }

            incorrectCount++;
            correct.innerHTML = "<strong>WRONG</strong>";
        }

        questionCounter++;
        // Gives questions based on how many are in the question library
        if (questionLibrary[questionCounter]) {
            questionServer(questionCounter);

            // Once all questions have been answered
        } else {
            // Stops the timer
            clearInterval(questionTimer);
            // Stores finish time and scores in global tally object
            tally.timeLeftCount = timeLeft;
            tally.correct = correctCount;
            tally.incorrect = incorrectCount;
            showFinishScreen();

            // Resets questionCounter to 1
            questionCounter = 1;
            // Removes answer event listeners so they aren't stacked on next startGame() call
            answers.forEach(answer => {
                answer.removeEventListener("click", questionChecker);
            })
        }
    };

    // Assigns event listeners to call questionChecker function when an answer is clicked
    answers.forEach(answer => {
        answer.addEventListener("click", questionChecker);
    })
}

// Final score that shows up at the end and saved into local storage
let finalScoresArray = [];

const showFinishScreen = () => {
    questionScreen.classList.add("hide");
    finishScreen.classList.remove("hide");

    // Clears any existing score so new score isn't appended onto existing list items
    finalScore.innerHTML = "";

    const listItems = [];

    // Creates an array of 3 list items
    for (let i = 0; i < 3; i++) {
        listItems.push(document.createElement("li"));
    }

    // Assigns score values to list items
    listItems[0].textContent = `Time Remaining: ${tally.timeLeftCount}`;
    listItems[1].textContent = `# Right: ${tally.correct}`;
    listItems[2].textContent = `# Wrong: ${tally.incorrect}`;

    // Appends each list item to ul
    listItems.forEach(listItem => {
        finalScore.appendChild(listItem);
    })

    const initialsSubmission = event => {
        event.preventDefault();

        // Adds initials property to tally object
        tally.initials = initialsInput.value;

        // Creates array of tally properties to push to tallyArray
        const tallyArray = [tally.initials, tally.timeLeftCount, tally.correct];
        finalScoresArray.push(tallyArray);

        // Sends tallyArray to localStorage
        localStorage.setItem("scores", JSON.stringify(finalScoresArray));
        showScores();

        // Removes event listener so that event listeners aren't stacked on input submission
        initialsForm.removeEventListener("submit", initialsSubmission);
    }

    // Allows submission of initials in the form
    initialsForm.addEventListener("submit", initialsSubmission);
}

const showScores = () => {
    questionScreen.classList.add("hide");
    finishScreen.classList.add("hide");
    introScreen.classList.add("hide");
    scoreButton.classList.add("hide");
    scoresScreen.classList.remove("hide");

    const scoreList = document.querySelector("#scores ul");

    // Retrieves scores value from localStorage
    const scores = JSON.parse(localStorage.getItem("scores"));

    const playAgain = document.querySelector("#play-again");

    playAgain.addEventListener("click", init);

    // Checks if there are scores to display in LocalStorage() -- otherwise filler text is shown
    if (scores) {
        const scoreListItems = [];

        // Clears any existing scores so list items aren't appended onto existing list items
        scoreList.innerHTML = "";

        // Creates as many list items as there are score entries
        for (let i = 0; i < scores.length; i++) {
            scoreListItems.push(document.createElement("li"));
        }

        // Have scores descending from highest
        scores.sort((a, b) => {
            // If # correct is the same, defer to fastest time
            if (b[2] === a[2]) {
                return b[1] - a[1];
            } else {
                return b[2] - a[2];
            }
        });

        // Assigns scores from each round to one list item
        for (let i = 0; i < scoreListItems.length; i++) {
            scoreListItems[i].textContent = `${scores[i][0]}: ${scores[i][2]} correct | ${scores[i][1]} seconds`;
            scoreList.appendChild(scoreListItems[i]);
        }

        const clearScores = document.querySelector("#clear-scores");

        clearScores.addEventListener("click", () => {
            localStorage.clear();
            scoreListItems.forEach(listItem => {
                listItem.remove();
            })
            scoreList.innerHTML = "<p>Cleared!</p>";
            // Empties array so scores aren't saved when localStorage is cleared
            finalScoresArray = [];
        })
    } else {
        // misc text if local storage is empty
        scoreList.innerHTML = "<p>Awaiting new scores!</p>";
    }
}

// Button to start the quiz once you click it
startButton.addEventListener("click", startQuiz);

// Shows high scores saved on local storage
scoreButton.addEventListener("click", showScores);

// Calls init() at run time
init();