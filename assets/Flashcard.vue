<template>
    <div
        :class="{ 'flashcard': true, 'flip-animation': isFlipping }"
        @click="isFlipping = true"
        @animationiteration="onHalfwayThroughFlip"
        @animationend="isFlipping = false"
    >
        <div :class="{ 'visually-hidden': currentSide === 'front' }">
            {{ front.text }}
        </div>
        <div :class="{ 'visually-hidden': currentSide === 'back' }">
            {{ back.text }}
        </div>
    </div>
</template>

<script setup>
// magia Vue 3: poniższy pozornie prosty JS zostanie skompilowany na konfigurację komponentu
import { ref } from 'vue'

const props = defineProps(['front', 'back'])

const isFlipping = ref(false)
const currentSide = ref('front')

function onHalfwayThroughFlip() {
    if (currentSide.value === 'front') {
        currentSide.value = 'back'
    } else {
        currentSide.value = 'front'
    }

    const recording = props[currentSide.value].recording
    if (recording) {
        new Audio(recording).play()
    }
}
</script>

<style lang="scss">
$skalowanie: 0.5;

.flashcard {
    // sizing
    width: 21rem * $skalowanie;
    height: 37rem * $skalowanie;
    padding: 1rem;

    // content layout
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    // look & feel
    border-radius: 1.488px;
    box-shadow: 1px 1px 7px black;
    background-color: mix(papayawhip, white, 25%);

    // interaction
    cursor: pointer;
}

.flip-animation {
    animation-name: flip;
    animation-direction: alternate;
    animation-duration: 500ms;
    animation-iteration-count: 2;
    animation-timing-function: ease-in-out;
}

@keyframes flip {
    from {
        transform: rotateY(0deg)
    }
    to {
        transform: rotateY(90deg)
    }
}
</style>
