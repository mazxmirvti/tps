let indice = 0;
let archivio = [];

// Funzione per salvare i dati inseriti nel form
function memorizzaDati() {
    const record = {
        nome: document.getElementById("nome").value,
        cognome: document.getElementById("cognome").value,
        citta: document.getElementById("citta").value,
        indirizzo: document.getElementById("indirizzo").value,
        email: document.getElementById("mail").value
    };

    // Aggiunge il record all'archivio e lo salva in localStorage
    archivio.push(record);
    localStorage.setItem("archivio", JSON.stringify(archivio));

    // Resetta i campi del form dopo il salvataggio
    document.getElementById("nome").value = "";
    document.getElementById("cognome").value = "";
    document.getElementById("citta").value = "";
    document.getElementById("indirizzo").value = "";
    document.getElementById("mail").value = "";

    // Aggiorna la tabella con i dati salvati
    aggiornaTabella();
}

// Funzione per aggiornare la tabella con i dati memorizzati
function aggiornaTabella() {
    let tabellaDati = document.getElementById("tabella");
    tabellaDati.innerHTML = "";
    let datiSalvati = JSON.parse(localStorage.getItem("archivio")) || [];

    // Ciclo per aggiungere ogni record salvato alla tabella
    datiSalvati.forEach((utente, index) => {
        let riga = tabellaDati.insertRow();
        riga.insertCell(0).innerHTML = index + 1; // Numero riga
        riga.insertCell(1).innerHTML = utente.nome;
        riga.insertCell(2).innerHTML = utente.cognome;
        riga.insertCell(3).innerHTML = utente.citta;
        riga.insertCell(4).innerHTML = utente.indirizzo;
        riga.insertCell(5).innerHTML = utente.email;
    });
}
