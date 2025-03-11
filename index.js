addListeners();

function animaster() {
    function resetFadeIn(element){
        element.style.transitionDuration = null;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function resetFadeOut(element){
        element.style.transitionDuration = null;
        element.classList.add('show');
        element.classList.remove('hide');
    }

    function resetMoveAndScale(element){
        element.style.transform = null;
    }

    return {
        fadeIn: function (element, duration) {
            this.addFadeIn(duration).play(element);
        },

        move: function (element, duration, translation) {
            this.addMove(duration, translation).play(element);
        },

        scale: function (element, duration, ratio) {
            this.addScale(duration, ratio).play(element);
        },

        fadeOut: function (element, duration) {
            this.addFadeOut(duration).play(element);
        },

        moveAndHide: function (element, duration) {
            animaster().move(element, duration * 0.4, {x: 100, y: 20});
            setTimeout(() => animaster().fadeOut(element, duration * 0.6), duration * 0.4)
        },

        resetMoveAndHide: function (element) {
            element.style.transitionDuration = null;
            resetFadeOut(element);
            resetMoveAndScale(element);
        },

        showAndHide: function (element, duration) {
            animaster().fadeIn(element, duration / 3);
            setTimeout(() => animaster().fadeOut(element, duration * 0.6), duration * 2 / 3)
        },

        heartBeating: function (element, duration) {

            let intervalId = setInterval(() => {
                animaster().scale(element, 500, 1.4);
                setTimeout(() => animaster().scale(element, 500, 1), 500);
            }, 1000)
            return {
                stop: function () {
                    clearInterval(intervalId);
                    animaster().scale(element, 500, 1);
                }
            };
        },


        _steps: [],

        addMove: function (duration, translation) {
            const func = (element) => {
                element.style.transitionDuration = `${duration}ms`;
                element.style.transform = getTransform(translation, null);
            };

            this._steps.push(func);
            return this;
        },

        addScale: function (duration, ratio) {
            const func = (element) => {
                element.style.transitionDuration =  `${duration}ms`;
                element.style.transform = getTransform(null, ratio);
            };

            this._steps.push(func);
            return this;
        },
        addFadeIn: function (duration) {
            const func = (element) => {
                element.style.transitionDuration =  `${duration}ms`;
                element.classList.remove('hide');
                element.classList.add('show');
            };

            this._steps.push(func);
            return this;
        },
        addFadeOut: function (duration) {
            const func = (element) => {
                element.style.transitionDuration =  `${duration}ms`;
                element.classList.remove('show');
                element.classList.add('hide');
            };

            this._steps.push(func);
            return this;
        },

        play: function (element) {
            for (let func of this._steps){
                func(element);
            }
            this._steps = [];
        }
    }
}

function addListeners() {
    const animasterObj = animaster();
    let heartbeatController;
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animasterObj.fadeIn(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animasterObj.move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animasterObj.scale(block, 1000, 1.25);
        });
    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animasterObj.fadeOut(block, 5000);
        });
    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animasterObj.moveAndHide(block, 5000);
        });
    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animasterObj.showAndHide(block, 5000);
        });
    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            heartbeatController = animasterObj.heartBeating(block, 5000);
        });
    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            if (heartbeatController) {heartbeatController.stop();}
        });
}


function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
