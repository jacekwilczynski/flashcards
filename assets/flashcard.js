// zależność od CSSa (JS musi wiedzieć, jakie klasy w CSSie pomogą osiągnąć zamierzony efekt)
const HIDDEN_CLASS = 'visually-hidden'
const ANIMATION_CLASS = 'flip-animation'

class Flashcard {
    constructor(root) {
        this.root = root

        // zależność od struktury HTML; gdyby zamienić to na wyławianie po klasie, byłaby zależność od klasy
        this.currentFront = root.firstElementChild
        this.currentBack = root.lastElementChild
    }

    init() {
        this.root.addEventListener('click', () => this.flip())
        this.root.addEventListener('animationiteration', () => this._onHalfwayThroughFlip())
        this.root.addEventListener('animationend', () => this._onFlipDone())
    }

    flip() {
        this.root.classList.add(ANIMATION_CLASS)
    }

    _onHalfwayThroughFlip() {
        this._toggleVisibility()
        this._swapSideReferences()
        this._playRecording()
    }

    _onFlipDone() {
        this.root.classList.remove(ANIMATION_CLASS)
    }

    _toggleVisibility() {
        this.currentFront.classList.add(HIDDEN_CLASS)
        this.currentBack.classList.remove(HIDDEN_CLASS)
    }

    _swapSideReferences() {
        const tmp = this.currentFront
        this.currentFront = this.currentBack
        this.currentBack = tmp
    }

    _playRecording() {
        const url = this.currentFront.dataset.recording

        if (url == null) {
            return
        }

        new Audio(url).play()
    }
}

document
    // zależność od HTMLa; można ją uczynić bardziej explicit stosując przedrostek "js-" w nazwie klasy, choć wtedy możnaby powiedzieć, że jeszcze HTML zacznie zależeć od JS-a...
    // anyway, znana powszechnie konwencja: stylujemy raczej po klasach; JS szuka elementów po id lub data attributes, ew. klasach js-*
    .querySelectorAll('.flashcard')
    .forEach(element => new Flashcard(element).init())
