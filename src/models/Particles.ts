export class Particle {
    color: string
    opacity: number
    brightness: number

    constructor(color: string, opacity?: number, brightness?: number){
        this.color = color
        this.opacity = opacity || 1
        this.brightness = brightness || 1
    }
}

export enum EndEffect {
    None,
    Fade,
}
export class ParticleFrame {
    particles: (Particle | null)[][]
    endEffect: EndEffect

    constructor(frameSize?: number){
        const particles = [] as (Particle | null)[][]
        if(frameSize){
            for (let y = 0; y < frameSize; y++) {
                particles[y] = []
                for (let x = 0; x < frameSize; x++) {
                    particles[y][x] = null
                    // particles[y][x] = new Particle(`#ff${x}ff${y}`, 1, 1)
                }
            }
        }

        this.particles = particles
        this.endEffect = EndEffect.None
    }

    public editParticle(x: number, y: number, particle: Particle | null){
        this.particles[y][x] = particle
    }
}

export class Spell {
    name: string
    animation: ParticleFrame[]
    constructor(name: string, animationSize: number){
        this.name = name
        this.animation = [new ParticleFrame(animationSize)]
    }
}