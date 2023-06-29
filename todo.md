# TODO

- [x] implemenentare **_l'util makeID(64)_**
- [x] implementare **_/auth/login_** Simo
- [x] implementa l'assegnazione **_token temporaneo JWT_** Chri
- [x] implementare il controllo **_middleware JWT_** Chri
- [x] implementare un **_mailValidator_** Chri
- [x] implementare **_sendEmail_** con **_nodemailer_** (usando **_mailValidator_**) Simo
- [x] implementare **_/auth/register_** Simo
- [x] implementare protocollo **_/auth/resetPassword_** Simo
- [x] implementare protocollo **_/auth/forgottenPassword_** Simo
- [x] creare **_tabella dottori/segreteria_** Chri
- [x] aggiornare **_prisma ORM_** Chri
- [x] middleware **_controllo tokenAmm_** (per controllare i ruoli delle pagine) Chri
- [x] creare **_tabella pazienti_** Chri
- [x] aggiornare **_prisma ORM_** Chri
- [x] implementare i **_metodi di /personaleStudio_** (SUPER-AMDIN) Simo
- [x] implementare i **_metodi di /pazienti_** (doctors) Chri
- [x] creare **_tabella prenotazioni_** Chri
- [x] aggiornare **_prisma ORM_**
- [x] implementare i **_metodi di /prenotazioni_** Simo
- [ ] criptare i dati nelle tabelle del database: i dati sensibili
- [ ] ottenere i log di tutti le azioni nel back-end e database

## Dati prenotazioni

Id INT AUTO_INCREMENT PRIMARY KEY,
StartTime DATETIME,
EndTime DATETIME,
PatientUsername VARCHAR(50),
PatientNumber VARCHAR(50),
DoctorUsername VARCHAR(50)

## Dati dottori

Id INT AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(50),
Surname VARCHAR(50),
Email VARCHAR(100),
Username VARCHAR(50),
Password VARCHAR(50),
Number VARCHAR(20),
Doctor VARCHAR(50),
TokenAmm VARCHAR(255),
IsEnable TINYINT(1)

## Dati segreteria

Id INT AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(50),
Surname VARCHAR(50),
Email VARCHAR(100),
Username VARCHAR(50),
Password VARCHAR(50),
Number VARCHAR(20),
TokenAmm VARCHAR(255),
IsEnable TINYINT(1)

## Dati pazienti

Id INT AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(50),
Surname VARCHAR(50),
Email VARCHAR(100),
Username VARCHAR(50),
Password VARCHAR(50),
Number VARCHAR(20),
Doctor VARCHAR(50),
EmailConfirmed TINYINT(1),
DoctorConfirmed TINYINT(1),
IsEnable TINYINT(1)
