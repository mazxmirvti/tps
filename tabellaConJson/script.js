var datiJson = [];

function caricaDati() {
  var req = new XMLHttpRequest();
  req.open("GET", "data.json", true);
  req.send();
  req.onload = function() {
    datiJson = JSON.parse(req.responseText);
    popolaTabella(datiJson);
  };
}

document.addEventListener('DOMContentLoaded', caricaDati);

function popolaTabella(data) {
  var table = document.getElementById('tabella');
  if (!Array.isArray(data)) return;
  while (table.rows.length > 1) table.deleteRow(1);
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var row = table.insertRow(-1);
    row.className = 'row-animate';
    row.insertCell(0).textContent = item.nome || '';
    row.insertCell(1).textContent = item.cognome || '';
    row.insertCell(2).textContent = item.dataNascita || '';
  }
}

function filtraCognome() {
  var lettera = document.getElementById('lettera').value.toUpperCase();
  if (!lettera.match(/^[A-Z]$/)) {
    alert('Inserisci una sola lettera maiuscola.');
    return;
  }
  var filtrati = [];
  for (var i = 0; i < datiJson.length; i++) {
    var cognome = (datiJson[i].cognome || '').toUpperCase();
    if (cognome.startsWith(lettera)) filtrati.push(datiJson[i]);
  }
  popolaTabella(filtrati);
}

function resetTabella() {
  document.getElementById('lettera').value = '';
  popolaTabella(datiJson);
}

function mostraMaggiorenni2025() {
  var table = document.getElementById('tabella');
  while (table.rows.length > 1) table.deleteRow(1);
  var maggiorenni = [];
  for (var i = 0; i < datiJson.length; i++) {
    var item = datiJson[i];
    if (!item.dataNascita) continue;
    var annoNascita = parseInt(item.dataNascita.substring(0, 4));
    if ((2025 - annoNascita) >= 18) maggiorenni.push(item);
  }
  for (var j = 0; j < maggiorenni.length; j++) {
    var r = table.insertRow(-1);
    r.className = 'row-animate';
    r.insertCell(0).textContent = maggiorenni[j].nome || '';
    r.insertCell(1).textContent = maggiorenni[j].cognome || '';
    r.insertCell(2).textContent = maggiorenni[j].dataNascita || '';
  }
}