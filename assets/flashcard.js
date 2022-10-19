class Flashcard {
    constructor({ rootElement, front, back, classes }) {
        this.rootElement = rootElement
        this.currentFront = front
        this.currentBack = back
        this.classes = classes
    }

    init() {
        this.rootElement.addEventListener('click', () => this.flip())
        this.rootElement.addEventListener('animationiteration', () => this._onHalfwayThroughFlip())
        this.rootElement.addEventListener('animationend', () => this._onFlipDone())
    }

    flip() {
        this.rootElement.classList.add(this.classes.animation)
    }

    _onHalfwayThroughFlip() {
        this._toggleVisibility()
        this._swapSideReferences()
        this._playRecording()
    }

    _onFlipDone() {
        this.rootElement.classList.remove(this.classes.animation)
    }

    _toggleVisibility() {
        this.currentFront.element.classList.add(this.classes.hidden)
        this.currentBack.element.classList.remove(this.classes.hidden)
    }

    _swapSideReferences() {
        const tmp = this.currentFront
        this.currentFront = this.currentBack
        this.currentBack = tmp
    }

    _playRecording() {
        const url = this.currentFront.recording

        if (url == null) {
            return
        }

        new Audio(url).play()
    }
}

// możnaby zrobić oddzielną klasę np. FlashcardInitializer (zawierającą cały poniższy kod) albo
// FlashcardFactory (zawierającą tylko tworzenie pojedynczego obiektu Flashcard na podstawie rootElement);
// zamiast klas mogłyby być też po prostu funkcje (za dużo opcji ten JS daje...)
document
    .querySelectorAll('[data-flashcard=root]')
    .forEach(rootElement => {
        const frontElement = rootElement.querySelector('[data-flashcard=front]')
        const backElement = rootElement.querySelector('[data-flashcard=back]')

        const flashcard = new Flashcard({
            rootElement,
            front: {
                element: frontElement,
                recording: frontElement.dataset.flashcardRecording,
            },
            back: {
                element: backElement,
                recording: backElement.dataset.flashcardRecording,
            },
            classes: {
                animation: rootElement.dataset.flashcardAnimationClass,
                hidden: rootElement.dataset.flashcardHiddenClass,
            }
        })

        flashcard.init()
    })
