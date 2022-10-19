import { Controller } from '@hotwired/stimulus'

export default class Flashcard extends Controller {
    static targets = ['front', 'back']

    static values = {
        animationClass: String,
        hiddenClass: String,
        frontRecording: String,
        backRecording: String,
    }

    visibleSide;
    hiddenSide;

    connect() {
        this.visibleSide = this.frontTarget
        this.hiddenSide = this.backTarget
    }

    flip() {
        this.element.classList.add(this.animationClassValue)
    }

    onHalfwayThroughFlip() {
        this.toggleVisibility()
        this.swapSideReferences()
        this.playRecording()
    }

    onFlipDone() {
        this.element.classList.remove(this.animationClassValue)
    }

    toggleVisibility() {
        this.frontTarget.classList.add(this.hiddenClassValue)
        this.backTarget.classList.remove(this.hiddenClassValue)
    }

    swapSideReferences() {
        const tmp = this.visibleSide
        this.visibleSide = this.hiddenSide
        this.hiddenSide = tmp
    }

    playRecording() {
        const url = this.visibleSide === this.frontTarget
            ? this.frontRecordingValue
            : this.backRecordingValue

        if (!url) {
            return
        }

        new Audio(url).play()
    }
}
