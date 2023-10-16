<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useSpellStore } from '@/stores/Spell.store'
import { copyToClipboard } from '@/scripts/clipboard'
import { Spell } from '@/models/Particles'

export default defineComponent({
    name: 'EditSave',
    setup () {
        const spellStore = useSpellStore()
        const { spells} = storeToRefs(spellStore)

        return {spells , copyToClipboard }

    },
    data() {
        return {
            json: ''
        }
    },
    methods: {
        download(){
            this.copyToClipboard({value: JSON.stringify(this.spells)})
        },
        upload() {
            if(this.json != ''){
                const newSpells: Spell[] = JSON.parse(this.json)
                if(newSpells){
                    this.spells = newSpells
                    this.json = ''
                }
            }
        }
    },
})
</script>
<template>
    <div class="flex flex-col items-end gap-y-2 p-4">
            <div class="flex flex-row gap-x-4">
                <div>Save data to clipboard</div>
                <button class="relative w-5 h-5 btn" @click="download()" title="Save data to clipboard">
                    <span class="material-symbols-outlined text-sm text-inherit">
                        download
                    </span>
                </button>
                <div id="clipboard" class="hidden"></div>
            </div>
            <div class="flex flex-row gap-x-4">
                <div>Paste JSON</div>
                <input class="border-[1px] border-white bg-transparent px-1" type="text" v-model="json"/>
                <button class="relative w-5 h-5 btn" @click="upload()" title="Save data to clipboard">
                    <span class="material-symbols-outlined text-sm text-inherit">
                        upload
                    </span>
                </button>
            </div>
        </div>
</template>
<style scoped>

</style>