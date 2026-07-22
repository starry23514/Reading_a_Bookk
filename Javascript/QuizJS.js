// State variables
let quizDatabase = [];
let currentQuestionIndex = 0;
let score = 0;

// Toggle between Creator View and Player View
function switchMode(mode) {
    const creatorView = document.getElementById('creator-view');
    const playerView = document.getElementById('player-view');
    const navCreator = document.getElementById('nav-creator');
    const navPlayer = document.getElementById('nav-player');

    if (mode === 'creator') {
        creatorView.classList.remove('hidden');
        playerView.classList.add('hidden');
        navCreator.classList.remove('secondary');
        navPlayer.classList.add('secondary');
    } else {
        creatorView.classList.add('hidden');
        playerView.classList.remove('hidden');
        navCreator.classList.add('secondary');
        navPlayer.classList.remove('secondary');
        startQuiz();
    }
}
// Process and store created questions
function saveQuestion(event) {
    event.preventDefault();
    
    const text = document.getElementById('q-text').value;
    const optionInputs = document.querySelectorAll('.q-opt');
    const options = Array.from(optionInputs).map(input => input.value);
    const correctIndex = parseInt(document.getElementById('q-correct').value);

    // Push new object structured for dynamic rendering
    quizDatabase.push({ text, options, correctIndex });

    // Reset the form input fields
    document.getElementById('creator-form').reset();
    updateCreatorUI();
}

// Update list of items created in the creator mode
function updateCreatorUI() {
    document.getElementById('q-count').innerText = quizDatabase.length;
    const container = document.getElementById('saved-questions-container');
    container.innerHTML = '';

    quizDatabase.forEach((q, index) => {
        const li = document.createElement('li');
        li.className = "question-item";

        // Question text
        const text = document.createElement('span');
        text.innerText = `${index + 1}. ${q.text}`;

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.innerText = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => removeQuestion(index);

        li.appendChild(text);
        li.appendChild(removeBtn);
        container.appendChild(li);
    });
}
// remove question 
function removeQuestion(index) {
    const confirmDelete = confirm("Are you sure you want to remove this question?");

    if (confirmDelete) {
        quizDatabase.splice(index, 1);
        updateCreatorUI();
    }
}

// Initialization logic for Player Mode
function startQuiz() {
    const activeArea = document.getElementById('quiz-active');
    const emptyArea = document.getElementById('quiz-empty');

    if (quizDatabase.length === 0) {
        activeArea.classList.add('hidden');
        emptyArea.classList.remove('hidden');
        return;
    }

    activeArea.classList.remove('hidden');
    emptyArea.classList.add('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('current-score').innerText = score;
    renderPlayerQuestion();
}

// Render active question step
function renderPlayerQuestion() {
    if (currentQuestionIndex >= quizDatabase.length) {
        alert(`Quiz completed! Final Score: ${score}/${quizDatabase.length}`);
        switchMode('creator');
        return;
    }
    const currentQuestion = quizDatabase[currentQuestionIndex];
    document.getElementById('player-question-text').innerText = currentQuestion.text;
    
    const optionsContainer = document.getElementById('player-options-container');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((optionText, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerText = optionText;
        btn.onclick = () => handleAnswerSelection(index);
        optionsContainer.appendChild(btn);
    });
}

// Verify answers dynamically
function handleAnswerSelection(selectedIndex) {
    const currentQuestion = quizDatabase[currentQuestionIndex];
    
    if (selectedIndex === currentQuestion.correctIndex) {
        score++;
        document.getElementById('current-score').innerText = score;
        alert("Correct!");
    } else {
        alert(`Wrong! Correct answer was: ${currentQuestion.options[currentQuestion.correctIndex]}`);
    }

    currentQuestionIndex++;
    renderPlayerQuestion();
}