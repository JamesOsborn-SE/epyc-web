<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { useGame } from '@/stores/game';
import type { Entry } from '@/types/Entry';
import PencilSpinnerVue from '@/components/PencilSpinner.vue';
import { onMounted } from 'vue';

onMounted(()=>
{
        const gameStore = useGame();
        const route = useRoute();
        gameStore
            .getLastEntry(route.params.id)
            .then((i: Entry) => {
            router.push({ name: "entry", params: { id: i.id } });
        });
    })
</script>

<template>
  <div>
    <PencilSpinnerVue :show="true"/>
  </div>
</template>
