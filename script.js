const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const button = document.querySelector("#btn");

let isJumping = false;
let isGameOver = false;
let position = 0;
let velocidade = 0;

function handleKeyUp(event) {
    if (event.keyCode === 38) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 280) {
            // Descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1200;
    let randomTime = Math.random() * velocidade;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {
            // Saiu da tela
            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game over
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo ;(</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

button.onclick = () => {
    input1 = document.querySelector("#entrada");
    velocidade = input1.value

    if (velocidade <= 0 || velocidade > 4) {
        alert('Defina uma velocidade entre 1 e 4...');
    } else {
        velocidade = velocidade * 2000;
        createCactus();
    }
}

document.addEventListener('keyup', handleKeyUp);