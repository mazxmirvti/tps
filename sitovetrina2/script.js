var prodotti = [];
var tuttiProdotti = [];
var marche = [];
var formatoCorrente = "json";

function caricaDati() {
  prodotti = [];
  tuttiProdotti = [];
  marche = [];
  caricaJSON();
  caricaXML();
  caricaCSV();
  setTimeout(mostraMarche, 500); // attende caricamento file
}

function caricaJSON() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "dati.json", false);
  xhr.send();
  if (xhr.status == 200) {
    var arr = JSON.parse(xhr.responseText);
    for (var i = 0; i < arr.length; i++) {
      tuttiProdotti.push(arr[i]);
      if (marche.indexOf(arr[i].marca) == -1) {
        marche.push(arr[i].marca);
      }
    }
  }
}

function caricaXML() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "dati.xml", false);
  xhr.send();
  if (xhr.status == 200) {
    var xml = xhr.responseXML;
    var items = xml.getElementsByTagName("prodotto");
    for (var i = 0; i < items.length; i++) {
      var p = {
        nome: items[i].getElementsByTagName("nome")[0].textContent,
        marca: items[i].getElementsByTagName("marca")[0].textContent,
        prezzo: items[i].getElementsByTagName("prezzo")[0].textContent,
        immagine: items[i].getElementsByTagName("immagine")[0].textContent,
        specifiche: {}
      };
      var specs = items[i].getElementsByTagName("specifica");
      for (var j = 0; j < specs.length; j++) {
        var chiave = specs[j].getAttribute("nome");
        var valore = specs[j].textContent;
        p.specifiche[chiave] = valore;
      }
      tuttiProdotti.push(p);
      if (marche.indexOf(p.marca) == -1) {
        marche.push(p.marca);
      }
    }
  }
}

function caricaCSV() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "dati.csv", false);
  xhr.send();
  if (xhr.status == 200) {
    var righe = xhr.responseText.split("\n");
    for (var i = 1; i < righe.length; i++) {
      var campi = righe[i].split(",");
      if (campi.length > 3) {
        var p = {
          nome: campi[0],
          marca: campi[1],
          prezzo: campi[2],
          immagine: campi[3],
          specifiche: {}
        };
        // eventuali specifiche extra
        for (var j = 4; j < campi.length; j++) {
          p.specifiche["Spec" + (j-3)] = campi[j];
        }
        tuttiProdotti.push(p);
        if (marche.indexOf(p.marca) == -1) {
          marche.push(p.marca);
        }
      }
    }
  }
}

function mostraMarche() {
  var contenitore = document.getElementById("contenitore");
  contenitore.innerHTML = "<h2>Scegli una marca:</h2>";
  // Bottone per tutte le marche
  var btnTutte = document.createElement("button");
  btnTutte.innerHTML = "Tutte le marche";
  btnTutte.onclick = function() {
    prodotti = tuttiProdotti.slice();
    mostraFiltri();
    mostraProdotti();
  };
  contenitore.appendChild(btnTutte);
  // Bottoni per ogni marca
  for (var i = 0; i < marche.length; i++) {
    var btn = document.createElement("button");
    btn.innerHTML = marche[i];
    btn.marca = marche[i];
    btn.onclick = function() {
      mostraProdottiMarca(this.marca);
      mostraFiltri();
    };
    contenitore.appendChild(btn);
  }
  mostraFiltri();
}

function mostraFiltri() {
  var contenitore = document.getElementById("contenitore");
  var divFiltri = document.getElementById("filtri");
  if (!divFiltri) {
    divFiltri = document.createElement("div");
    divFiltri.id = "filtri";
    contenitore.appendChild(divFiltri);
  }
  divFiltri.innerHTML = "<h3>Filtra per prezzo massimo:</h3>";
  var inputPrezzo = document.createElement("input");
  inputPrezzo.type = "number";
  inputPrezzo.id = "prezzoMax";
  inputPrezzo.placeholder = "Prezzo massimo";
  inputPrezzo.style.marginRight = "10px";
  divFiltri.appendChild(inputPrezzo);
  var btnFiltra = document.createElement("button");
  btnFiltra.innerHTML = "Applica filtro";
  btnFiltra.onclick = function() {
    applicaFiltro();
  };
  divFiltri.appendChild(btnFiltra);
}

