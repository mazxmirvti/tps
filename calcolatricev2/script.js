function aggiungi(value) {
    document.getElementById("schermo").value += value;
}


function cancella() {
    document.getElementById("schermo").value = "";
}


function risultato() {
    const schermo = document.getElementById("schermo");
        schermo.value = eval(schermo.value);
}

document.addEventListener("keydown", function(event) {
    const schermo = document.getElementById("schermo");
    const simboliAmmessi = "0123456789+-*";

    if (event.key === "Enter") {
        risultato();
    }

    else if (event.key === "Backspace") {
        cancella();
    }

    else if (simboliAmmessi.includes(event.key)) {
        schermo.value += event.key;
    }
});
