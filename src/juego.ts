const juego = document.getElementById("juego")!;
const nave = document.getElementById("nave")!;
const textoPuntos = document.getElementById("puntos")!;

let posicionNave = 225;
let puntos = 0;

let direccion = -1;

const enemigos: HTMLElement[] = [];


function crearEnemigos(): void {

    for (let i = 0; i < 5; i++) {

        const enemigo = document.createElement("div");

        enemigo.classList.add("enemigo");

        enemigo.style.left = (50 + i * 85) + "px";
        enemigo.style.top = "60px";

        juego.appendChild(enemigo);

        enemigos.push(enemigo);
    }
}


function moverEnemigos(): void {

    setInterval(function() {

        let tocarPared = false;

        enemigos.forEach(function(enemigo) {

            if (!juego.contains(enemigo)) {
                return;
            }

            const x = parseInt(enemigo.style.left);

            if (
                (direccion === -1 && x <= 0) ||
                (direccion === 1 && x >= 465)
            ) {
                tocarPared = true;
            }
        });


        if (tocarPared) {

            direccion *= -2;

            enemigos.forEach(function(enemigo) {

                if (!juego.contains(enemigo)) {
                    return;
                }

                let y = parseInt(enemigo.style.top);

                y += 20;

                enemigo.style.top = y + "px";
            });

        } else {

            enemigos.forEach(function(enemigo) {

                if (!juego.contains(enemigo)) {
                    return;
                }

                let x = parseInt(enemigo.style.left);

                x += 15 * direccion;

                enemigo.style.left = x + "px";
            });
        }

    }, 150);
}


function moverNave(tecla: string): void {

    if (tecla === "ArrowLeft") {
        posicionNave -= 20;
    }

    if (tecla === "ArrowRight") {
        posicionNave += 20;
    }

    if (posicionNave < 0) {
        posicionNave = 0;
    }

    if (posicionNave > 450) {
        posicionNave = 450;
    }

    nave.style.left = posicionNave + "px";
}


function disparar(): void {

    const bala = document.createElement("div");

    bala.classList.add("bala");

    bala.style.left = (posicionNave + 22) + "px";
    bala.style.bottom = "45px";

    juego.appendChild(bala);

    let posicionBala = 45;

    const movimiento = setInterval(function() {

        posicionBala += 10;

        bala.style.bottom = posicionBala + "px";


        enemigos.forEach(function(enemigo) {

            if (!juego.contains(enemigo)) {
                return;
            }

            const balaRect = bala.getBoundingClientRect();
            const enemigoRect = enemigo.getBoundingClientRect();

            const choque =
                balaRect.left < enemigoRect.right &&
                balaRect.right > enemigoRect.left &&
                balaRect.top < enemigoRect.bottom &&
                balaRect.bottom > enemigoRect.top;


            if (choque) {

                enemigo.remove();
                bala.remove();

                puntos++;

                textoPuntos.textContent =
                    "SCORE: " + puntos + " / 5";

                clearInterval(movimiento);


                if (puntos >= 5) {

                    window.location.href = "resultado.html";
                }
            }
        });


        if (posicionBala > 500) {

            bala.remove();

            clearInterval(movimiento);
        }

    }, 30);
}


document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    ) {
        moverNave(event.key);
    }


    if (event.code === "Space") {

        disparar();
    }

});


crearEnemigos();
moverEnemigos();