const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake, food, direction, score, game;

function init() {
    snake = [{ x: 200, y: 200 }];
    food = randomFood();
    direction = "RIGHT";
    score = 0;
    document.getElementById("score").textContent = score;

    clearInterval(game);
    game = setInterval(draw, 100);
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 400, 400);

    // Food
    ctx.fillStyle = "red";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Snake
    ctx.shadowColor = "#00ffcc";
    ctx.shadowBlur = 15;
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ffcc" : "#00aa88";
        ctx.fillRect(part.x, part.y, box, box);
    });

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    if (headX === food.x && headY === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        food = randomFood();
    } else {
        snake.pop();
    }

    const newHead = { x: headX, y: headY };

    if (
        headX < 0 || headX >= 400 ||
        headY < 0 || headY >= 400 ||
        snake.some(part => part.x === headX && part.y === headY)
    ) {
        clearInterval(game);
        alert("💀 Game Over! Score: " + score);
        return;
    }

    snake.unshift(newHead);
}

document.getElementById("restartBtn").addEventListener("click", init);

init();