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

    topicElements[currentTopic].style.display = "none"; // Hide the previous topic
    topicElements[topic].style.display = "block"; // Show the selected topic
    currentTopic = topic; // Update the current topic
  }

  // Show the selected language's code block
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

    navigator.clipboard
      .writeText(code)
      .then(() => {
        const copyButton = codeBlock.querySelector(".copy-button");
        copyButton.textContent = "Copied!";
        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 2000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  }

  // Only Python tab exists
  document
    .getElementById("pythonRadio")
    .addEventListener("change", () => toggleCode("python"));

  // Copy button logic
  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", function () {
      const language = button.closest(".code-block").id.replace("Code", "");
      copyCode(language + "Code");
    });
  });

  // Quiz Logic
  const questions = [
    {
      question:
        "What is the need for doing text lemmatization during preprocessing?",
      choices: [
        "To translate text into another language",
        "To reduce words to their base or dictionary form",
        "To identify grammatical mistakes",
        "To count the frequency of punctuation",
      ],
      answer: 1,
    },
    {
      question:
        "Which of the following is not a typical step in NLP preprocessing?",
      choices: [
        "Tokenization",
        "Stopword removal",
        "Image enhancement",
        "Lemmatization",
      ],
      answer: 2,
    },
    {
      question:
        "In the TF-IDF formula, what does a high IDF value for a term indicate?",
      choices: [
        "The term appears in very few documents",
        "The term is a stopword",
        "The term is common in all documents",
        "The term appears multiple times in one document",
      ],
      answer: 0,
    },
    {
      question:
        "What is the usage of cosine similarity metric in the given virtual lab?",
      choices: [
        "To detect rotation angles in images",
        "To remove punctuation from tokens",
        "To sort terms based on frequency",
        "To measure how similar the vectorized texts from two images are",
      ],
      answer: 3,
    },
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

  const buttons = document.querySelectorAll(".tab-bar button");
  const sections = document.querySelectorAll(".transition-wrapper");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");

      // Remove active class from all sections
      sections.forEach((section) => section.classList.remove("active"));

      // Add active class to the selected section
      document.getElementById(targetId).classList.add("active");

      // Remove active-tab from all buttons
      buttons.forEach((btn) => btn.classList.remove("active-tab"));

      // Add active-tab to the clicked button
      button.classList.add("active-tab");
    });
  });

  // For each wrapper (e.g., example1Wrapper, example2Wrapper, etc.)
  const wrappers = document.querySelectorAll(".transition-wrapper");

  wrappers.forEach((wrapper) => {
    const buttons = wrapper.querySelectorAll(".reveal-step-btn");

    buttons.forEach((button, index) => {
      // Hide all buttons initially
      button.style.display = "none";

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
            nextButton.style.margin = "20px auto"; // center align
          }

          // Hide the current button
          button.style.display = "none";

          // Scroll to newly revealed step
          nextContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Show only the first button of this wrapper
    const firstButton = wrapper.querySelector(
      ".step-container .reveal-step-btn"
    );
    if (firstButton) {
      firstButton.style.display = "block";
      firstButton.style.margin = "20px auto"; // center align
    }
  });

  function toggleMenu() {
    const menu = document.querySelector(".nav-menu");
    menu.classList.toggle("show");
  }

  document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
  document.querySelector(".close-btn").addEventListener("click", toggleMenu);

  document.querySelectorAll(".navigation .link").forEach((button) => {
    button.addEventListener("click", () => {
      switchContent(button.dataset.topic);
    });
  });

  document.getElementById("extract-text-btn").addEventListener("click", extractText);
  document.getElementById("preprocess-text-btn").addEventListener("click", preprocessText);
  document.getElementById("calculate-similarity-btn").addEventListener("click", calculateSimilarity);

  const imageInputs = [document.getElementById('image1'), document.getElementById('image2')];
  const previews = [document.getElementById('preview1'), document.getElementById('preview2')];
  const uploadContents = [document.getElementById('upload-content1'), document.getElementById('upload-content2')];
  const texts = [document.getElementById('text1'), document.getElementById('text2')];
  const preprocessed = [document.getElementById('pre1'), document.getElementById('pre2')];
  const base64Images = [null, null];
  const extractedTexts = ["", ""];

  imageInputs.forEach((input, index) => {
    const box = document.getElementById('box' + (index + 1));

    const handleImage = file => {
      const reader = new FileReader();
      reader.onload = function (e) {
        previews[index].src = e.target.result;
        previews[index].style.display = 'block';
        uploadContents[index].style.display = 'none';
        base64Images[index] = e.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
      };
      reader.readAsDataURL(file);
    };

    input.addEventListener('change', function () {
      if (this.files[0]) {
        handleImage(this.files[0]);
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      box.addEventListener(eventName, e => {
        e.preventDefault();
        box.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      box.addEventListener(eventName, e => {
        e.preventDefault();
        box.classList.remove('dragover');
      });
    });

    box.addEventListener('drop', e => {
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleImage(file);
      }
    });

    box.addEventListener('click', () => {
      input.value = ''; // clear previous file to avoid double trigger
      input.click();
    });
  });

  async function extractText() {
    const apiKey = 'K88181478588957';
    for (let i = 0; i < 2; i++) {
      if (!base64Images[i]) {
        texts[i].innerText = 'No image selected';
        continue;
      }
      texts[i].innerText = 'Extracting...';
      const formData = new FormData();
      formData.append('base64Image', 'data:image/jpeg;base64,' + base64Images[i]);
      formData.append('language', 'eng');
      formData.append('apikey', apiKey);
      formData.append('OCREngine', 1);
      try {
        const response = await fetch('https://api.ocr.space/parse/image', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        const parsedText = result.ParsedResults?.[0]?.ParsedText || "No text found.";
        extractedTexts[i] = parsedText;
        texts[i].innerText = parsedText;
      } catch (error) {
        texts[i].innerText = 'Error during OCR';
      }
    }
  }

  async function preprocessText() {
    const text1 = extractedTexts[0];
    const text2 = extractedTexts[1];

    if (!text1 || !text2) {
      alert("Please extract text from both images first.");
      return;
    }

    try {
      const response = await fetch('https://vlabbackend-yg1p.onrender.com/preprocess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text1, text2 })
      });

      const result = await response.json();

      // Only show preprocessed (lemmatized) text
      preprocessed[0].innerText = result.step1.lemma;
      preprocessed[1].innerText = result.step2.lemma;

      // Clear similarity output for now
      document.getElementById('similarityResult').innerText = "Similarity: Not Calculated";

    } catch (error) {
      console.error("Preprocessing failed:", error);
      alert("Backend preprocessing error.");
    }
  }


  async function calculateSimilarity() {
    const pre1 = preprocessed[0].innerText;
    const pre2 = preprocessed[1].innerText;

    if (!pre1 || !pre2) {
      alert("Please preprocess both texts first.");
      return;
    }

    try {
      const response = await fetch('https://vlabbackend-yg1p.onrender.com/similarity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text1: pre1, text2: pre2 })
      });

      const result = await response.json();
      document.getElementById('similarityResult').innerText = `Similarity: ${Math.round(result.similarity * 100)}%`;

    } catch (error) {
      console.error("Similarity calculation failed:", error);
      alert("Error while calculating similarity.");
    }
  }

  hljs.highlightAll();
});