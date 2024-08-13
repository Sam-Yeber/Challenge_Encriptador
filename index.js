// Selección de elementos del DOM
const divDesencriptarLetras = document.querySelector(".contenedor__desencriptar__letras");
const divDesencriptarBotones = document.querySelector(".contenedor__desencriptar__botones");
const areaEncriptar = document.querySelector(".contenedor__texto__encriptar");
const areaResultado = document.querySelector(".contenedor__texto__desencriptar");

// Variables y Regex
const regex = /^[a-z\s]+$/;
const mapeoEncriptado = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
};

// Función para mostrar el resultado desencriptado
function colocarResultado(texto) {
    areaResultado.value = texto;
    divDesencriptarLetras.style.visibility = "hidden";
    divDesencriptarBotones.style.visibility = "visible";
}

// Función para encriptar texto
function encriptarTexto() {
    const textoParaEncriptar = areaEncriptar.value.toLowerCase();

    if (regex.test(textoParaEncriptar) && textoParaEncriptar.length > 0) {
        const textoEncriptado = textoParaEncriptar.replace(/[aeiou]/g, letra => mapeoEncriptado[letra]);
        colocarResultado(textoEncriptado);
    } else {
        mensajeError(textoParaEncriptar);
    }
}

// Función para desencriptar texto
function desencriptarTexto() {
    let textoParaDesencriptar = areaEncriptar.value.toLowerCase();
    const mapeoDesencriptado = {
        ai: "a",
        enter: "e",
        imes: "i",
        ober: "o",
        ufat: "u"
    };

    if (regex.test(textoParaDesencriptar) && textoParaDesencriptar.length > 0) {
        Object.keys(mapeoDesencriptado).forEach(key => {
            textoParaDesencriptar = textoParaDesencriptar.replaceAll(key, mapeoDesencriptado[key]);
        });
        colocarResultado(textoParaDesencriptar);
    } else {
        mensajeError(textoParaDesencriptar);
    }
}

// Función para copiar el texto
function copiarTexto() {
    const textoCopiado = areaResultado.value;

    if (regex.test(textoCopiado) && textoCopiado.length > 0) {
        navigator.clipboard.writeText(textoCopiado).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Texto Copiado!',
                showConfirmButton: false,
                timer: 1500
            });
        }).catch(err => {
            console.error('Error al copiar el texto:', err);
        });
    } else {
        mensajeError(textoCopiado);
    }
}

// Función para limpiar el área de texto
function limpiarTexto() {
    areaEncriptar.value = "";
    areaResultado.value = "";
    divDesencriptarLetras.style.visibility = "visible";
    divDesencriptarBotones.style.visibility = "hidden";
}

// Función para cambiar de color
function cambiaDeColor() {
    const colores = checkbox.checked ? {
        primario: '#86868B',
        secundario: '#131313',
        terciario: '#2B2B2B',
        hover: '#84A7A1',
        saturacion: '3'
    } : {
        primario: '#052051',
        secundario: '#E9ECF8',
        terciario: '#FFFFFF',
        hover: '#0A3871',
        saturacion: '1'
    };

    Object.entries(colores).forEach(([color, valor]) => {
        document.documentElement.style.setProperty(`--color-${color}`, valor);
    });
}

// Función para mostrar mensajes de error
function mensajeError(texto) {
    const esCampoVacio = texto.length <= 0;
    const mensaje = esCampoVacio ? "✦ Ingresa Texto ✦" : "INTENTA LO SIGUIENTE: \n ✦ Solo Letras Minúsculas \n ✦ No Números ✦ No Caracteres especiales o acentos";
    const titulo = esCampoVacio ? "¡Campo Vacío!" : "¡Ups! Algo salió mal";

    Swal.fire({
        title: titulo,
        text: mensaje,
        showConfirmButton: false,
        timer: esCampoVacio ? 2000 : 4000,
        timerProgressBar: true,
        background: '#F7B0A8',
    });
}
