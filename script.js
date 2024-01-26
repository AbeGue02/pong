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

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");