function applicaFiltro() {
  var prezzoMax = document.getElementById("prezzoMax").value;
  var lista = prodotti.length > 0 ? prodotti : tuttiProdotti;
  var filtrati = [];
  for (var i = 0; i < lista.length; i++) {
    var prezzo = parseFloat(lista[i].prezzo);
    if (prezzoMax === "" || prezzo <= prezzoMax) {
      filtrati.push(lista[i]);
    }
  }
  prodotti = filtrati;
  mostraProdotti();
}

function mostraProdottiMarca(marca) {
  prodotti = [];
  for (var i = 0; i < tuttiProdotti.length; i++) {
    if (tuttiProdotti[i].marca == marca) {
      prodotti.push(tuttiProdotti[i]);
    }
  }
  mostraProdotti();
}

function mostraProdotti() {
  document.getElementById("titolo").innerHTML = "Prodotti disponibili";
  var contenitore = document.getElementById("contenitore");
  contenitore.innerHTML = "";
  for (var i = 0; i < prodotti.length; i++) {
    var prodotto = prodotti[i];
    // Creo un link alla pagina dettaglio
    var link = document.createElement("a");
    link.href = "dettaglio.html?index=" + tuttiProdotti.indexOf(prodotto);
    link.style.textDecoration = "none";
    var card = document.createElement("div");
    card.className = "scheda";
    var nome = document.createElement("h2");
    nome.innerHTML = prodotto.nome;
    var prezzo = document.createElement("p");
    prezzo.innerHTML = "Prezzo: €" + prodotto.prezzo;
    var img = document.createElement("img");
    img.src = prodotto.immagine;
    img.alt = prodotto.nome;
    img.width = 200;
    var specs = document.createElement("ul");
    for (var chiave in prodotto.specifiche) {
      var li = document.createElement("li");
      li.innerHTML = chiave + ": " + prodotto.specifiche[chiave];
      specs.appendChild(li);
    }
    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(prezzo);
    card.appendChild(specs);
    link.appendChild(card);
    contenitore.appendChild(link);
  }
}

function mostraDettaglioProdotto() {
  var params = new URLSearchParams(window.location.search);
  var index = parseInt(params.get("index"));

  if (isNaN(index)) {
    document.getElementById("nome-prodotto").textContent = "Prodotto non trovato";
    return;
  }

  // Carica tutti i prodotti da tutte le fonti
  var prodotti = [];
  var xhr1 = new XMLHttpRequest();
  xhr1.open("GET", "dati.json", false);
  xhr1.send();
  if (xhr1.status == 200) {
    var arr = JSON.parse(xhr1.responseText);
    for (var i = 0; i < arr.length; i++) {
      prodotti.push(arr[i]);
    }
  }
  var xhr2 = new XMLHttpRequest();
  xhr2.open("GET", "dati.xml", false);
  xhr2.send();
  if (xhr2.status == 200) {
    var xml = xhr2.responseXML;
    var items = xml.getElementsByTagName("prodotto");
    for (var i = 0; i < items.length; i++) {
      var p = {
        nome: items[i].getElementsByTagName("nome")[0].textContent,
        marca: items[i].getElementsByTagName("marca")[0].textContent,
        prezzo: items[i].getElementsByTagName("prezzo")[0].textContent,
        immagine: items[i].getElementsByTagName("immagine")[0].textContent,
        specifiche: {}
      };
      var specs = items[i].getElementsByTagName("specifica");
      for (var j = 0; j < specs.length; j++) {
        var chiave = specs[j].getAttribute("nome");
        var valore = specs[j].textContent;
        p.specifiche[chiave] = valore;
      }
      prodotti.push(p);
    }
  }
  var xhr3 = new XMLHttpRequest();
  xhr3.open("GET", "dati.csv", false);
  xhr3.send();
  if (xhr3.status == 200) {
    var righe = xhr3.responseText.split("\n");
    for (var i = 1; i < righe.length; i++) {
      var campi = righe[i].split(",");
      if (campi.length > 3) {
        var p = {
          nome: campi[0],
          marca: campi[1],
          prezzo: campi[2],
          immagine: campi[3],
          specifiche: {}
        };
        for (var j = 4; j < campi.length; j++) {
          p.specifiche["Spec" + (j-3)] = campi[j];
        }
        prodotti.push(p);
      }
    }
  }

  var prodotto = prodotti[index];
  if (!prodotto) {
    document.getElementById("nome-prodotto").textContent = "Prodotto non trovato";
    return;
  }

  document.getElementById("immagine").src = prodotto.immagine;
  document.getElementById("immagine").alt = prodotto.nome;
  document.getElementById("nome-prodotto").textContent = prodotto.nome;
  document.getElementById("prezzo-prodotto").textContent = "Prezzo: €" + prodotto.prezzo;

  var specificheList = document.getElementById("specifiche-prodotto");
  specificheList.innerHTML = "";
  for (var chiave in prodotto.specifiche) {
    var li = document.createElement("li");
    li.textContent = chiave + ": " + prodotto.specifiche[chiave];
    specificheList.appendChild(li);
  }

  document.getElementById("aggiungi-carrello").onclick = function() {
    aggiungiCarrello({
      modello: prodotto.nome,
      marca: prodotto.marca || "N/A",
      prezzo: "€" + prodotto.prezzo
    });
  };
}

