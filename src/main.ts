import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
      <canvas id="canvas1"></canvas>
  </div>
`

const canvas = document.getElementById('canvas1') as HTMLCanvasElement
const ctx = canvas.getContext('2d')

const CANVAS_HEIGHT = 700
const CANVAS_WIDTH = 500
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const numberOfEnemies = 10
const enemies: Enemy[] = []

let gameFrame = 0

class Enemy {
    x: number
    newX: number
    y: number
    newY: number
    width: number
    spriteHeight: number
    spriteWidth: number
    height: number
    speed: number
    flapSpeed: number
    frame: number
    interval: number
    image: HTMLImageElement

    constructor() {
        this.image = new Image()
        this.image.src = 'assets/enemy4.png'
        this.speed = Math.random() * 4 + 1
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
        this.spriteWidth = 213
        this.spriteHeight = 213
        this.width = this.spriteWidth * 0.4
        this.height = this.spriteHeight * 0.4
        this.newX = Math.random() * (canvas.width - this.width)
        this.x = Math.random() * (canvas.width - this.width)
        this.y = Math.random() * (canvas.height - this.height)
        this.newY = Math.random() * (canvas.height - this.height)
        this.frame = 0
        this.interval = Math.floor(Math.random() * 100 + 50)
    }
    update() {
        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width)
            this.newY = Math.random() * (canvas.height - this.height)
        }
        let dx = this.x - this.newX
        let dy = this.y - this.newY
        this.x -= dx / 60
        this.y -= dy / 30
        // this.x -= this.speed
        // this.y += this.curve * Math.sin(this.angle)
        if (this.x + this.width < 0) this.x = canvas.width
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? (this.frame = 0) : this.frame++
        }
    }
    draw() {
        ctx?.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
    animate() {
        this.update()
        this.draw()
    }
}

for (let i = 0; i < numberOfEnemies; i++) {
    enemies.push(new Enemy())
}

const animate = () => {
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemies.forEach((enemy) => enemy.animate())
    gameFrame++
    requestAnimationFrame(animate)
}

animate()
