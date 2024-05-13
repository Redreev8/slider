class Slider {
    _slider
    _widthSlide = 0
    _translate = 0
    pX = 0
    isDown = false
    classNames = {
        grabbing: 'slider--grabbing',
        swipe: 'slider__wrapp--swipe',
        wrapp: '.slider__wrapp',
        disable: 'slider__btn--disable'
    }
    constructor({ slider, speed = 8, widthSlide, gap = 0, translate = 0, nextBtn, prevBtn }) {
        this.slider = slider
        this.widthSlide = widthSlide
        this.gap = gap
        this.speed = speed
        this.translate = translate
        this.nextBtn = nextBtn
        this.prevBtn = prevBtn
    }

    start = (e) => {
        this.wrapp.classList.remove(this.classNames.swipe)
        this.slider.classList.add(this.classNames.grabbing)
        this.isDown = true
    }
    
    move = (e) => {
        if (!this.isDown) return
        const x = e.touches ? e.touches[0].clientX : e.clientX

        this.pX > x || this.pX === 0 ? this.translate += this.speed : this.translate -= this.speed
        this.pX = x
    }
    
    end = (e) => {
        this.slider.classList.remove(this.classNames.grabbing)
        this.isDown = false
    }

    prevSlide = (e) => {
        this.wrapp.classList.add(this.classNames.swipe)
        this.translate -= this.widtSlideAdnGap()  + (this.translate  % this.widtSlideAdnGap())
    }

    nextSlide = (e) => {
        this.wrapp.classList.add(this.classNames.swipe)
        this.translate += this.widtSlideAdnGap() - (this.translate  % this.widtSlideAdnGap())
    }

    widtSlideAdnGap = () => this.widthSlide + this.gap

    get slider() {
        return this._slider
    }

    set slider(slider) {
        this._slider = slider
        this.wrapp = slider.querySelector(this.classNames.wrapp)
        slider.addEventListener('mousedown', this.start)
        slider.addEventListener('mousemove', this.move)
        slider.addEventListener('mouseup', this.end)
        slider.addEventListener("touchstart", this.start);
        slider.addEventListener("touchmove", this.move);
        slider.addEventListener("touchend", this.end);
    }

    get nextBtn() {
        return this._nextBtn
    }

    set nextBtn(btn) {
        this._nextBtn = btn
        btn.addEventListener('click', this.nextSlide)
        this.translate === this.endX && this.nextBtn.classList.remove(this.classNames.disable)  
    }

    get prevBtn() {
        return this._prevBtn
    }

    set prevBtn(btn) {
        this._prevBtn = btn
        btn.addEventListener('click', this.prevSlide)
        this.translate === 0 && this.prevBtn.classList.add(this.classNames.disable) 
    }

    get translate() {
        return this._translate
    }

    set translate(x) {
        this.endX = this.wrapp.scrollWidth - this.wrapp.clientWidth
        this.nextBtn && this.nextBtn.classList.remove(this.classNames.disable) 
        this.prevBtn && this.prevBtn.classList.remove(this.classNames.disable) 
        if (x >= this.endX && this.endX !== 0) {
            this.prevBtn && this.nextBtn.classList.add(this.classNames.disable) 
            x = this.endX
        }
        if (x <= 0) {
            this.nextBtn && this.prevBtn.classList.add(this.classNames.disable) 
            x = 0
        }
        this._translate = x
        this.wrapp.style.transform = `translateX(-${this._translate}px)`
    }
}

new Slider({
    slider: document.querySelector('.slider'),
    translate: 0,
    gap: 40,
    widthSlide: 240,
    speed: 12,
    nextBtn: document.querySelector('.slider__btn--next'),
    prevBtn: document.querySelector('.slider__btn--prev')
})