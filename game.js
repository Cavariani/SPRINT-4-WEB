document.addEventListener('DOMContentLoaded', (event) => {
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const gameMusic = document.getElementById('gameMusic');

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameMusic.play();
    });

    // Mova a função para o escopo global
    function updateRoboImage(roboId, imagePath) {
        console.log('Imagem clicada:', imagePath);
        const robo = document.getElementById(roboId);
        if (robo) {
            robo.src = imagePath;
            console.log('Imagem do robô atualizada para:', imagePath);
        } else {
            console.log('Elemento robô não encontrado para o ID:', roboId);
        }
    }

    const ROBO1_KEYS = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };
    const ROBO2_KEYS = {
        left: 65,
        up: 87,
        right: 68,
        down: 83
    };
    const MAX_WIDTH = 688;
    const MAX_HEIGHT = 540;
    const INITIAL_LIFE = 100;

    const robo1 = document.getElementById('robo1');
    const robo2 = document.getElementById('robo2');
    const robo1LifeElement = document.getElementById('robo1Life');
    const robo2LifeElement = document.getElementById('robo2Life');

    let robo1Life = INITIAL_LIFE;
    let robo2Life = INITIAL_LIFE;

    const robo1InitialPosition = {
        left: robo1.style.left || "0px",
        top: robo1.style.top || "0px"
    };

    const robo2InitialPosition = {
        left: robo2.style.left || "0px",
        top: robo2.style.top || "0px"
    };

    const keys = {};

    document.addEventListener('keydown', (e) => {
        keys[e.keyCode] = true;
        moveRobos();
    });

    document.addEventListener('keyup', (e) => {
        keys[e.keyCode] = false;
    });

    function moveRobos() {
        moveRobo(robo1, ROBO1_KEYS);
        moveRobo(robo2, ROBO2_KEYS);
    }

    function moveRobo(robo, keyMap) {
        let top = parseInt(window.getComputedStyle(robo).getPropertyValue('top'));
        let left = parseInt(window.getComputedStyle(robo).getPropertyValue('left'));
        const stepSize = 50;

        if (keys[keyMap.left] && left > 0)
            robo.style.left = `${Math.max(left - stepSize, 0)}px`;

        if (keys[keyMap.up] && top > 0)
            robo.style.top = `${Math.max(top - stepSize, 0)}px`;

        if (keys[keyMap.right] && left < MAX_WIDTH)
            robo.style.left = `${Math.min(left + stepSize, MAX_WIDTH)}px`;

        if (keys[keyMap.down] && top < MAX_HEIGHT)
            robo.style.top = `${Math.min(top + stepSize, MAX_HEIGHT)}px`;
    }

    setInterval(checkCollision, 100);

    function checkCollision() {
        const r1 = robo1.getBoundingClientRect();
        const r2 = robo2.getBoundingClientRect();

        if (!(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top)) {
            console.log('Colisão detectada');

            resetPositions();

            robo1Life -= Math.floor(Math.random() * 21);
            robo2Life -= Math.floor(Math.random() * 21);

            console.log('Vida do Robô 1:', robo1Life);
            console.log('Vida do Robô 2:', robo2Life);

            robo1Life = Math.max(robo1Life, 0);
            robo2Life = Math.max(robo2Life, 0);

            robo1LifeElement.textContent = 'Vida: ' + robo1Life;
            robo2LifeElement.textContent = 'Vida: ' + robo2Life;

            console.log('Texto do Elemento da Vida do Robô 1:', robo1LifeElement.textContent);
            console.log('Texto do Elemento da Vida do Robô 2:', robo2LifeElement.textContent);

            if (robo1Life <= 0 || robo2Life <= 0) {
                gameMusic.pause();
                gameMusic.currentTime = 0;
                alert('Fim de jogo! ' + (robo1Life > robo2Life ? 'Robô I' : 'Robô II') + ' ganhou com ' +
                    (robo1Life > robo2Life ? robo1Life : robo2Life) + ' de vida restante!');
                location.reload();
            }
        }
    }

    function resetPositions() {
        robo1.style.left = robo1InitialPosition.left;
        robo1.style.top = robo1InitialPosition.top;
        robo2.style.left = robo2InitialPosition.left;
        robo2.style.top = robo2InitialPosition.top;
    }
});
