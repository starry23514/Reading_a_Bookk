x // State management
    let customQuiz = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOptionIndex = null;

    const creatorPanel = document.getElementById('creator-panel');
    const playerPanel = document.getElementById('player-panel');
    const resultsPanel = document.getElementById('results-panel');
    
    const quizForm = document.getElementById('quiz-form');
    const quizStatus = document.getElementById('quiz-status');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    
    const playerQuestionTitle = document.getElementById('player-question-title');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const scoreText = document.getElementById('score-text');
    const resetBtn = document.getElementById('reset-btn');

    // --- PANEL 1: CREATOR LOGIC ---
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const questionText = document.getElementById('question-text').value;
        const optionInputs = document.querySelectorAll('.option-input');
        const correctIndex = parseInt(document.getElementById('correct-answer').value);

        // Gather all option string values
        const options = Array.from(optionInputs).map(input => input.value);

        // Push new structured question object to array
        customQuiz.push({
            question: questionText,
            options: options,
            correct: correctIndex
        });

        // Reset form inputs for next entry
        quizForm.reset();
        
        // Update user status
        quizStatus.textContent = `${customQuiz.length} question(s) added so far.`;
        startQuizBtn.disabled = false;
    });

    startQuizBtn.addEventListener('click', () => {
        creatorPanel.classList.add('hidden');
        playerPanel.classList.remove('hidden');
        loadQuestion();
    });

    // --- PANEL 2: PLAYER LOGIC ---
    function loadQuestion() {
        selectedOptionIndex = null;
        nextBtn.textContent = "Submit Answer";
        
        const currentData = customQuiz[currentQuestionIndex];
        playerQuestionTitle.textContent = `Q${currentQuestionIndex + 1}: ${currentData.question}`;
        
        // Clear old rendering
        optionsContainer.innerHTML = '';

        // Dynamically build option buttons
        currentData.options.forEach((optionText, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = optionText;
            btn.addEventListener('click', () => selectOption(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function selectOption(index, clickedBtn) {
        // Clear choices
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Save current user selection
        selectedOptionIndex = index;
        clickedBtn.classList.add('selected');
    }

    nextBtn.addEventListener('click', () => {
        if (selectedOptionIndex === null) {
            alert("Please pick an option first!");
            return;
        }

        // Grade current selection
        if (selectedOptionIndex === customQuiz[currentQuestionIndex].correct) {
            score++;
        }

        // Advance index or finish quiz
        currentQuestionIndex++;
        if (currentQuestionIndex < customQuiz.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    // --- PANEL 3: RESULTS LOGIC ---
    function showResults() {
        playerPanel.classList.add('hidden');
        resultsPanel.classList.remove('hidden');
        scoreText.textContent = `You scored ${score} out of ${customQuiz.length}!`;
    }

    resetBtn.addEventListener('click', () => {
        // Full state reset back to start configuration
        customQuiz = [];
        currentQuestionIndex = 0;
        score = 0;
        
        quizStatus.textContent = "0 questions added so far.";
        startQuizBtn.disabled = true;
        
        resultsPanel.classList.add('hidden');
        creatorPanel.classList.remove('hidden');
    });