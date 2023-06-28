# SERVER BACK-END PER OSPEDALE

Ci sono 2 parti distinte:

- una pubblica, visibile a tutti gli utenti che navigano sul sito;
- una privata, visibile solo a chi è autenticato e gestendo le pagine visibili a seconda dei
  ruoli (**_medici_** o **_infermieri/admin_** – **_pazienti/user_**).

## PROGETTO DAL PUNTO DI VISTA BACK-END

Il **_back-end_** in questa situazione deve riusice **_impeccabilmente_** a restituire tutto in necessario alle richieste del **_front-end_**, oltre a costruire un **_API REST_**
per gli **_admin_** dell'ospedale, dove possono gestire tutti i pazienti tramite **_GET POST PUT DELETE_**.

## LE AUTENTICAZIONI

Le **_autenticazioni_** sono delle semplici request al **_front-end_** che rimanda poi sarver i dati ideologicamente in questa forma:
code{ "username": foobar, "password": cripta("foobar") }code

Quindi il back-end si troverà a gestire un username in chiaro e una **_password già criprata_**.
Dopo il back-end ricripterà nuovamente la password e la salverà in **_database_** (nel nostro caso **_mysql_**)

## LE ROTTE DA CREARE

Essendo un progetto abbastanza formoso, è meglio fare un re-cap delle rotte che il **_front-end_** possa servire al **_client_**:

- /Home: la **_home_** è la pagina **_principale_**, la quale è composta da:
  -- presentazione dello studio;
  -- presentazione medici con immagine profilo e specializzazione;
  -- mappa della posizione dello studio (valutare Google Maps o OpenMaps);
  -- descrizione dei servizi offerti (visite, analisi ecc.)
- /Visite: composta da un **_presentazione dello studio_**;
  -- menù a tendina con vari tipi di visite che possono essere fatte dai medici dello studio.
  -- Ogni voce rimanda a una pagina di dettaglio dove si spiega in maniera dettagliata di che visita si tratta, quale sia il medico specializzato in quella visita
  -- un pulsante per eventualmente effettuare la prenotazione //che fa loggare l'utente.
- /orari: per ogni medico devono comparire i giorni della settimana con le fasce orarie disponibili;
- /contatti: **_inserire i dati generali dello studio_** (name, posizione, numero fisso, email di segreteria) e poi **_per ogni medico_** devono comparire i **_dati della p. iva, email e numero di telefono_**
- /login: non credo servano spiegazioni
- /register: anche qui autoesplicativo

### REQUESTS AL BACK-END

Le request al back-end arriveranno da parte delle seguenti rotte:

- /login:
  --**_requestForm_**:
  { "username": "foobar", "password": cripta("foobar") }
  --**_responseForm_**:
  Prima avviene un controllo di esistenza delle credenziali, dopo si verifica se l'email è confemata e se tutto è andato a buon fine restituisce: {"Token": "JWT"}
  altrimenti la risposta sarà: {}
  quindi il front-end avrà un codice del tipo:
  if(typeof rispostaDelBackEnd.token != "undefined"){
  send(rispostaDelBackEnd.token)
  }
  return "Credenziali sbagliate oppute email non confermata, ricontrolla tutto e riprova."
- /register
  --**_requestForm_**:
  {"name":"foobar","surname":"foobar","username":"foobar","email":"foobar","number":"foobar", "password": criptato("foobar"),"doctor":"foobar"}
  --**_responseForm_**:
  Se l'email e il doctor sono validi: {"isValidForm": "1"} //quindi è stato caricato sul database di pazienti, ed è in attesa di conferma tramite email (quindi accede makeId(64) a una porta differente)
  quando il client visita l'url, il back-end conferma l'email, cambiando il dato nel field:inConfirmed.
  altimenti:{"isValidForm": "0"}

## LE ROTTE AUTENTICATE

SUPER-ADMIN

- /personaleStudio: gestione dati dei medici/personale dello studio
  DOCTOR
- /prenotazioni: pagina di gestione delle prenotazioni per le visite e calendario per visualizzazione degli appuntamenti (valutare se mettere api Google calendar)
- /pazienti: gestione dati e schede mediche dei pazienti
  SEGRETERIA
- /prenotazioni: pagina di gestione delle prenotazioni per le visite e calendario per visualizzazione degli appuntamenti (valutare se mettere api Google calendar)
  USER
- /prenotazioni: calendario con gli appuntamenti

### REQUEST AL BACK-END

Il SUPER-ADMIN e i dottori e la segreteria avranno dei token "segreti" associati ad ogni account

req.body.user: makeId(64);
if(req.body.user is in decript(adminUsers)){
fai1();
}else if(req.body.user in decript(docUsers)){
fai2();
}else if(req.body.user in decript(segUsers)){
fai3();
}else{
fai4();
}

- /personaleStudio: a questa rotta può accedere solamente il SUPER-ADMIN, in questa pagina l'admin può tramite il front mandare:
  --**_requestsForms_**:per ogni azione nel body dovrà assere presente un "tokenAmm" per veriificare chi sta mandando le richieste.
  --GET-{"tokenAmm":"foo"}
  --GET-{"doctorName":"foo","tokenAmm":"foo"}
  --PUT-{"doctorName":"foo","toChange":"il campo","data":"foobar","tokenAmm":"foo"} che risponde lo status dell'azione
  --POST-{"doctorName":"foo","doctorSurname":"foo","doctorEmail":"foo","id":"foo","number":"foo","days":"foo","workTime":"H-H","tokenAmm": "foo"} dove il back-end prende il name, lo carica sul database, con affianco un makeId(64) criptato

- /pazienti: a questa rotta possono accederci solamente i dottori
  --**_requestsForms_**:per ogni azione nel body dovrà assere presente un "tokenAmm" per veriificare chi sta mandando le richieste.
  --GET-{"tokenAmm":"foo"}
  --GET-{"patientUsername":"foo","tokenAmm":"foo"}
  --PUT-{"patientUsername":"foo","toChange":"il campo","data":"foobar","tokenAmm":"foo"}

- /prenotazioni: a questa rotta possono accedervi sia i dottori che la segreteria
  --**_requestsForms_**:per ogni azione nel body dovrà assere presente un "tokenAmm" per veriificare chi sta mandando le richieste.
  --GET-{"tokenAmm":"foo"}
  --GET-{"patientUsername":"foo","tokenAmm":"foo"}
  --PUT-{"patientUsername":"foo","doctorName":"foo","description":"foobar","data":"GG MM AA H:M","tokenAmm":"foo"}
  --POST-{"patientUsername":"foo","toChange":"il campo","data":"foobar","tokenAmm":"foo"}
