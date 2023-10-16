

<script lang="ts">
import { defineComponent } from 'vue'
import EditGrid from '../edit/edit-grid.vue';
import EditTools from '../edit/edit-tools.vue';
import EditTimeLine from '../edit/edit-time-line.vue';
import EditSave from '../edit/edit-save.vue';

export default defineComponent({
    name: 'EditPannel',
    setup() {
        return {};
    },
    components: { EditGrid, EditTools, EditTimeLine, EditSave }
})
</script>

<template>
    <div class="w-full h-full bg-grey grid grid-cols-1 grid-rows-[auto,1fr,3fr,1fr] md:grid-cols-[1fr,4fr] md:grid-rows-[auto,7fr,3fr] gap-5">
        <EditSave class="md:col-span-2"></EditSave>
        <EditTools class="md:row-span-1"></EditTools>
        <EditGrid class="md:col-start-2"></EditGrid>
        <div class="md:col-span-2">
            <EditTimeLine></EditTimeLine>
        </div>
    </div>
</template>

<style scoped>

</style>