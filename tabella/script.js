
function getContatore() {
    let contatore = localStorage.getItem("cont");
    if (contatore === null) {
        contatore = 1;
    } else {
        contatore = parseInt(contatore) + 1;
    }
    localStorage.setItem("cont", contatore);
    return contatore;
}

function stampa() {
    const nuovaRiga = [];
    let print = document.getElementById("Nome").value;
    let print2 = document.getElementById("Cognome").value;  
    let print3 = document.getElementById("Indirizzo").value;  
    let print4 = document.getElementById("Città").value;  
    let print5 = document.getElementById("Email").value;

    nuovaRiga.push(print, print2, print3, print4, print5);
    const i = getContatore();
    localStorage.setItem("Info" + i, nuovaRiga);
}

function aggiornaTabella() {
    let table = document.getElementById("tabella");
    let i = 1;
    while (localStorage.getItem("Info" + i) !== null) {
        let infoTemp = localStorage.getItem("Info" + i);
        const info = infoTemp.split(",");

        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.innerHTML = info[0];
        cell2.innerHTML = info[1];
        cell3.innerHTML = info[2];
        cell4.innerHTML = info[3];
        cell5.innerHTML = info[4];

        i++;
    }
}

function svuotaTabella() {
    let table = document.getElementById("tabella");
    let contRighe = table.rows.length;
    for (let i = contRighe - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    let i = 1;
    while (localStorage.getItem("Info" + i) !== null) {
        localStorage.removeItem("Info" + i);
        i++;
    }
    localStorage.removeItem("cont");
}
