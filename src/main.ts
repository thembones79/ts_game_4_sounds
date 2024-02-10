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

const explosions: Explosion[] = []
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
    timer: number
    angle: number
    image: HTMLImageElement

    constructor(x: number, y: number) {
        this.image = new Image()
        this.image.src = 'assets/boom.png'
        this.speed = Math.random() * 4 + 1
        this.spriteWidth = 200
        this.spriteHeight = 179
        this.width = this.spriteWidth * 0.7
        this.height = this.spriteHeight * 0.7
        this.x = x - this.width * 0.5
        this.y = y - this.height * 0.5
        this.frame = 0
        this.timer = 0
        this.angle = Math.random() * 6.2;
    }
    update() {
        this.timer++
        if (this.timer % 10 === 0) {
            this.frame++
        }
    }
    draw() {
        ctx?.save()
        ctx?.translate(this.x,this.y);
        ctx?.rotate(this.angle);
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
        ctx?.restore()
    }
    animate() {
        this.update()
        this.draw()
    }
}

const animate = () => {
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    for (let i = 0; i < explosions.length; i++) {
        explosions[i].animate()
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1)
        }
    }

    // gameFrame++
    requestAnimationFrame(animate)
}

animate()

window.addEventListener('click', (e: MouseEvent) => {
    createAnimation(e)
})

const createAnimation = (e: MouseEvent) => {
    let positionX = e.x - canvasPosition.left
    let positionY = e.y - canvasPosition.top
    explosions.push(new Explosion(positionX, positionY))
}
