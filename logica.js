const character = document.getElementById("character");
const weapon = document.getElementById("weapon");
const scoreDisplay = document.getElementById("score");
const gameArea = document.getElementById("gameArea");

let characterX = 375; // Posición inicial X
let characterY = 275; // Posición inicial Y
let score = 0;

let babaras = [];
let movingUp = false, movingDown = false, movingLeft = false, movingRight = false;

// Movimiento del personaje
function moveCharacter() {
    if (movingUp && characterY > 0) characterY -= 5;
    if (movingDown && characterY < gameArea.offsetHeight - 50) characterY += 5;
    if (movingLeft && characterX > 0) characterX -= 5;
    if (movingRight && characterX < gameArea.offsetWidth - 50) characterX += 5;

    character.style.left = `${characterX}px`;
    character.style.top = `${characterY}px`;
}

// Controlar el movimiento con el cursor o flechas (móvil)
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp") movingUp = true;
    if (e.key === "ArrowDown") movingDown = true;
    if (e.key === "ArrowLeft") movingLeft = true;
    if (e.key === "ArrowRight") movingRight = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === "ArrowUp") movingUp = false;
    if (e.key === "ArrowDown") movingDown = false;
    if (e.key === "ArrowLeft") movingLeft = false;
    if (e.key === "ArrowRight") movingRight = false;
});

// Flechas de móvil
document.getElementById("up").addEventListener("click", () => movingUp = true);
document.getElementById("down").addEventListener("click", () => movingDown = true);
document.getElementById("left").addEventListener("click", () => movingLeft = true);
document.getElementById("right").addEventListener("click", () => movingRight = true);

// Función para disparar el arma
function shootWeapon() {
    weapon.style.visibility = "visible";
    let weaponX = characterX + 50;  // Al frente del personaje
    let weaponY = characterY + 20;  // A la altura del personaje
    weapon.style.left = `${weaponX}px`;
    weapon.style.top = `${weaponY}px`;

    let weaponInterval = setInterval(() => {
        weaponX += 10; // Avanza el arma
        weapon.style.left = `${weaponX}px`;

        // Si el arma sale del área de juego o golpea a un babara, se detiene
        if (weaponX > gameArea.offsetWidth) {
            clearInterval(weaponInterval);
            weapon.style.visibility = "hidden";
        }
    }, 50);
}

// Lógica de enemigos (babaras)
function spawnBabaras() {
    let babara = document.createElement("img");
    babara.src = "babara.png"; // Imagen de babara
    babara.style.position = "absolute";
    babara.style.width = "50px";
    babara.style.height = "50px";
    babara.style.left = `${Math.random() * gameArea.offsetWidth}px`;
    babara.style.top = `0px`;
    gameArea.appendChild(babara);

    babaras.push(babara);

    setInterval(() => {
        let babaraY = parseInt(babara.style.top);
        babara.style.top = `${babaraY + 2}px`; // Desplaza hacia abajo

        // Detectar colisión con el arma
        if (parseInt(babara.style.top) > characterY && parseInt(babara.style.top) < characterY + 50 &&
            parseInt(babara.style.left) > characterX && parseInt(babara.style.left) < characterX + 50) {
            score++;
            scoreDisplay.textContent = `Puntuación: ${score}`;
            babara.remove();
        }
    }, 100);
}

setInterval(moveCharacter, 20);
setInterval(spawnBabaras, 1000);