function aggiungiCarrello(prodotto) {
  var carrello = JSON.parse(localStorage.getItem("carrello")) || [];
  carrello.push(prodotto);
  localStorage.setItem("carrello", JSON.stringify(carrello));
  alert(prodotto.modello + " è stato aggiunto al carrello!");
}

function mostraCarrello() {
  var tot = 0;
  var tab = document.getElementById("tabella").getElementsByTagName("tbody")[0];
  tab.innerHTML = "";

  var carrello = JSON.parse(localStorage.getItem("carrello")) || [];

  if (carrello.length === 0) {
    var riga = tab.insertRow();
    var cella = riga.insertCell(0);
    cella.innerHTML = "Il carrello è vuoto.";
    cella.colSpan = 3;
    cella.classList.add("text-center");
    return;
  }

  for (var i = 0; i < carrello.length; i++) {
    var prodotto = carrello[i];
    var riga = tab.insertRow();
    var prezzo = parseFloat(prodotto.prezzo.replace("€", "").trim());
    tot += prezzo;

    var cellaIndice = riga.insertCell(0);
    cellaIndice.textContent = i + 1;

    var cellaModello = riga.insertCell(1);
    cellaModello.textContent = prodotto.modello;

    var cellaPrezzo = riga.insertCell(2);
    cellaPrezzo.textContent = prodotto.prezzo;
  }

  localStorage.setItem("prezzoTOT", tot);
  document.getElementById("totale").innerHTML = "Il prezzo totale è: " + tot + "€";
}

function generaRicevuta() {
  var totale = localStorage.getItem("prezzoTOT");
  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF();

  var carrello = JSON.parse(localStorage.getItem("carrello")) || [];

  doc.setFontSize(16);
  doc.text("Grazie per aver comprato su Passione Computer!", 20, 10);
  doc.setFontSize(12);
  var y = 20;

  carrello.forEach(function(prodotto) {
    doc.text(" " + prodotto.modello + " - " + prodotto.marca + " - " + prodotto.prezzo, 20, y);
    y += 10;
  });

  doc.setFontSize(16);
  doc.text("Totale: " + totale + "€", 20, y + 10);

  doc.save("ricevuta.pdf");
}

if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  caricaDati();
}

if (window.location.pathname.endsWith("dettaglio.html")) {
  mostraDettaglioProdotto();
}

mostraCarrello();

function svuotaCarrello() {
  localStorage.removeItem("carrello");
  localStorage.removeItem("prezzoTOT");
  mostraCarrello();
}