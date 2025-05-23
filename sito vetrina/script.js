let prodotti = [];

async function caricaDati() {
  try {
    const response = await fetch("dati.json");
    prodotti = await response.json();
    mostraProdotti();
  } catch (error) {
    console.error("Errore nel caricamento del JSON:", error);
  }
}

function mostraProdotti() {
  document.getElementById("titolo").innerHTML = "Telefoni disponibili";
  const contenitore = document.getElementById("contenitore");
  contenitore.innerHTML = "";

  for (let i = 0; i < prodotti.length; i++) {
    const prodotto = prodotti[i];

    const link = document.createElement("a");
    link.href = `dettaglio.html?index=${i}`;
    link.style.textDecoration = "none";

    const card = document.createElement("div");
    card.className = "scheda";

    const nome = document.createElement("h2");
    nome.innerHTML = prodotto.nome;

    const prezzo = document.createElement("p");
    prezzo.innerHTML = "Prezzo: €" + prodotto.prezzo;

    const img = document.createElement("img");
    img.src = prodotto.immagine;
    img.alt = prodotto.nome;
    img.width = 200;

    const specs = document.createElement("ul");
    for (let chiave in prodotto.specifiche) {
      const li = document.createElement("li");
      li.innerHTML = `${chiave}: ${prodotto.specifiche[chiave]}`;
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
  const params = new URLSearchParams(window.location.search);
  const index = parseInt(params.get("index"));

  if (isNaN(index)) {
    document.getElementById("nome-prodotto").textContent = "Prodotto non trovato";
    return;
  }

  fetch("dati.json")
    .then((response) => response.json())
    .then((prodotti) => {
      const prodotto = prodotti[index];
      if (!prodotto) {
        document.getElementById("nome-prodotto").textContent = "Prodotto non trovato";
        return;
      }

      document.getElementById("immagine").src = prodotto.immagine;
      document.getElementById("immagine").alt = prodotto.nome;
      document.getElementById("nome-prodotto").textContent = prodotto.nome;
      document.getElementById("prezzo-prodotto").textContent = "Prezzo: €" + prodotto.prezzo;

      const specificheList = document.getElementById("specifiche-prodotto");
      specificheList.innerHTML = "";
      for (let chiave in prodotto.specifiche) {
        const li = document.createElement("li");
        li.textContent = `${chiave}: ${prodotto.specifiche[chiave]}`;
        specificheList.appendChild(li);
      }


      document.getElementById("aggiungi-carrello").addEventListener("click", () => {
        aggiungiCarrello({
          modello: prodotto.nome,
          marca: prodotto.marca || "N/A",
          prezzo: "€" + prodotto.prezzo
        });
      });
    })
    .catch((error) => {
      console.error("Errore nel caricamento del JSON:", error);
    });
}


function aggiungiCarrello(prodotto) {
  let carrello = JSON.parse(localStorage.getItem("carrello")) || [];
  carrello.push(prodotto);
  localStorage.setItem("carrello", JSON.stringify(carrello));
  alert(prodotto.modello + " è stato aggiunto al carrello!");
}


function mostraCarrello() {
  let tot = 0;
  const tab = document.getElementById("tabella").getElementsByTagName("tbody")[0];
  tab.innerHTML = "";

  const carrello = JSON.parse(localStorage.getItem("carrello")) || [];

  if (carrello.length === 0) {
    const riga = tab.insertRow();
    const cella = riga.insertCell(0);
    cella.innerHTML = "Il carrello è vuoto.";
    cella.colSpan = 3;
    cella.classList.add("text-center");
    return;
  }

  for (let i = 0; i < carrello.length; i++) {
    const prodotto = carrello[i];
    const riga = tab.insertRow();
    let prezzo = parseFloat(prodotto.prezzo.replace("€", "").trim());
    tot += prezzo;

    const cellaIndice = riga.insertCell(0);
    cellaIndice.textContent = i + 1;

    const cellaModello = riga.insertCell(1);
    cellaModello.textContent = prodotto.modello;

    const cellaPrezzo = riga.insertCell(2);
    cellaPrezzo.textContent = prodotto.prezzo;
  }

  localStorage.setItem("prezzoTOT", tot);
  document.getElementById("totale").innerHTML = "Il prezzo totale è: " + tot + "€";
}


async function generaRicevuta() {
  let totale = localStorage.getItem("prezzoTOT");
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const carrello = JSON.parse(localStorage.getItem("carrello")) || [];

  doc.setFontSize(16);
  doc.text("Grazie per aver comprato su Passione Computer!", 20, 10);
  doc.setFontSize(12);
  let y = 20;

  carrello.forEach(prodotto => {
    doc.text(` ${prodotto.modello} - ${prodotto.marca} - ${prodotto.prezzo}`, 20, y);
    y += 10;
  });

  doc.setFontSize(16);
  doc.text(`Totale: ${totale}€`, 20, y + 10);

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
