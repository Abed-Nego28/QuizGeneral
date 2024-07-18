document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('time');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');
    const startButton = document.getElementById('start-button');
    const difficultySelect = document.getElementById('difficulty');
    const attemptsDisplay = document.getElementById('attempts-left');
    const quizContainer = document.querySelector('.quiz');
    const musicToggleButton = document.getElementById('toggle-music');
    const musicIcon = document.getElementById('music-icon'); // Icône de musique
    const backgroundMusic = document.getElementById('background-music');
    const backButton = document.getElementById('back-button'); 

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let remainingTime = 60;
    let timer;
    let gameEnded = false;
    let attemptsLeft = 3;
    let difficultyLevel = '';

    const localQuestions = {
        easy: [
            {
                question: "Quel est le plus grand océan du monde ?",
                options: ["Atlantique", "Indien", "Arctique", "Pacifique"],
                answer: "Pacifique"
            },
            {
                question: "Qui a écrit 'Harry Potter' ?",
                options: ["J.K. Rowling", "Stephen King", "George R.R. Martin", "J.R.R. Tolkien"],
                answer: "J.K. Rowling"
            },
            {
                question: "Quelle est la couleur du ciel par une journée ensoleillée ?",
                options: ["Rouge", "Bleu", "Vert", "Jaune"],
                answer: "Bleu"
            },
            {
                question: "Quel est le plus grand continent du monde ?",
                options: ["Afrique", "Amérique", "Asie", "Europe"],
                answer: "Asie"
            },
            {
                question: "Combien de jours y a-t-il dans une semaine ?",
                options: ["5", "6", "7", "8"],
                answer: "7"
            },
            {
                question : "Quel est le plus grand fleuve d'Europe ?",
                options: ["Danube", "Rhin", "Volga", "Seine"],
                answer: "Volga"
            },
            {
                question : "Qui a peint la Mona Lisa ?",
                options: ["Michel-Ange", "Raphaël", "Léonard de Vinci", "Botticelli"],
                answer: "Léonard de Vinci"
            },
            {
                question : "Quel est le symbole chimique du sodium ?",
                options: ["Na", "Sn", "Fe", "Au"],
                answer: "Na"
            },
            {
                question: "Quel est l'organe principal du système respiratoire humain ?",
                options: ["Cœur", "Foie", "Poumon", "Rein"],
                answer: "Poumon"
            },
            {
                question: "Quelle est la capitale de l'Espagne ?",
                options: ["Madrid", "Barcelone", "Séville", "Valence"],
                answer: "Madrid"
            },
            {
                question: "Quel est l'animal emblématique de l'Australie ?",
                options: ["Kangourou", "Koala", "Dingo", "Emu"],
                answer: "Kangourou"
            },
        ],
        medium: [
            {
                question: "Quelle est la capitale de l'Australie ?",
                options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
                answer: "Canberra"
            },
            {
                question: "Quel est le symbole chimique de l'or ?",
                options: ["Au", "Ag", "O", "G"],
                answer: "Au"
            },
            {
                question: "Quel est le plus grand désert du monde ?",
                options: ["Sahara", "Gobi", "Kalahari", "Arctique"],
                answer: "Sahara"
            },
            {
                question: "Qui a peint la Joconde ?",
                options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
                answer: "Leonardo da Vinci"
            },
            {
                question: "Quelle est la plus grande planète du système solaire ?",
                options: ["Terre", "Mars", "Jupiter", "Saturne"],
                answer: "Jupiter"
            },
            {
                question: "Quelle est la plus haute montagne du monde ?",
                options: ["Mont Everest", "Mont Kilimandjaro", "Mont Fuji", "Mont McKinley"],
                answer: "Mont Everest"
            },
            {
                question: "Qui a écrit 'Don Quichotte' ?",
                options: ["Miguel de Cervantes", "Federico García Lorca", "Gabriel García Márquez", "Jorge Luis Borges"],
                answer: "Miguel de Cervantes"
            },
            {
                question: "Quel est le plus grand lac salé au monde ?",
                options: ["Mer Morte", "Grand Lac Salé", "Lac Assal", "Lac Tchad"],
                answer: "Grand Lac Salé"
            },
            {
                question: "Quel est le plus grand producteur de café au monde ?",
                options: ["Brésil", "Colombie", "Vietnam", "Éthiopie"],
                answer: "Brésil"
            },
            {
                question: "Quelle est la monnaie officielle du Japon ?",
                options: ["Yen", "Dollar", "Euro", "Won"],
                answer: "Yen"
            },
            {
                question: "Quelle est la capitale du Japon ?",
                options: ["Pékin", "Séoul", "Tokyo", "Manille"],
                answer: "Tokyo"
            },
            {
                question: "Quel est le plus grand désert chaud du monde ?",
                options: ["Sahara", "Gobi", "Kalahari", "Atacama"],
                answer: "Sahara"
            },
            {
                question: "Qui a écrit 'Les Misérables' ?",
                options: ["Gustave Flaubert", "Émile Zola", "Victor Hugo", "Charles Baudelaire"],
                answer: "Victor Hugo"
            },
            {
                question: "Quel est le plus grand lac d'eau douce au monde ?",
                options: ["Lac Supérieur", "Lac Baïkal", "Lac Victoria", "Lac Michigan"],
                answer: "Lac Supérieur"
            }
        ],
        hard: [
            {
                question: "Qui a développé la théorie de la relativité ?",
                options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
                answer: "Albert Einstein"
            },
            {
                question: "En quelle année a eu lieu la Révolution française ?",
                options: ["1789", "1799", "1769", "1779"],
                answer: "1789"
            },
            {
                question: "Quel est le plus long fleuve du monde ?",
                options: ["Nil", "Amazon", "Yangtze", "Mississippi"],
                answer: "Amazon"
            },
            {
                question: "Qui a écrit 'À la recherche du temps perdu' ?",
                options: ["Marcel Proust", "Victor Hugo", "Émile Zola", "Albert Camus"],
                answer: "Marcel Proust"
            },
            {
                question: "Quel est l'élément chimique le plus abondant dans l'univers ?",
                options: ["Oxygène", "Carbone", "Hydrogène", "Azote"],
                answer: "Hydrogène"
            },
            {
                question: "Qui a inventé le téléphone ?",
                options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"],
                answer: "Alexander Graham Bell"
            },
            {
                question: "Quel est le plus grand producteur de diamants au monde ?",
                options: ["Afrique du Sud", "Russie", "Australie", "Canada"],
                answer: "Russie"
            },
            {
                question: "Quelle est la plus grande barrière de corail du monde ?",
                options: ["Belize Barrier Reef", "Great Barrier Reef", "New Caledonia Barrier Reef", "Palawan Barrier Reef"],
                answer: "Great Barrier Reef"
            },
            {
                question: "Quel est le pays le plus peuplé au monde ?",
                options: ["Inde", "Chine", "États-Unis", "Russie"],
                answer: "Chine"
            },
            {
                question: "Qui a inventé l'ampoule électrique ?",
                options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Benjamin Franklin"],
                answer: "Thomas Edison"
            }
        ]
    };


    // Toggle music
    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicIcon.textContent = '🔇';
        } else {
            backgroundMusic.pause();
            musicIcon.textContent = '🎵';
        }
    });

    // Initialise le jeu
    function initGame() {
        difficultyLevel = difficultySelect.value;
        questions = localQuestions[difficultyLevel];
        currentQuestionIndex = 0;
        score = 0;
        attemptsLeft = 3;
        gameEnded = false;

        scoreDisplay.textContent = score;
        attemptsDisplay.textContent = attemptsLeft;

        document.querySelector('.difficulty-selection').classList.add('hidden');
        quizContainer.classList.remove('hidden');
        message.classList.add('hidden');
        restartButton.classList.add('hidden');
        backButton.classList.remove('hidden');

        startTimer();
        displayQuestion();
    }

    // Affiche une question
    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('styled-button');
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });
    }

    // Vérifie la réponse
    function checkAnswer(selectedOption) {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedOption === currentQuestion.answer) {
            score++;
            scoreDisplay.textContent = score;
            message.textContent = "Bonne réponse !";
            message.classList.remove('hidden');
            message.classList.add('correct');
            message.classList.remove('incorrect');
        } else {
            message.textContent = `Mauvaise réponse. La bonne réponse était: ${currentQuestion.answer}`;
            message.classList.remove('hidden');
            message.classList.remove('correct');
            message.classList.add('incorrect');
            attemptsLeft--;
            attemptsDisplay.textContent = attemptsLeft;
        }

        setTimeout(() => {
            message.classList.add('hidden');
            nextQuestion();
        }, 2000);
    }

    // Passe à la question suivante
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length || attemptsLeft <= 0) {
            endGame();
        } else {
            displayQuestion();
        }
    }

    // Termine le jeu
    function endGame() {
        clearInterval(timer);
        message.textContent = `Quiz terminé! Votre score est de ${score} sur ${questions.length}.`;
        message.classList.remove('hidden');
        restartButton.classList.remove('hidden');
        gameEnded = true;
    }

    // Redémarre le jeu
    restartButton.addEventListener('click', () => {
        clearInterval(timer);
        score = 0;
        attemptsLeft = 3;
        scoreDisplay.textContent = score;
        attemptsDisplay.textContent = attemptsLeft;
        initGame();
    });

    // Retour à la sélection de difficulté
    backButton.addEventListener('click', () => {
        clearInterval(timer);
        quizContainer.classList.add('hidden');
        document.querySelector('.difficulty-selection').classList.remove('hidden');
        backButton.classList.add('hidden'); // Masque le bouton de retour
    });

    // Initialise le jeu lorsque le bouton "Démarrer" est cliqué
    startButton.addEventListener('click', initGame);

    // Fonction de gestion du minuteur
    function startTimer() {
        remainingTime = 60;
        timerDisplay.textContent = remainingTime;

        timer = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                timerDisplay.textContent = remainingTime;
            } else {
                clearInterval(timer);
                message.textContent = 'Temps écoulé!';
                message.classList.remove('hidden');
                endGame();
            }
        }, 1000);
    }

    // Charge le jeu par défaut au chargement de la page
    backgroundMusic.volume = 0.3; // Réglez le volume de la musique de fond ici
});


