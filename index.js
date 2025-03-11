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
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },

        move: function (element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },

        scale: function (element, duration, ratio) {
            element.style.transitionDuration =  `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },

        fadeOut: function (element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.add('hide');
            element.classList.remove('show');
        },

        moveAndHide: function (element, duration) {
            animaster().move(element, duration * 0.4, {x: 100, y: 20});
            animaster().fadeOut(element, duration * 0.6);
        },

        showAndHide: function (element, duration) {
            animaster().fadeIn(element, duration / 3);
            element.style.transitionDuration =  `${duration / 3}ms`;
            animaster().fadeOut(element, duration / 3);
        },

        heartBeating: function (element, duration) {
            while (true){
                element.style.transitionDuration =  `500ms`;
                animaster().scale(element, 1.4);
                element.style.transitionDuration =  `500ms`;
                animaster().scale(element, 1 / 1.4);
            }
        },
    }
}

function addListeners() {
    const animasterObj = animaster();
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
