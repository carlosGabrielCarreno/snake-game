const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const boxSize = 10;  // Tamaño de cada segmento de la serpiente

// Array que representa los segmentos de la serpiente
let snake = [
    { x: 150, y: 150 },  // Cabeza de la serpiente
    { x: 140, y: 150 },
    { x: 130, y: 150 }
];

// Variables para la dirección de la serpiente
let dx = boxSize;  // Movimiento horizontal (derecha por defecto)
let dy = 0;        // Movimiento vertical (sin movimiento vertical por defecto)


function moveSnake() {
    // Crear un nuevo segmento para la cabeza
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Comprobar si la serpiente toca los bordes del canvas
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();  // Reiniciar el juego si toca los bordes
        return;
    }
    
    // Añadir la nueva cabeza al inicio del array
    snake.unshift(head);
    
    // Quitar el último segmento para mantener el tamaño de la serpiente
    snake.pop();
}


function resetGame() {
    // Reiniciar la serpiente a su estado inicial
    snake = [
        { x: 150, y: 150 },  
        { x: 140, y: 150 },
        { x: 130, y: 150 }
    ];
    
    // Reiniciar la dirección de movimiento
    dx = boxSize;
    dy = 0;
    
    // Puedes mostrar un mensaje si lo deseas
    alert("¡Perdiste! El juego se reinicia.");
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar todo el canvas
}


document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    
    const goingUp = dy === -boxSize;
    const goingDown = dy === boxSize;
    const goingRight = dx === boxSize;
    const goingLeft = dx === -boxSize;
    
    if (keyPressed === 37 && !goingRight) { // Izquierda (flecha izquierda)
        dx = -boxSize;
        dy = 0;
    }
    if (keyPressed === 38 && !goingDown) { // Arriba (flecha arriba)
        dx = 0;
        dy = -boxSize;
    }
    if (keyPressed === 39 && !goingLeft) { // Derecha (flecha derecha)
        dx = boxSize;
        dy = 0;
    }
    if (keyPressed === 40 && !goingUp) { // Abajo (flecha abajo)
        dx = 0;
        dy = boxSize;
    }
}

let food = { x: 50, y: 50 };  // Posición inicial de la comida

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function checkIfAteFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        // La serpiente come, así que añadimos un nuevo segmento
        growSnake();
        
        // Reposicionar la comida
        food = {
            x: Math.floor(Math.random() * canvas.width / boxSize) * boxSize,
            y: Math.floor(Math.random() * canvas.height / boxSize) * boxSize
        };
    }
}

function growSnake() {
    // Duplicamos el último segmento de la serpiente
    let lastSegment = snake[snake.length - 1];
    snake.push({ x: lastSegment.x, y: lastSegment.y });
}


function gameLoop() {
    clearCanvas();   
    moveSnake();     
    checkIfAteFood();  // Verificar si la serpiente comió
    drawFood();       // Dibujar la comida
    drawSnake();      
    
    setTimeout(gameLoop, 100);
}

// Iniciar el bucle del juego
gameLoop();
