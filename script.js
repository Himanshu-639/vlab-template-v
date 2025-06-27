document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");

  // This event listener checks if the user has scrolled more than 10px
  // If yes, it adds the 'scrolled' class to the header (for styling changes like shrinking)
  // If not, it removes the 'scrolled' class
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});

// Object to store references to different topic sections by their IDs
let topicElements = {
  aim: document.getElementById("aim"),
  theory: document.getElementById("theory"),
  procedure: document.getElementById("procedure"),
  practice: document.getElementById("practice"),
  code: document.getElementById("code"),
  result: document.getElementById("result"),
  quiz: document.getElementById("quiz"),
  references: document.getElementById("references"),
  tnt: document.getElementById("tnt"),
};

let currentTopic = "aim"; // Track the currently displayed topic
function switchContent(topic) {
    if (topic === currentTopic) {
        return; // Prevent unnecessary updates if the same topic is clicked again
    }

    topicElements[currentTopic].style.display = 'none'; // Hide the previous topic
    topicElements[topic].style.display = 'block'; // Show the selected topic
    currentTopic = topic; // Update the current topic
}

// Generalized function to toggle language-based code blocks
function toggleCode(language) {
  const allCodeBlocks = document.querySelectorAll(".code-block");
  allCodeBlocks.forEach((block) => block.classList.remove("active"));

  const selectedCodeBlock = document.getElementById(language + "Code");
  selectedCodeBlock.classList.add("active");
}

// Clipboard copy function
function copyCode(elementId) {
  const codeBlock = document.getElementById(elementId);
  const code = codeBlock.querySelector("code").innerText;

  // Copy the selected code text to clipboard
  navigator.clipboard
    .writeText(code)
    .then(() => {
      const copyButton = codeBlock.querySelector(".copy-button");
      copyButton.textContent = "Copied!"; // Temporarily change button text
      setTimeout(() => {
        copyButton.textContent = "Copy"; // Reset text after 2 seconds
      }, 2000);
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}

// Event listeners for radio buttons
document
  .getElementById("cppRadio")
  .addEventListener("change", () => toggleCode("cpp"));
document
  .getElementById("pythonRadio")
  .addEventListener("change", () => toggleCode("python"));

// Event listener for copy buttons
document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", function () {
    const language = button.closest(".code-block").id.replace("Code", "");
    copyCode(language + "Code");
  });
});

// Quiz Logic
const questions = [
    {
        question: "Why do we apply lemmatization during preprocessing?",
        choices: [
            "A. To translate text into another language",
            "B. To reduce words to their base or dictionary form",
            "C. To identify grammatical mistakes",
            "D. To count the frequency of punctuation"
        ],
        answer: 1
    },
    {
        question: "Which of the following is not a typical step in NLP preprocessing?",
        choices: [
            "A. Tokenization",
            "B. Stopword removal",
            "C. Image enhancement",
            "D. Lemmatization"
        ],
        answer: 2
    },
    {
        question: "In the TF-IDF formula, what does a high IDF value for a term indicate?",
        choices: [
            "A. The term appears in very few documents",
            "B. The term is a stopword",
            "C. The term is common in all documents",
            "D. The term appears multiple times in one document"
        ],
        answer: 0
    },
    {
        question: "What is the role of cosine similarity in this lab?",
        choices: [
            "A. To detect rotation angles in images",
            "B. To remove punctuation from tokens",
            "C. To sort terms based on frequency",
            "D. To measure how similar the vectorized texts from two images are"
        ],
        answer: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const retakeButton = document.getElementById("retake-btn");

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("choice");
        button.addEventListener("click", () => selectAnswer(index));
        choicesContainer.appendChild(button);
    });

    nextButton.style.display = "none";
    retakeButton.style.display = "none";
}

function selectAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const choiceButtons = document.querySelectorAll(".choice");

    choiceButtons.forEach((button, index) => {
        if (index === correctAnswer) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white";
        }
    });

    if (selectedIndex === correctAnswer) {
        score++;
    }

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionElement.textContent = `Quiz Completed! Your Score: ${score} / ${questions.length}`;
    choicesContainer.innerHTML = "";
    nextButton.style.display = "none";
    retakeButton.style.display = "block";
}

retakeButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
});

showQuestion();
document.addEventListener('DOMContentLoaded', function () {
    createGrid();
});



const buttons = document.querySelectorAll('.tab-bar button');
const sections = document.querySelectorAll('.transition-wrapper');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');

    // Remove active class from all sections
    sections.forEach(section => section.classList.remove('active'));

    // Add active class to the selected section
    document.getElementById(targetId).classList.add('active');

    // Remove active-tab from all buttons
    buttons.forEach(btn => btn.classList.remove('active-tab'));

    // Add active-tab to the clicked button
    button.classList.add('active-tab');
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".reveal-step-btn");

  buttons.forEach((button, index) => {
    // Hide all buttons except the first one
    if (index !== 0) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
      button.style.margin = "20px auto";
    }

    // Attach click event to each button
    button.addEventListener("click", () => {
      const currentContainer = button.closest(".step-container");
      const nextContainer = currentContainer.nextElementSibling;

      if (nextContainer) {
        const nextStep = nextContainer.querySelector(".step");
        const nextButton = nextContainer.querySelector(".reveal-step-btn");

        if (nextStep) {
          nextStep.style.display = "block";
        }

        if (nextButton) {
          nextButton.style.display = "block";
          nextButton.style.margin = "20px auto"; // Center align
        }

        // Hide the current button
        button.style.display = "none";

        // Scroll to the newly revealed step
        nextContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
