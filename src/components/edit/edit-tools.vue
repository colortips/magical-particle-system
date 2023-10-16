<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useSpellStore } from '@/stores/Spell.store'

export default defineComponent({
    name: 'EditTools',
    setup () {
        const spellStore = useSpellStore()
        const { colorPalette, selectedColor, selectedOpacity } = storeToRefs(spellStore)

        return {colorPalette, selectedColor, selectedOpacity }

    },
    methods: {
        selectColor(color: string) {
            this.selectedColor = color
        }
    },
})
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        
        <div class="flex flex-wrap w-20 h-max gap-y-2">
            <div v-for="color, index in colorPalette" :key="index" class="basis-1/2 flex justify-center items-center">
                <div :class="`h-6 w-6 ${selectedColor === color ? 'animate-spin' : 'rounded-full hover:cursor-pointer hover:scale-125'}`" 
                    :style="`background-color: ${color}`"
                    @click="selectColor(color)"></div>
            </div>
        </div>
        <div class="mt-10 flex flex-col">
            <span class="flex justify-center">
                Opacity: {{ selectedOpacity }}
            </span>
            <input class="w-20" type="range" id="Opacity" name="Opacity" min="0" max="1" v-model="selectedOpacity" step="0.1" />
        </div>
    </div>
</template>

<style scoped>

</style>