class Flashcard {
    constructor(root) {
        this.root = root
        this.currentFront = root.querySelector('[data-flashcard=front]')
        this.currentBack = root.querySelector('[data-flashcard=back]')
    }

    init() {
        this.root.addEventListener('click', () => this.flip())
        this.root.addEventListener('animationiteration', () => this._onHalfwayThroughFlip())
        this.root.addEventListener('animationend', () => this._onFlipDone())
    }

    flip() {
        this.root.classList.add(this._animationClass)
    }

    _onHalfwayThroughFlip() {
        this._toggleVisibility()
        this._swapSideReferences()
        this._playRecording()
    }

    _onFlipDone() {
        this.root.classList.remove(this._animationClass)
    }

    _toggleVisibility() {
        this.currentFront.classList.add(this._hiddenClass)
        this.currentBack.classList.remove(this._hiddenClass)
    }

    _swapSideReferences() {
        const tmp = this.currentFront
        this.currentFront = this.currentBack
        this.currentBack = tmp
    }

    _playRecording() {
        const url = this.currentFront.dataset.flashcardRecording

        if (url == null) {
            return
        }

        new Audio(url).play()
    }

    get _animationClass() {
        return this.root.dataset.flashcardAnimationClass
    }

    get _hiddenClass() {
        return this.root.dataset.flashcardHiddenClass
    }
}

document
    .querySelectorAll('[data-flashcard=root]')
    .forEach(element => new Flashcard(element).init())
