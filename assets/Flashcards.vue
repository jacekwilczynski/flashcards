<template>
    <div class="flashcard-row">
        <div class="flashcard-row-item" v-for="flashcard in flashcards">
            <Flashcard :front="flashcard.front" :back="flashcard.back"/>
        </div>
    </div>
</template>

<script setup>
import Flashcard from './Flashcard'

const { flashcards } = defineProps(['flashcards'])
</script>

<style lang="scss">
.flashcard-row {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;

    &-item {
        padding: 1rem;
    }
}
</style>
