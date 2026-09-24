declare const Temporal: any;

function handleClick(): void {

    const dia = Number(
        (document.getElementById("dia") as HTMLInputElement).value
    );

    const mes = Number(
        (document.getElementById("mes") as HTMLInputElement).value
    );

    const anio = Number(
        (document.getElementById("anio") as HTMLInputElement).value
    );

    const resultado = document.getElementById("resultado")!;
    const hoy = Temporal.Now.plainDateISO();

// Condiciones para escribir la fecha 

    if (!dia || !mes || !anio) {
        resultado.textContent = "Completa todos los campos.";
        return;
    }


    if (
        !Number.isInteger(dia) ||
        !Number.isInteger(mes) ||
        !Number.isInteger(anio)
    ) {
        resultado.textContent =
            "Tu dato no es entero, cámbialo por un número entero.";
        return;
    }


    if (dia < 1 || dia > 31) {
        resultado.textContent = "Número de día inválido.";
        return;
    }


    if (mes < 1 || mes > 12) {
        resultado.textContent = "Número de mes inválido.";
        return;
    }


    if (anio < 1950) {
        resultado.textContent =
            "Deberías comenzar a preguntarte si eres inmortal 🧐";
        return;
    }

// esta parte deteca fechas inexistentes es decir como el 31 de febrero
    try {

        const nacimiento = Temporal.PlainDate.from(
            {
                year: anio,
                month: mes,
                day: dia
            },
            {
                overflow: "reject"
            }
        );

//  esto ve si es una fecha futura y el calculo de edad hasta hoy 

        if (Temporal.PlainDate.compare(nacimiento, hoy) > 0) {
            resultado.textContent =
                "Todavía no has nacido 🤨";
            return;
        }


        const edad = nacimiento.until(hoy, {
            largestUnit: "years"
        });

// aqui suelta el mensaje a la persona y revisa si es su cumpleaños

        let mensaje =
            "Tienes " +
            edad.years + " años, " +
            edad.months + " meses y " +
            edad.days + " días.";


        if (
            hoy.day === dia &&
            hoy.month === mes
        ) {
            mensaje += " ¡Feliz cumpleaños! 🎉";
        }

// esto guarda el mensaje en el navegador, permitiendo que otra pagina
// lo pueda leer
        localStorage.setItem("resultadoEdad", mensaje);

// este codigo manda al usuario a la segunda pagina         
        window.location.href = "minijuego.html";


    } catch {

        resultado.textContent =
            "La fecha ingresada no existe.";
    }
}

// esto espera y activa el main cuando se hace el click
// en "calcular edad" y espera a que el HTML se cargue primero 

function main(): void {

    document
        .getElementById("myBtn")!
        .addEventListener("click", handleClick);

    document.addEventListener("keydown", function(event){
        if (event.key === "Enter") {
            handleClick();
        }
    });
}


document.addEventListener("DOMContentLoaded", main);