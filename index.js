addListeners();

function animaster() {
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
            element.style.transitionDuration =  `${duration * 0.4}ms`;
            animaster().move(element, duration, {x: element.x + 100, y: element.y});
            element.style.transitionDuration =  `${duration * 0.6}ms`;
            animaster().fadeOut(element, duration);
        },

        showAndHide: function (element, duration) {
            element.style.transitionDuration =  `${duration / 3}ms`;
            animaster().fadeIn(element, duration);
            element.style.transitionDuration =  `${duration / 3}ms`;
            element.style.transitionDuration =  `${duration / 3}ms`;
            animaster().fadeOut(element, duration);
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
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            fadeIn(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            scale(block, 1000, 1.25);
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
