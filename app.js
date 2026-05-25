// Global Paragraph Bank
const paragraphCollection = [
  "Scalable web applications require clean structural design choices and efficient database query architectures. Writing modular JavaScript components optimizes runtime operational pipelines dramatically.",
  "User experience interfaces rely heavily on fluid layouts and accessible design matrices. Engineering modern digital solutions means keeping layout file payloads small and interactions instantaneous.",
  "Every developer journey starts with basic syntax logic before stepping into heavy systems engineering. Consistency and structural debugging build excellent full-stack competencies over time.",
  "Artificial intelligence integration is rewriting standard interface development workflows across global teams. Adapting early to assistive logic components builds better computational engineering environments.",
];

// State Engines Variables
let timeLimit = 60;
let timeRemaining = timeLimit;
let timerInterval = null;
let testRunning = false;
let pointerIndex = 0;
let totalMistakes = 0;
let characterMetricsList = [];

// DOM Element Registry
const textDisplayBox = document.getElementById("text-display-box");
const inputField = document.getElementById("hidden-keyboard-input");
const timerView = document.getElementById("timer");
const wpmView = document.getElementById("wpm");
const accuracyView = document.getElementById("accuracy");
const resetBtn = document.getElementById("reset-action-btn");

// Initialize the Game Matrix
function setupTypingSession() {
  clearInterval(timerInterval);
  timeRemaining = timeLimit;
  pointerIndex = 0;
  totalMistakes = 0;
  testRunning = false;

  timerView.textContent = `${timeRemaining}s`;
  wpmView.textContent = "0";
  accuracyView.textContent = "100%";
  inputField.value = "";

  // Choose a random sentence structure from our string list array
  const selection =
    paragraphCollection[Math.floor(Math.random() * paragraphCollection.length)];

  // Convert text into standalone individual HTML letter elements
  textDisplayBox.innerHTML = "";
  characterMetricsList = selection.split("").map((letter) => {
    const span = document.createElement("span");
    span.className = "char-unit";
    span.textContent = letter;
    textDisplayBox.appendChild(span);
    return span;
  });

  // Mark initial index character block active
  if (characterMetricsList.length > 0) {
    characterMetricsList[0].classList.add("active");
  }

  // Force input Focus layout activation
  document.addEventListener("click", forceInputFocus);
  forceInputFocus();
}

function forceInputFocus() {
  inputField.focus();
}

// Global Core Input Analysis Operations
inputField.addEventListener("input", (event) => {
  const inputDataStr = inputField.value;
  const currentTypedLength = inputDataStr.length;

  // Initialize timer runtime on first input keydown stroke event
  if (!testRunning && currentTypedLength > 0) {
    testRunning = true;
    timerInterval = setInterval(executeClockCountdown, 1000);
  }

  // Clean structural evaluation for backspace triggers or additions
  if (currentTypedLength < pointerIndex) {
    // User hit backspace key safely
    characterMetricsList[pointerIndex].classList.remove(
      "active",
      "correct",
      "incorrect",
    );
    pointerIndex = currentTypedLength;
    characterMetricsList[pointerIndex].classList.remove("correct", "incorrect");
    characterMetricsList[pointerIndex].classList.add("active");
  } else {
    // User typed regular forward character keys array index
    if (pointerIndex < characterMetricsList.length) {
      const expectedChar = characterMetricsList[pointerIndex].textContent;
      const enteredChar = inputDataStr[pointerIndex];

      characterMetricsList[pointerIndex].classList.remove("active");

      if (enteredChar === expectedChar) {
        characterMetricsList[pointerIndex].classList.add("correct");
      } else {
        characterMetricsList[pointerIndex].classList.add("incorrect");
        totalMistakes++;
      }

      pointerIndex++;

      if (pointerIndex < characterMetricsList.length) {
        characterMetricsList[pointerIndex].classList.add("active");
      } else {
        // If the entire paragraph gets typed out flawlessly before the clock ticks down
        concludeTypingSession();
      }
    }
  }

  calculateRealtimeScores(currentTypedLength);
});

// Statistical Analytics Calculations
function calculateRealtimeScores(typedLength) {
  if (typedLength === 0) return;

  // Standard Typing Speed Rule Metric Calculation Formula
  const timeSpentMinutes = (timeLimit - timeRemaining) / 60 || 1 / 60;
  const wordsCalculated = typedLength / 5;
  const immediateWPM = Math.round(wordsCalculated / timeSpentMinutes);
  wpmView.textContent = immediateWPM >= 0 ? immediateWPM : 0;

  // Operational Accuracy Ratio Checks
  const accurateHits = typedLength - totalMistakes;
  const finalAccuracyPercentage = Math.round(
    (accurateHits / typedLength) * 100,
  );
  accuracyView.textContent = `${finalAccuracyPercentage >= 0 ? finalAccuracyPercentage : 0}%`;
}

// Clock Execution Controls
function executeClockCountdown() {
  if (timeRemaining > 0) {
    timeRemaining--;
    timerView.textContent = `${timeRemaining}s`;

    // Dynamic calculations even when user text index pauses typing
    calculateRealtimeScores(inputField.value.length);
  } else {
    concludeTypingSession();
  }
}

// System Shutdown Terminations
function concludeTypingSession() {
  clearInterval(timerInterval);
  testRunning = false;
  inputField.blur();
  document.removeEventListener("click", forceInputFocus);

  // Explicitly clean remaining baseline active typography lines
  if (pointerIndex < characterMetricsList.length) {
    characterMetricsList[pointerIndex].classList.remove("active");
  }

  alert(
    `🎉 Test Completed!\nSpeed: ${wpmView.textContent} WPM\nAccuracy: ${accuracyView.textContent}`,
  );
}

// Action Trigger Bindings
resetBtn.addEventListener("click", setupTypingSession);

// Bootstrap Execution Configuration Initialization
window.addEventListener("DOMContentLoaded", setupTypingSession);
