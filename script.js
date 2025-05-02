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
  document.getElementById("titolo").innerHTML = "Computer disponibili";
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
    })
    .catch((error) => {
      console.error("Errore nel caricamento del JSON:", error);
    });
}

if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  caricaDati();
}

if (window.location.pathname.endsWith("dettaglio.html")) {
  mostraDettaglioProdotto();
}

