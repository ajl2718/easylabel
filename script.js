const textDisplay = document.getElementById('textDisplay');
const questionContainer = document.getElementById('questionContainer');
const questionText = document.getElementById('questionText');
const docCounter = document.getElementById('docCounter');
const doneMessage = document.getElementById('doneMessage');
const toast = document.getElementById('toast');
const downloadButton = document.getElementById('downloadButton');

const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

let textFiles = [];
let currentFileIndex = 0;
let currentQuestionIndex = 0;

const questions = [
  "Is the text easy to understand?",
  "Does the text contain important information?",
  "Would you recommend reading this text?"
];

const results = {};

function handleFileUpload(event) {
  textFiles = Array.from(event.target.files);
  if (textFiles.length > 0) {
    currentFileIndex = 0;
    loadFile(currentFileIndex);
  }
}

function loadFile(index) {
  const file = textFiles[index];
  const reader = new FileReader();

  reader.onload = function(e) {
    animateTextTransition(e.target.result);
    currentQuestionIndex = 0;
    showQuestion();
    updateDocCounter();
    updateNavButtons();
  };

  reader.readAsText(file);

  if (!results[file.name]) {
    results[file.name] = {};
  }
}

function animateTextTransition(newText) {
  textDisplay.classList.add('slide-out-left');
  setTimeout(() => {
    textDisplay.textContent = newText;
    textDisplay.classList.remove('slide-out-left');
    textDisplay.classList.add('slide-in-right');
    setTimeout(() => {
      textDisplay.classList.remove('slide-in-right');
    }, 300);
  }, 300);
}

function updateDocCounter() {
  const x = currentFileIndex + 1;
  const y = textFiles.length;
  docCounter.textContent = `Document number ${x} of ${y}`;
  docCounter.classList.add('text-blue-600', 'scale-105');
  setTimeout(() => {
    docCounter.classList.remove('text-blue-600', 'scale-105');
  }, 300);
}

function updateNavButtons() {
  prevButton.disabled = currentFileIndex === 0;
  nextButton.disabled = currentFileIndex === textFiles.length - 1;
}

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    questionText.textContent = questions[currentQuestionIndex];
    questionContainer.style.opacity = "1";
    questionContainer.style.pointerEvents = "auto";
    doneMessage.classList.add('hidden');
  } else {
    questionContainer.style.opacity = "0";
    questionContainer.style.pointerEvents = "none";
    doneMessage.classList.remove('hidden');
  }
}

function answerYes() {
  recordAnswer("Yes");
}

function answerNo() {
  recordAnswer("No");
}

function recordAnswer(answer) {
  if (currentQuestionIndex < questions.length) {
    const filename = textFiles[currentFileIndex].name;
    const question = questions[currentQuestionIndex];
    results[filename][question] = answer;
    currentQuestionIndex++;
    showQuestion();
    showToast();
  }
}

function nextFile() {
  if (currentFileIndex < textFiles.length - 1) {
    currentFileIndex++;
    loadFile(currentFileIndex);
  }
}

function previousFile() {
  if (currentFileIndex > 0) {
    currentFileIndex--;
    loadFile(currentFileIndex);
  }
}

function downloadResults() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "results.json");
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();

  // Wiggle download button
  downloadButton.classList.add('wiggle');
  setTimeout(() => {
    downloadButton.classList.remove('wiggle');
  }, 300);
}

function showToast() {
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');
  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 1000);
}