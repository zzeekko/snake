class Game {

    constructor() {
        // colors
        this.boardBorder = '#000'
        this.boardBg = '#cfb87c'
        this.snakeColor = '#639'
        this.snakeBorder = '#000'

        //snake body
        this.snake = [
            {x: 200, y: 200}, // head
            {x: 190, y: 200}, 
            {x: 180, y: 200},
            {x: 170, y: 200},
            {x: 160, y: 200}
        ]

        this.snakeBoard = document.getElementById('snakeBoard')
        this.snakeBoardCtx = this.snakeBoard.getContext('2d')

        this.dx = 10
        this.dy = 0

        this.speed = 100
    }

    init() {
        // console.log('init')
        this.makeCanvas()
        this.drawSnake()

        // make a timer
        /**setTimeout(callback function, time in ms) */
        setTimeout(()=> {
            console.log('counting')
            this.makeCanvas()
            this.drawSnake()

            this.moveSnake()

            // call init(); recursion
            this.init()
        }, 3000)
    }

    // 1 make canvas
    makeCanvas() {
        const snakeBoard = this.snakeBoard
        const snakeBoardCtx = this.snakeBoardCtx

        snakeBoardCtx.fillStyle = this.boardBg
        snakeBoardCtx.strokeStyle = this.boardBorder

        snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height)
        snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height)
    }
    // 2 draw snake
    drawSnake() {
    
        const snake = this.snake
        const snakeBoardCtx = this.snakeBoardCtx
    
        snake.forEach(snakePart => {
            snakeBoardCtx.fillStyle = this.snakeColor
            snakeBoardCtx.strokeStyle = this.snakeBorder
            
            snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10)
            snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10)
        })
    }

    // 3 move snake
    moveSnake() {
        const snake = this.snake
        const head = {
            x: snake[0].x + this.dx,
            y: snake[0].y + this.dy
        }

        snake.unshift(head)

        snake.pop()

    }
    //change direction
    changeDirection(e) {

        const LEFT = 37
        const RIGHT = 39
        const UP = 38
        const DOWN = 40

        if (this.changingDirection) return
        this.changingDirection = true

        const keyPressed = e.keyCode
        
        const goingUp = this.dy === -10
        const goingDown = this.dy === 10
        const goingRight = this.dx === 10
        const goingLeft = this.dx === -10

        if (keyPressed === LEFT && !goingRight) {
            this.dx = -10
            this.dy = 0
        }

        if (keyPressed === UP && !goingDown) {
            this.dx = 0
            this.dy = -10
        }

        if (keyPressed === RIGHT && !goingLeft) {
            this.dx = 10
            this.dy = 0
        }

        if (keyPressed === DOWN && !goingUp) {
            this.dx = 0
            this.dy = 10
        }
    }
}


const snake = new Game()

snake.init()

document.addEventListener('keydown', ()=> {
    snake.changeDirection(event)
})