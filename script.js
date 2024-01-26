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

const DEFAULT_PLAYER_WIDTH = 25
const DEFAULT_PLAYER_HEIGHT = 100
const DEFAULT_PLAYER_OFFSET = 50
const DEFAULT_BALL_SIZE = 20

class Ball {
    constructor(newX, newY, newColor, newSpeed){
        this.positionX = newX
        this.positionY = newY
        this.size = DEFAULT_BALL_SIZE
        this.color = newColor
        this.speed = newSpeed
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


//

const newBall = new Ball(canvas.width / 2, (canvas.height / 2) - 10, 'white', 0)
const player1 = new Player(DEFAULT_PLAYER_OFFSET, (canvas.height / 2) - DEFAULT_PLAYER_OFFSET, DEFAULT_PLAYER_HEIGHT)
const player2 = new Player(canvas.width - DEFAULT_PLAYER_OFFSET - DEFAULT_PLAYER_WIDTH, (canvas.height / 2) - DEFAULT_PLAYER_OFFSET, DEFAULT_PLAYER_HEIGHT)


player1.draw()
player2.draw()
newBall.draw()