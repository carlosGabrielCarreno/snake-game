const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Dibuja un cuadrado de 50x50 en las coordenadas (100, 100)
ctx.fillStyle = "green";  // Establece el color
ctx.fillRect(100,100,50,30);  // Dibuja un rectángulo (x, y, ancho, alto)