// Preguntas y respuestas
const quiz = [
    {
        question: "En un entorno multitenant, tienes una aplicación crítica que requiere un aislamiento completo de datos y recursos. ¿Cuál de las siguientes afirmaciones describe mejor cómo Oracle puede proporcionar esta funcionalidad?",
        options: [
            "A) Utilizar múltiples bases de datos independientes en diferentes servidores.",
            "B) Crear una base de datos contenedora (CDB) y múltiples pluggable databases (PDB), donde cada PDB está aislada.",
            "C) Ejecutar la aplicación en un único esquema dentro de la CDB.",
            "D) Configurar diferentes usuarios dentro de una sola PDB para manejar datos."
        ],
        answer: 1,
        image: "./assets/among-us.gif"
    },
    {
        question: "Un administrador necesita crear una nueva PDB basada en una plantilla existente. ¿Qué componente de la arquitectura multitenant debe usar como base para este proceso?",
        options: [
            "A) CDB$ROOT",
            "B) PDB$SEED",
            "C) Una PDB existente",
            "D) Los metadatos del diccionario de datos compartidos"
        ],
        answer: 1,
        image: "./assets/Among-US-Gif-13.gif"
    },
    {
        question: "Un cliente solicita la migración de su base de datos a otro servidor con una instancia de Oracle. ¿Cuál es una ventaja clave de las PDBs en este proceso?",
        options: [
            "A) Las PDBs pueden desconectarse de un CDB y conectarse a otro fácilmente.",
            "B) Las PDBs se replican automáticamente en el nuevo servidor.",
            "C) La migración de PDBs no requiere acceso a los datos.",
            "D) Las PDBs no necesitan reiniciarse tras la migración."
        ],
        answer: 0,
        image: "./assets/Among-US-Gif-14.gif"
    },
    {
        question: "Tienes una CDB con múltiples PDBs. ¿Qué sucede si un usuario realiza un cambio en el componente Root Container (CDB$ROOT)?",
        options: [
            "A) El cambio afecta únicamente al usuario conectado.",
            "B) El cambio afecta únicamente al PDB que está activo.",
            "C) El cambio puede afectar a todas las PDBs dentro de la CDB.",
            "D) El cambio no tiene impacto en las PDBs."
        ],
        answer: 2,
        image: "./assets/Among-US-Gif-15.gif"
    },
    {
        question: "Un desarrollador necesita acceder a una PDB específica dentro de una CDB. ¿Qué debe incluir en su configuración de conexión?",
        options: [
            "A) El nombre del Root Container (CDB$ROOT).",
            "B) La plantilla utilizada para crear la PDB.",
            "C) El nombre del PDB al que desea conectarse.",
            "D) Los metadatos compartidos del diccionario de datos."
        ],
        answer: 2,
        image: "./assets/Among-US-Gif-16.gif"
    }
];


let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");

const popupCorrect = document.getElementById("popup-correct");
const popupWrong = document.getElementById("popup-wrong");

// Sonidos (Ajusta la ruta según la ubicación real de los archivos)
const correctSound = new Audio("./assets/correct.mp3"); // Ruta al archivo de aciertos
const wrongSound = new Audio("./assets/wrong.mp3");    // Ruta al archivo de errores

function loadQuestion() {
    if (currentQuestion < quiz.length) {
        const q = quiz[currentQuestion];
        document.getElementById("question-img").src = q.image; // Imagen de la pregunta
        questionElement.innerHTML = q.question; // Texto de la pregunta
        optionsElement.innerHTML = "";
        q.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => checkAnswer(index);
            optionsElement.appendChild(button);
        });
    } else {
        showResult();
    }
}

function checkAnswer(selected) {
    if (selected === quiz[currentQuestion].answer) {
        score++;
        correctSound.play(); // Reproduce sonido de acierto
        popupCorrect.classList.remove("hidden");
    } else {
        wrongSound.play(); // Reproduce sonido de error
        popupWrong.classList.remove("hidden");
    }
}

function closePopup() {
    popupCorrect.classList.add("hidden");
    popupWrong.classList.add("hidden");
    currentQuestion++;
    loadQuestion();
}

function showResult() {
    // Ocultar todo el contenedor de la tarjeta
    const questionCard = document.querySelector(".question-card");
    questionCard.style.display = "none"; // Esto elimina el remanente de la tarjeta

    // Resultado general
    let resultMessage = `¡Juego terminado! Obtuviste ${score} de ${quiz.length} puntos.`;

    // Felicitaciones si hay 4 o más respuestas correctas
    if (score >= 4) {
        resultMessage += `      
        <div class="congratulations">
          ¡Felicidades! Has demostrado ser el Admin de bases de datos 🚀
          <img src="./assets/victory.gif" alt="Victoria" class="victory-gif">
        </div>
      `;
    }
    // Mensaje de Game Over
    else if (score <= 3) {
        resultMessage += `
      <div class="game-over">
        <p>¡Game Over! Necesitas estudiar más sobre bases de datos 🛠️</p>
        <img src="./assets/ejected.gif" alt="Game Over" class="game-over-gif">
      </div>
    `;
    }

    // Mostrar el mensaje de resultado
    resultElement.innerHTML = resultMessage;
}



// Cargar la primera pregunta
loadQuestion();
