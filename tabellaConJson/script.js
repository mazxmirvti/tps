var datiJson = [];
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
  var tabella = document.getElementById('tabella');
  while (tabella.rows.length > 1) tabella.deleteRow(1);
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var row = tabella.insertRow(-1);
    row.className = 'row-animate';
    row.insertCell(0).textContent = item.nome;
    row.insertCell(1).textContent = item.cognome;
    row.insertCell(2).textContent = item.dataNascita;
  }
}

function filtraCognome() {
  var lettera = document.getElementById('lettera').value.toUpperCase();
  var filtrati = [];
  for (var i = 0; i < datiJson.length; i++) {
    var cognome = (datiJson[i].cognome).toUpperCase();
    if (cognome.startsWith(lettera)) filtrati.push(datiJson[i]);
  }
  popolaTabella(filtrati);
}

function resetTabella() {
  document.getElementById('lettera').value = '';
  popolaTabella(datiJson);
}

function mostraMaggiorenni2025() {
  var tabella = document.getElementById('tabella');
  while (tabella.rows.length > 1) tabella.deleteRow(1);
  var maggiorenni = [];
  for (var i = 0; i < datiJson.length; i++) {
    var studenti = datiJson[i];
    var annoNascita = parseInt(studenti.dataNascita.substring(0, 4));
    if ((2025 - annoNascita) >= 18) maggiorenni.push(studenti);
  }
  for (var j = 0; j < maggiorenni.length; j++) {
    var r = tabella.insertRow(-1);
    r.className = 'row-animate';
    r.insertCell(0).textContent = maggiorenni[j].nome;
    r.insertCell(1).textContent = maggiorenni[j].cognome;
    r.insertCell(2).textContent = maggiorenni[j].dataNascita;
  }
}

