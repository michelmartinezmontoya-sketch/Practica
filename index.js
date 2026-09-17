// necesito compara la fecha de hoy con la fecha de nacimiento de un grupo de personas
// y debe mostrarme las edades
// debe estar en una tabla web

function calcularEdad(dia, mes, anio) {
    const hoy = new Date();
    const nacimiento = new Date(anio, mes - 1, dia);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    if (hoy.getMonth() < nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}

function handleClick(event) {
    const dia = Number(document.getElementById('dia').value);
    const mes = Number(document.getElementById('mes').value);
    const anio = Number(document.getElementById('anio').value);

    if(dia < 1 || dia > 31) {
        document.getElementById('resultado').textContent = "Numero de dia Invalido";
        return;
    }

    if(mes < 1|| mes > 12){
        document.getElementById('resultado').textContent = "Numero de mes Invalido";
        return;
    }

    if(anio < 1950) { 
        document.getElementById('resultado').textContent = "Deberias comenzar a pensar si eres inmortal -_-"
        return;
    }
    
    const edad = calcularEdad(dia, mes, anio);

    document.getElementById('resultado').textContent = "Tienes " + edad + " años ...";

}

function main(){
    const button = document.getElementById('myBtn');
    button.addEventListener('click', handleClick);
}

document.addEventListener("DOMContentLoaded", () => {
   main()
});