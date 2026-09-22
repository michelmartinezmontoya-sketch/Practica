"use strict";
function handleClick() {
    const dia = Number(document.getElementById("dia").value);
    const mes = Number(document.getElementById("mes").value);
    const anio = Number(document.getElementById("anio").value);
    const resultado = document.getElementById("resultado");
    const hoy = Temporal.Now.plainDateISO();
    // Campos vacíos
    if (!dia || !mes || !anio) {
        resultado.textContent = "Completa todos los campos.";
        return;
    }
    // Solo números enteros
    if (!Number.isInteger(dia) ||
        !Number.isInteger(mes) ||
        !Number.isInteger(anio)) {
        resultado.textContent =
            "Tu dato no es entero, cámbialo por un número entero.";
        return;
    }
    // Día
    if (dia < 1 || dia > 31) {
        resultado.textContent = "Número de día inválido.";
        return;
    }
    // Mes
    if (mes < 1 || mes > 12) {
        resultado.textContent = "Número de mes inválido.";
        return;
    }
    // Año
    if (anio < 1950) {
        resultado.textContent =
            "Deberías comenzar a preguntarte si eres inmortal 🧐";
        return;
    }
    try {
        const nacimiento = Temporal.PlainDate.from({
            year: anio,
            month: mes,
            day: dia
        }, {
            overflow: "reject"
        });
        // Fecha futura
        if (Temporal.PlainDate.compare(nacimiento, hoy) > 0) {
            resultado.textContent =
                "Todavía no has nacido 🤨";
            return;
        }
        // Calcular años, meses y días
        const edad = nacimiento.until(hoy, {
            largestUnit: "years"
        });
        // Crear mensaje
        let mensaje = "Tienes " +
            edad.years + " años, " +
            edad.months + " meses y " +
            edad.days + " días.";
        // Cumpleaños
        if (hoy.day === dia &&
            hoy.month === mes) {
            mensaje += " ¡Feliz cumpleaños! 🎉";
        }
        localStorage.setItem("resultadoEdad", mensaje);
        window.location.href = "resultado.html";
    }
    catch {
        resultado.textContent =
            "La fecha ingresada no existe.";
    }
}
function main() {
    document
        .getElementById("myBtn")
        .addEventListener("click", handleClick);
}
document.addEventListener("DOMContentLoaded", main);
