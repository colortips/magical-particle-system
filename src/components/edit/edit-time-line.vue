<script lang="ts">
import { defineComponent } from 'vue'
import DisplayFrame from '../display/display-frame.vue';
import { storeToRefs } from 'pinia'
import { useSpellStore } from '@/stores/Spell.store'


export default defineComponent({
    name: 'EditTimeLine',
    components: { DisplayFrame },
    setup () {
        const spellStore = useSpellStore()
        const { spells, currentFrame, currentSpell } = storeToRefs(spellStore)

        return {spellStore, spells, currentFrame, currentSpell}

    },
    computed: {
        spell() {
            if(typeof this.currentSpell === 'number'){
                return this.spells[this.currentSpell].animation
            }
        }
    },
    methods: {
        addFrame() {
            this.spellStore.addFrame()
        },
    },
})
</script>

<template>
    <div v-if="spell" class="px-4 pb-10 flex flex-row flex-nowrap overflow-x-auto overscroll-none w-full h-full gap-x-4 items-center">
        <DisplayFrame v-for="frame, index in spell" :key="index" :frame="frame" :index="index"></DisplayFrame>
        <button class="btn rounded-none aspect-square flex justify-center items-center w-10 p-5 mr-2 text-2xl font-bold relative" @click="addFrame()">
            <span class="absolute">+</span>
        </button>
    </div>
</template>

<style scoped>

</style>