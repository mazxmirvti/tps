let stringa;

let righe = [];
let valNum = [];
let tabella = [];

const canvas = document.getElementById("grafico");
const diagramma = canvas.getContext("2d");

const largCanvas = 1000;
const altCanvas = 600;

function read(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        stringa = reader.result;
        inserisci();
    };
}

function inserisci() {
    document.getElementById("titolo").innerHTML = "Informazioni del file";
    let tab = document.getElementById("tabella");
    righe = stringa.split("\n");
    tab.innerHTML = "";
    for (let n = 0; n < righe.length; n++) {
        tabella[n] = righe[n].split(",");
        let nuovaRiga = tab.insertRow();
        for (let z = 0; z < tabella[n].length; z++) {
            let cella = nuovaRiga.insertCell(z);
            cella.innerHTML = tabella[n][z].replace(/"/g, '');
        }
    }
    valNum = [];
    for (let z = 1; z < righe.length; z++) {
        let valore = Number(tabella[z][1].replace(/"/g, ''));
        if (!isNaN(valore)) {
            valNum.push(valore);
        }
    }
    disegna();
}

function disegna() {
    let canvasX;
    let canvasY;

    diagramma.clearRect(0, 0, largCanvas, altCanvas);
    diagramma.beginPath();
    diagramma.font = "italic small-caps bold 10px arial";

    diagramma.moveTo(largCanvas - 135, altCanvas - 20);
    diagramma.lineTo(30, altCanvas - 20);
    diagramma.lineTo(30, 0);
    diagramma.stroke();

    for (let x = 1; x < righe.length; x++) {
        canvasX = ((largCanvas - 160) / (righe.length - 1)) * x;
        diagramma.fillText(tabella[x][0].replace(/"/g, ' '), canvasX - 10, altCanvas - 5);
    }
    let max = Math.ceil(Math.max(...valNum) / 1000) * 1000;
    let min = Math.floor(Math.min(...valNum) / 1000) * 1000;
    let differenza = max - min;
    let scalaY = (altCanvas - 40) / differenza;
    for (let i = 0; i <= 5; i++) {
        let yPos = altCanvas - 20 - (scalaY * (i * differenza / 5));
        diagramma.fillText(min + (i * differenza / 5), 0, yPos);
    }
    diagramma.beginPath();
    for (let y = 0; y < righe.length - 1; y++) {
        canvasX = ((largCanvas - 160) / (righe.length - 1)) * (y + 1);
        canvasY = altCanvas - 20 - (scalaY * (valNum[y] - min));
        if (y === 0) {
            diagramma.moveTo(canvasX, canvasY);
        } else {
            diagramma.lineTo(canvasX, canvasY);
        }
    }
    diagramma.stroke();
}
