let datiJson = [];
caricaDati();

function caricaDati() {
  const req = new XMLHttpRequest();
  req.open("GET", "data.json", true);
  req.send();
  req.onload = function() {
    datiJson = JSON.parse(req.responseText);
    popolaTabella(datiJson);
  };
}

function popolaTabella(data) {
  let tabella = document.getElementById('tabella');
  while (tabella.rows.length > 1) tabella.deleteRow(1);
  for (let i = 0; i < data.length; i++) {
    let elem = data[i];
    let row = tabella.insertRow(-1);
    row.className = 'row-animate';
    row.insertCell(0).textContent = elem.nome;
    row.insertCell(1).textContent = elem.cognome;
    row.insertCell(2).textContent = elem.dataNascita;
  }
}

function filtraCognome() {
  let lettera = document.getElementById('lettera').value.toUpperCase();
  let sgamati = [];
  for (let i = 0; i < datiJson.length; i++) {
    let cognome = (datiJson[i].cognome).toUpperCase();
    if (cognome.startsWith(lettera)) {
      sgamati.push(datiJson[i]);
    }
  }
  popolaTabella(sgamati);
}

function resetTabella() {
  document.getElementById('lettera').value = '';
  popolaTabella(datiJson);
}

function mostraMaggiorenni2025() {
  let tabella = document.getElementById('tabella');
  while (tabella.rows.length > 1) tabella.deleteRow(1);
  let maggiorenni = [];
  for (let i = 0; i < datiJson.length; i++) {
    let studenti = datiJson[i];
    let annoNascita = parseInt(studenti.dataNascita.substring(0, 4));
    if ((2025 - annoNascita) >= 18) maggiorenni.push(studenti);
  }
  popolaTabella(maggiorenni);
}




