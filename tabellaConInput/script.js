
function stampa() {
    const nuovaRiga = [];
    var print=document.getElementById("Nome").value
    var print2=document.getElementById("Cognome").value  
    var print3=document.getElementById("Indirizzo").value  
    var print4=document.getElementById("Città").value  
    var print5=document.getElementById("Email").value
    nuovaRiga.push(print, print2, print3, print4, print5)
    
    var table = document.getElementById("tabella");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = nuovaRiga[0];
    cell2.innerHTML = nuovaRiga[1];
    cell3.innerHTML = nuovaRiga[2];
    cell4.innerHTML = nuovaRiga[3];
    cell5.innerHTML = nuovaRiga[4];
  }
