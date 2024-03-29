const winConditionText = document.querySelector('#winCondition')
const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
let isGameRunning = false
let isGameOver = false
let winCondition = 5
let animationFrame;
let isOnePlayer = false
let countDownTimer = 3

const DEFAULT_PLAYER_WIDTH = 25
const DEFAULT_PLAYER_HEIGHT = 100
const DEFAULT_PLAYER_OFFSET = 50
const DEFAULT_BALL_SIZE = 20

const keysDown = {
    w: false,
    s: false,
    up: false,
    down: false
}


class Ball {
    constructor(newX, newY, newColor, newSpeed){
        this.positionX = newX
        this.positionY = newY
        this.size = DEFAULT_BALL_SIZE
        this.color = newColor
        this.speed = newSpeed
        this.velocityX = this.speed
        this.velocityY = this.speed
    } 
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.size, this. size)
    }
    resetPosition() {
        this.positionX = canvas.width / 2
        this.positionY = canvas.height / 2
        this.velocityX = 0
        this.velocityY = 0
        this.speed = 5

        setTimeout(() => {
            if (!isGameOver) {
                this.shoot()
            }
        }, 2000)
    }
    shoot() {
        setTimeout(() => {
            this.velocityX = Math.floor(Math.random() * 2) === 0 ? Math.floor(Math.random() * (this.speed - 2)) + 1 : -(Math.floor(Math.random() * (this.speed - 2)) + 1)
            this.velocityY = Math.floor(Math.random() * 2) === 0 ? this.speed - this.velocityX : -(this.speed - this.velocityX)    
        }, 2000)
    }
};

class Player {
    constructor(newX, newY, newSize, newScoreText){
        this.positionX = newX
        this.positionY = newY
        this.size = newSize
        this.score = 0
        this.scoreText = newScoreText
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.positionX, this.positionY, DEFAULT_PLAYER_WIDTH, this.size)
    }
    changeScore() {
        this.score++
        this.scoreText.innerHTML = this.score
        checkWin()
    }
};

const newBall = new Ball(canvas.width / 2, (canvas.height / 2) - (DEFAULT_BALL_SIZE / 2), 'white', 5)
const player1 = new Player(DEFAULT_PLAYER_OFFSET, (canvas.height / 2) - DEFAULT_PLAYER_OFFSET, DEFAULT_PLAYER_HEIGHT, document.getElementById('player1Score'))
const player2 = new Player(canvas.width - DEFAULT_PLAYER_OFFSET - DEFAULT_PLAYER_WIDTH, (canvas.height / 2) - DEFAULT_PLAYER_OFFSET, DEFAULT_PLAYER_HEIGHT, document.getElementById('player2Score'))

// FUNCTIONS

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newBall.draw()
    player1.draw()
    player2.draw()

    //This blob of code is used for player movement
    if (keysDown.w && player1.positionY > 0) {
        player1.positionY -= 5
    }
    if (keysDown.s && player1.positionY <= canvas.height - player1.size) {
        player1.positionY += 5
    }
    if (keysDown.up && player2.positionY > 0) {
        player2.positionY -= 5
    }
    if (keysDown.down && player2.positionY <= canvas.height - player2.size) {
        player2.positionY += 5
    }

    if (isOnePlayer) {
        player2.positionY = newBall.positionY + newBall.velocityY > player2.positionY ? player2.positionY += 5 : player2.positionY -= 5
        if (player2.positionY < 0) {
            player2.positionY = 0
        } else if (player2.positionY + player2.size > canvas.height) {
            player2.positionY = canvas.height - player2.size
        }
    }

    newBall.positionX += newBall.velocityX;
    newBall.positionY += newBall.velocityY;
    
    //This blob of code is used for ball movement

    //If ball bounces off top/bottom wall
    if (
        newBall.positionY + newBall.velocityY > canvas.height - newBall.size ||
        newBall.positionY + newBall.velocityY < 0
    ) {
        newBall.velocityY = -newBall.velocityY;
    }
    //If ball bounces player1 or player2
    if (newBall.positionX + newBall.velocityX < player1.positionX + DEFAULT_PLAYER_WIDTH && newBall.positionX + newBall.velocityX > DEFAULT_PLAYER_OFFSET && newBall.positionY + newBall.velocityY < player1.positionY + player1.size && newBall.positionY + newBall.velocityY > player1.positionY) {
        newBall.speed += 0.2
        newBall.velocityX = newBall.speed
    }
    if (newBall.positionX + newBall.velocityX + newBall.size > player2.positionX && newBall.positionX + newBall.velocityX + newBall.size < canvas.width - DEFAULT_PLAYER_OFFSET && newBall.positionY + newBall.velocityY < player2.positionY + player2.size && newBall.positionY + newBall.velocityY > player2.positionY) {
        newBall.speed += 0.2
        newBall.velocityX = -newBall.speed
    }
    //If ball bounces left or right wall
    if (
        newBall.positionX + newBall.velocityX > canvas.width - newBall.size ||
        newBall.positionX + newBall.velocityX < 0
    ) {
        newBall.positionX + newBall.velocityX > canvas.width - newBall.size ? player1.changeScore() : player2.changeScore()

        newBall.resetPosition()
    }
    if (isGameRunning)
        animationFrame = window.requestAnimationFrame(animate);
}

//Function checks if either player has won after there has been a point scored
//If player won, display necessary things
const checkWin = () => {
    if (player1.score >= winCondition || player2.score >= winCondition) {
        //Player1 wins
        player1.score >= winCondition ? alert("Player 1 has won!") : alert("Player 2 has won!")
        isGameRunning = false
        isGameOver = true
        resetGame()
    }
}

const resetGame = () => {
    location.reload()
}

// CODE WILL DO DOWN HERE

player1.draw()
player2.draw()
newBall.draw()

// Event Listeners

//The game only runs when the mouse is inside of the canvas
document.querySelector('#numOfPlayers').addEventListener('click', (e) => {
    if (!isGameRunning) {
        isOnePlayer = !isOnePlayer
        document.querySelector('#numOfPlayers').innerHTML = isOnePlayer ? "1 Player" :  "2 Players"
    }
})

canvas.addEventListener("mouseover", async (e) => {
    animationFrame = window.requestAnimationFrame(animate);
    isGameRunning = true
    winConditionText.disabled = true
});
  
canvas.addEventListener("mouseout", (e) => {
    isGameRunning = false
    window.cancelAnimationFrame(animationFrame);
});

window.addEventListener("keydown", (key) => {
    switch (key.code) {
        case "KeyW":
            keysDown.w = true
            break;
        case "KeyS":
            keysDown.s = true
            break;
        case "ArrowUp":
            if (!isOnePlayer)
                keysDown.up = true
            break;
        case "ArrowDown":
            if (!isOnePlayer)
                keysDown.down = true
            break;
    }
}, true)

window.addEventListener("keyup", (key) => {
    switch (key.code) {
        case "KeyW":
            keysDown.w = false
            break;
        case "KeyS":
            keysDown.s = false
            break;
        case "ArrowUp":
            if (!isOnePlayer)
                keysDown.up = false
            break;
        case "ArrowDown":
            if (!isOnePlayer)
                keysDown.down = false
            break;
    }
}, true)

winConditionText.addEventListener('change', (e) => {
    winCondition = winConditionText.value
})