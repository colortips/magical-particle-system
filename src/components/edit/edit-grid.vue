<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useSpellStore } from '@/stores/Spell.store'

export default defineComponent({
    name: 'EditGrid',
    setup() {
        const spellStore = useSpellStore()
        const { spells, getCurrentFrame, currentFrame, currentSpell } = storeToRefs(spellStore)

        return {spellStore, spells, getCurrentFrame, currentFrame, currentSpell}
    },
    data() {
        return {
        }
    },
    mounted() {
        // this.spellStore.initSpell('Default')
    },
    computed: {
        isFirstFrame() {
            if(typeof this.currentSpell === 'number' && typeof this.currentSpell === 'number' ){
                return this.currentFrame == 0
            }
            else return false
        },
        isLastFrame() {
            if(typeof this.currentSpell === 'number' && typeof this.currentSpell === 'number' ){
                return this.currentFrame == this.spells[this.currentSpell].animation.length - 1
            }
            else return false
        }
    },
    methods: {
        init(){
            this.spellStore.initSpell('Default') 
        },
        editParticle(posx: number, posy: number) {
            this.spellStore.editParticle(posx, posy)
        },
        removeParticle(posx: number, posy: number){
            this.spellStore.removeParticle(posx, posy)
        },
        refresh(){
            this.spellStore.refreshFrame()
        },
        asPrev(){
            if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
                this.spellStore.copyFrame(this.currentSpell, this.currentFrame-1, this.currentFrame)
            }
        },
        asNext(){
            if(typeof this.currentSpell === 'number' && typeof this.currentFrame === 'number'){
                this.spellStore.copyFrame(this.currentSpell, this.currentFrame+1, this.currentFrame)
            }
        },
    },
})
</script>

<template>
    <div v-if="getCurrentFrame" class="flex flex-col justify-center items-center">
        <div class="w-min">
            <!-- Rows -->
            <div class="border-r-[1px] border-b-[1px] border-white">
                <div v-for="y in getCurrentFrame.particles.length -1" :key="y" class="flex flex-row border-t-[1px]">
                    <div v-for="x in getCurrentFrame.particles[y]?.length -1" :key="x" class="w-7 h-7 md:w-10 md:h-10 border-l-[1px] border-white hover:cursor-pointer" @click.left="editParticle(x,y)" @click.prevent.right="removeParticle(x,y)">
                        <div class="w-full h-full" :style="`background-color: ${getCurrentFrame.particles[y][x]?.color}; opacity: ${getCurrentFrame.particles[y][x]?.opacity}`" />
                    </div>
                </div>
            </div>
            <div class="mt-4 flex flex-row justify-around w-full">
                <button :class="`border-2 p-2 btn`" :disabled="isFirstFrame" @click="asPrev()">Same as previous</button>
                <button class="border-2 p-2 btn" @click="refresh()">
                    <span class="material-symbols-outlined text-inherit">
                        delete
                    </span>
                </button>
                <button class="border-2 p-2 btn" :disabled="isLastFrame" @click="asNext()">Same as next</button>
            </div>
        </div>
    </div>
    <div v-else class="w-full h-full flex justify-center items-center" @click="init()">
        <button class="btn px-4" @click="init()">
            Init
        </button>
    </div>
</template>


<style scoped>

</style>