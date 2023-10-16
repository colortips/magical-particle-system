<script lang="ts">
import { ParticleFrame } from '@/models/Particles';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { storeToRefs } from 'pinia'
import { useSpellStore } from '@/stores/Spell.store'

export default defineComponent({
    name: 'DisplayFrame',
    props: {
        frame: {
            type: Object as PropType<ParticleFrame>,
            default: null,
            require: true,
        },
        scale: {
            type: Number,
            default: 8,
            require: false
        },
        index:{
            type: Number,
            default: 0,
            require: true
        },
    },
    setup () {
        
        const spellStore = useSpellStore()
        const { spells, currentFrame, currentSpell } = storeToRefs(spellStore)
        

        return {spellStore, spells, currentFrame, currentSpell}
    },
    computed: {
        isSelected(): Boolean {
            if(typeof this.currentFrame === 'number'){
                return this.currentFrame === this.index
            }
            else return false
        },
        isLastFrame(): Boolean{
            if(typeof this.currentSpell === 'number'){
                return this.index == this.spells[this.currentSpell].animation.length -1
            }
            else return false
        },
    },
    methods: {
        selectFrame(){
            this.currentFrame = this.index
        },
        deleteFrame(){
            if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
                this.spellStore.deleteFrame(this.currentSpell, this.currentFrame)
            }
        },
        clone(){
            if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
                this.spellStore.cloneFrame(this.currentSpell, this.currentFrame, this.frame)
            }
        },
        moveLeft(){
            if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
                this.spellStore.moveFrame(this.currentSpell, this.currentFrame, this.currentFrame -1)
            }
        },
        moveRight(){
            if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
                this.spellStore.moveFrame(this.currentSpell, this.currentFrame, this.currentFrame +1)
            }
        },
    },
})
</script>

<template>
    <div class="flex flex-col relative">
        <div :class="`p-2 w-min aspect-square border-[1px] ${isSelected ? 'border-primary' : 'border-white hover:cursor-pointer'}`" @click="selectFrame()">
            <div v-for="y in frame.particles.length -1" :key="y" class="flex flex-row w-full">
                <div v-for="x in frame.particles[y]?.length -1" :key="x" class="">
                    <div class="w-full h-full" :style="`background-color: ${frame.particles[y][x]?.color}; opacity: ${frame.particles[y][x]?.opacity}; min-width: ${scale}px; min-height: ${scale}px;`" />
                </div>
            </div>
        </div>
        <div v-if="isSelected" class="flex flex-row justify-around mt-2 absolute -bottom-8 w-full">
            <button v-if="index > 0" class="relative w-5 h-5 btn" @click="moveLeft()" title="Move frame to the left">
                <span class="material-symbols-outlined text-sm text-inherit">
                    arrow_back
                </span>
            </button>
            <button class="relative w-5 h-5 btn" @click="clone()" title="Clone frame">
                <span class="material-symbols-outlined text-sm text-inherit">
                    content_copy
                </span>
            </button>
            <button class="relative w-5 h-5 btn" @click="deleteFrame()" title="Delete frame">
                <span class="material-symbols-outlined text-sm text-inherit">
                    delete
                </span>
            </button>
            <button v-if="!isLastFrame" class="relative w-5 h-5 btn" @click="moveRight()" title="Move frame to the right">
                <span class="material-symbols-outlined text-sm text-inherit">
                    arrow_forward
                </span>
            </button>
        </div>
    </div>

</template>

<style scoped>

</style>