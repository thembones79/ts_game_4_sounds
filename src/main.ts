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

const explosions = []
let canvasPosition = canvas.getBoundingClientRect()

let gameFrame = 0

class Explosion {
    x: number
    y: number
    width: number
    spriteHeight: number
    spriteWidth: number
    height: number
    speed: number
    frame: number
    image: HTMLImageElement

    constructor(x: number, y: number) {
        this.image = new Image()
        this.image.src = 'assets/boom.png'
        this.speed = Math.random() * 4 + 1
        this.spriteWidth = 200
        this.spriteHeight = 179
        this.width = this.spriteWidth * 0.5
        this.height = this.spriteHeight * 0.5
        this.x = x
        this.y = y
        this.frame = 0
    }
    update() {
        this.frame++
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
//
// const animate = () => {
//     ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//     gameFrame++
//     requestAnimationFrame(animate)
// }
//
// animate()

window.addEventListener('click', (e: MouseEvent) => {
    console.log(e)
    console.log(ctx)
    if (!ctx) return

    ctx.fillStyle = 'red'
    ctx.fillRect(e.x - canvasPosition.left, e.y - canvasPosition.top, 50, 50)
})
