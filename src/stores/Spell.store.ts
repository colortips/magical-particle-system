import { defineStore } from 'pinia'
import { Particle, ParticleFrame, Spell } from '../models/Particles'
import { StorageSerializers, useStorage } from '@vueuse/core'


export const useSpellStore = defineStore('Spell', {
  state: () => ({
    spells: [new Spell('Default', 11)] as Spell[],
    // spells: useStorage('Spells', [new Spell('Default', 11)] as Spell[], localStorage, {
    //   mergeDefaults: true,
    //   // serializer: {
    //   //   read: (v: string) => (v ? JSON.parse(v) : []) as Spell[],
    //   //   write: (v: Spell[]) => JSON.stringify(v),
    //   // }
    // }) as unknown as Spell[],
    currentSpell: 0,
    currentFrame: 0,
    colorPalette: ['#000000','#ffffff', '#7f7f7f', '#c3c3c3', '#880015', '#b97a57', '#ed1c24', '#ffaec9', '#ff7f27', '#ffc90e',
                   '#fff200', '#efe4b0', '#22b14c', '#b5e61d', '#00a2e8', '#99d9ea', '#3f48cc', '#7092be', '#a349a4', '#c8bfe7'],
    selectedColor: '#ffffff',
    selectedOpacity: 1,
  }),
  getters: {
    getCurrentFrame() : ParticleFrame | null {
      if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
        return this.spells[this.currentSpell].animation[this.currentFrame]
      }
      else return null
    }
  },
  actions: {
    createParticle(color: string, opacity?: number, brightness?: number){
      return new Particle(color, opacity, brightness)
    },
    initFrame(){
      if(typeof this.currentSpell === 'number'){
        this.spells[this.currentSpell].animation.push(new ParticleFrame(11))
      }
    },
    initSpell(spellName: string){
      this.spells.push(new Spell(spellName, 11))
      this.currentSpell = this.spells.length - 1
      this.currentFrame = 0
    },
    editParticle(posx: number, posy: number){
      if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
        this.spells[this.currentSpell].animation[this.currentFrame].editParticle(posx, posy, new Particle(this.selectedColor, this.selectedOpacity))
      }
    },
    removeParticle(posx: number, posy: number){
      if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
        this.spells[this.currentSpell].animation[this.currentFrame].editParticle(posx, posy, null)
      }
    },
    refreshFrame(){
      if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
        this.spells[this.currentSpell].animation[this.currentFrame] = new ParticleFrame(11)
      }
    },
    addFrame(){
      this.initFrame()
      if(typeof this.currentSpell === 'number'){
        this.currentFrame = this.spells[this.currentSpell].animation.length -1
      }
    },
    deleteFrame(spellIndex: number, frameIndex: number){
      this.spells[spellIndex].animation.splice(frameIndex, 1)
    },
    cloneFrame(spellIndex: number, frameIndex: number, frame: ParticleFrame){
      const newFrame = new ParticleFrame();
      newFrame.particles = frame.particles.map(function(arr) {return arr.slice()})
      this.spells[spellIndex].animation.splice(frameIndex+1, 0, newFrame)
    },
    moveFrame(spellIndex: number, actualPosition: number, newPosition: number){
      const newArray = [...this.spells[spellIndex].animation]
      const [movedElement] = newArray.splice(actualPosition, 1)
      newArray.splice(newPosition, 0, movedElement)
      this.spells[spellIndex].animation = newArray
      this.currentFrame = newPosition
    },
    copyFrame(spellIndex: number, indexToCopy: number, indexToEdit: number ){
      const frameToCopy = this.spells[spellIndex].animation[indexToCopy]
      const frameToEdit = this.spells[spellIndex].animation[indexToEdit]
      frameToEdit.particles = frameToCopy.particles.map(function(arr) {return arr.slice()})
    }
    
  },
})
