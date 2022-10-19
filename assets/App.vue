<template>
    <template v-if="flashcards">
        <Flashcards :flashcards="flashcards"/>
    </template>
    <template v-else>
        Loading...
    </template>
</template>

<script setup>
import Flashcards from './Flashcards'
import { getFlashcards } from './getFlashcards'
import { ref } from 'vue'

const flashcards = ref(null);

(async () => {
    flashcards.value = await getFlashcards()
})()
</script>
