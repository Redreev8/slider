# slider

Код слайдера находится по пути ``` ./src/scripts/index.js ```

## Настройки

```
new Slider({
    slider: document.querySelector('.slider'),
    translate: 7980,
    gap: 40,
    widthSlide: 240,
    speed: 8,
    nextBtn: document.querySelector('.slider__btn--next'),
    prevBtn: document.querySelector('.slider__btn--prev')
})
```

## HTML

```
<div class="slider">
	<div class="slider__wrapp">
		<div class="slide"></div>...
	</div>
</div>
```

Кнопки можно располодить в любом месте
```
<button class="slider__btn slider__btn--prev">prev</button>
<button class="slider__btn slider__btn--next">next</button>
```

## Основные стили **слайдера**
```
.slider {
    overflow: hidden;
    cursor: grab;
}
.slider--grabbing {
    cursor: grabbing;
}
.slider__wrapp {
    display: inline-flex;
    height: 100%;
}
.slider--grabbing .slider__wrapp {
    pointer-events: none;
}
.slider__wrapp--swipe {
    transition: transform .6s 0s;
}
.slide {}
.slider__btn {}
.slider__btn--prev {}
.slider__btn--next {}
.slider__btn--disable {}
```