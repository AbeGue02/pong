/*
    PSEUDOCODE:
        VARIABLES NECESSARY:
            - isTwoPlayers
            - isLightMode
            - isGameRunning
            - WinCondition: BY DEFAULT 5 (X > 1 && X < 100)

        CLASSES:
            - Class for players: {
                constructor {
                    positionX
                    positionY
                    score: 0
                    scoreText
                    isComputer: false
                }
                scorePoint(int) {
                    does all the necessary things to score points
                        - Update score
                        - Update score Text
                    Takes in value to decide how many points are scored
                }
                move(int) {
                    Takes an amount to move by and updates the position
                }
            }
            - Ball class: {
                constructor {
                    positionX: 
                    positionY: 
                    speed: 
                    pointsWorth:
                }

            }

        FUNCTIONS NECESSARY: 
            - pauseGame(bool): Pauses or resumes game
            - resetGame(): Invokes pause game and resets everything to 0
            - 


*/

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
let animationFrame;

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
        this.velocityX = 5
        this.velocityY = 5
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.size, this. size)
    }
};

class Player {
    constructor(newX, newY, newSize){
        this.positionX = newX
        this.positionY = newY
        this.size = newSize
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.positionX, this.positionY, DEFAULT_PLAYER_WIDTH, this.size)
    }
};

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

    newBall.positionX += newBall.velocityX;
    newBall.positionY += newBall.velocityY;
    
    //This blob of code is used for ball movement
    if (
        newBall.positionY + newBall.velocityY > canvas.height - newBall.size ||
        newBall.positionY + newBall.velocityY < 0
    ) {
        newBall.velocityY = -newBall.velocityY;
    }
    if (
        newBall.positionX + newBall.velocityX > canvas.width - newBall.size ||
        newBall.positionX + newBall.velocityX < 0 ||
        newBall.positionX + newBall.velocityX <= player1.positionX + DEFAULT_PLAYER_WIDTH && newBall.positionY + newBall.velocityY <= player1.positionY + player1.size && newBall.positionY + newBall.velocityY >= player1.positionY ||
        newBall.positionX + newBall.velocityX >= player2.positionX && newBall.positionY + newBall.velocityY <= player2.positionY + player2.size && newBall.positionY + newBall.velocityY >= player2.positionY
    ) {
        newBall.velocityX = -newBall.velocityX;
    }
  
    animationFrame = window.requestAnimationFrame(animate);
}

// CODE WILL DO DOWN HERE

const newBall = new Ball(canvas.width / 2, (canvas.height / 2) - (DEFAULT_BALL_SIZE / 2), 'white', 0)
const player1 = new Player(DEFAULT_PLAYER_OFFSET, (canvas.height / 2) - DEFAULT_PLAYER_OFFSET, DEFAULT_PLAYER_HEIGHT)
const player2 = new Player(canvas.width - DEFAULT_PLAYER_OFFSET - DEFAULT_PLAYER_WIDTH, (canvas.height / 2) - DEFAULT_PLAYER_OFFSET, DEFAULT_PLAYER_HEIGHT)


player1.draw()
player2.draw()
newBall.draw()

// Event Listeners

//The game only runs when the mouse is inside of the canvas
canvas.addEventListener("mouseover", (e) => {
    animationFrame = window.requestAnimationFrame(animate);
});
  
canvas.addEventListener("mouseout", (e) => {
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
            keysDown.up = true
            break;
        case "ArrowDown":
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
            keysDown.up = false
            break;
        case "ArrowDown":
            keysDown.down = false
            break;
    }
}, true)