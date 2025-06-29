// alert("Sie haben noch nicht Ihre persönliche Diabetes-Einstellung eingegeben. \nNach Speichern Ihrer Eingaben startet das Programm mit Ihren Daten.");

var bzslider = document.getElementById("bzRange"); // Schieber BZ
var khslider = document.getElementById("khRange"); // Schieber Kohlenhydrate
var bzzahl = document.getElementById('demoBZ');  //Zahl des Schiebervalue BZ
var khzahl = document.getElementById('demoKH');  //Zahl des Schiebervalue KH
bzzahl.innerHTML = bzslider.value;
khzahl.innerHTML = khslider.value;


// Überprüfen, ob die Webseite geladen wurde
document.addEventListener("DOMContentLoaded", function () {
    if ('indexedDB' in window) {
        var request = window.indexedDB.open('Bolusrechner-mmol');

        request.onupgradeneeded = function (event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore('settings', { keyPath: 'id', autoIncrement: true });

            // Hinzufügen von Indexen, falls benötigt
            objectStore.createIndex('BEFf', 'BEFf', { unique: false });
            objectStore.createIndex('BEFm', 'BEFm', { unique: false });
            objectStore.createIndex('BEFa', 'BEFa', { unique: false });
            objectStore.createIndex('BEFs', 'BEFs', { unique: false });
            objectStore.createIndex('KFf', 'KFf', { unique: false });
            objectStore.createIndex('KFm', 'KFm', { unique: false });
            objectStore.createIndex('KFa', 'KFa', { unique: false });
            objectStore.createIndex('KFs', 'KFs', { unique: false });
            objectStore.createIndex('ZBZf', 'ZBZf', { unique: false });
            objectStore.createIndex('ZBZm', 'ZBZm', { unique: false });
            objectStore.createIndex('ZBZa', 'ZBZa', { unique: false });
            objectStore.createIndex('ZBZs', 'ZBZs', { unique: false });
            objectStore.createIndex('Iwirk', 'Iwirk', { unique: false });
            objectStore.createIndex('by_timestamp', 'timestamp', { unique: false });
            objectStore.createIndex('TotalIf', 'TotalIf', { unique: false });
            objectStore.createIndex('TotalIm', 'TotalIm', { unique: false });
            objectStore.createIndex('TotalIa', 'TotalIa', { unique: false });
            objectStore.createIndex('TotalIs', 'TotalIs', { unique: false });
        };


        request.onsuccess = function (event) {
            var db = event.target.result;

            if (db.objectStoreNames.contains('settings')) {
                var transaction = db.transaction(['settings'], 'readwrite');
                var objectStore = transaction.objectStore('settings');

                // Abrufen der gespeicherten Werte aus der indexedDB und in die entsprechenden Felder eintragen
                var getRequest = objectStore.get('unique_key');

                getRequest.onsuccess = function (event) {
                    var settings = event.target.result;

                    if (settings) {
                        document.getElementById('BEFf').value = settings.BEFf;
                        document.getElementById('BEFm').value = settings.BEFm;
                        document.getElementById('BEFa').value = settings.BEFa;
                        document.getElementById('BEFs').value = settings.BEFs;
                        document.getElementById('KFf').value = settings.KFf;
                        document.getElementById('KFm').value = settings.KFm;
                        document.getElementById('KFa').value = settings.KFa;
                        document.getElementById('KFs').value = settings.KFs;
                        document.getElementById('ZBZf').value = settings.ZBZf;
                        document.getElementById('ZBZm').value = settings.ZBZm;
                        document.getElementById('ZBZa').value = settings.ZBZa;
                        document.getElementById('ZBZs').value = settings.ZBZs;
                        document.getElementById('Iwirk').value = settings.Iwirk;
                   } else {
                        // Default-Werte eintragen, wenn keine Daten in der indexedDB vorhanden sind
                        document.getElementById('BEFf').value = '0.5';
                        document.getElementById('BEFm').value = '0.5';
                        document.getElementById('BEFa').value = '0.5';
                        document.getElementById('BEFs').value = '0.5';
                        document.getElementById('KFf').value = '2';
                        document.getElementById('KFm').value = '2';
                        document.getElementById('KFa').value = '2';
                        document.getElementById('KFs').value = '2';
                        document.getElementById('ZBZf').value = '6';
                        document.getElementById('ZBZm').value = '6';
                        document.getElementById('ZBZa').value = '6';
                        document.getElementById('ZBZs').value = '6';
                        document.getElementById('Iwirk').value = '3.5';
                        alert("Sie haben noch nicht Ihre persönliche Diabetes-Einstellung eingegeben. \nNach Speichern Ihrer Eingaben startet das Programm mit Ihren Daten.");
                    }
                };
            } else {
                // Default-Werte eintragen, wenn der Objektstore 'settings' nicht existiert
                document.getElementById('BEFf').value = '0.5';
                document.getElementById('BEFm').value = '0.5';
                document.getElementById('BEFa').value = '0.5';
                document.getElementById('BEFs').value = '0.5';
                document.getElementById('KFf').value = '2';
                document.getElementById('KFm').value = '2';
                document.getElementById('KFa').value = '2';
                document.getElementById('KFs').value = '2';
                document.getElementById('ZBZf').value = '6';
                document.getElementById('ZBZm').value = '6';
                document.getElementById('ZBZa').value = '6';
                document.getElementById('ZBZs').value = '6';
                document.getElementById('Iwirk').value = '3.5';
                alert("Sie haben noch nicht Ihre persönliche Diabetes-Einstellung eingegeben. \nNach Speichern Ihrer Eingaben startet das Programm mit Ihren Daten.");
            }

            db.close();
        };
    }

   // allesberechnen();
});

// Funktion zum Speichern der Werte in der indexedDB
function saveSettings() {
    var BEFfValue = document.getElementById('BEFf').value;
    var BEFmValue = document.getElementById('BEFm').value;
    var BEFaValue = document.getElementById('BEFa').value;
    var BEFsValue = document.getElementById('BEFs').value;
    var KFfValue = document.getElementById('KFf').value;
    var KFmValue = document.getElementById('KFm').value;
    var KFaValue = document.getElementById('KFa').value;
    var KFsValue = document.getElementById('KFs').value;
    var ZBZfValue = document.getElementById('ZBZf').value;
    var ZBZmValue = document.getElementById('ZBZm').value;
    var ZBZaValue = document.getElementById('ZBZa').value;
    var ZBZsValue = document.getElementById('ZBZs').value;
    var IwirkValue = document.getElementById('Iwirk').value;

    if ('indexedDB' in window) {
        var request = window.indexedDB.open('Bolusrechner-mmol');

        request.onsuccess = function (event) {
            var db = event.target.result;

            var transaction = db.transaction(['settings'], 'readwrite');
            var objectStore = transaction.objectStore('settings');

            // Erzeuge ein Objekt mit einem eindeutigen Schlüssel und den zu speichernden Werten
            var data = {
                id: 'unique_key', // Beispiel für einen eindeutigen Schlüssel
                BEFf: BEFfValue,
                BEFm: BEFmValue,
                BEFa: BEFaValue,
                BEFs: BEFsValue,
                KFf: KFfValue,
                KFm: KFmValue,
                KFa: KFaValue,
                KFs: KFsValue,
                ZBZf: ZBZfValue,
                ZBZm: ZBZmValue,
                ZBZa: ZBZaValue,
                ZBZs: ZBZsValue,
                Iwirk: IwirkValue

            };

            // Speichern der Werte in der indexedDB
            var putRequest = objectStore.put(data);

            putRequest.onsuccess = function (event) {
                console.log('Daten erfolgreich gespeichert.');
            };

            putRequest.onerror = function (event) {
                console.error('Fehler beim Speichern der Daten:', event.target.error);
            };

            db.close();
        };
    }
    // Seite neu laden
    location.reload();

}


// Funktion zum Löschen der indexedDB
function deleteSettings() {
    if ('indexedDB' in window) {
        var request = window.indexedDB.deleteDatabase('Bolusrechner-mmol');

        request.onsuccess = function () {
            // Erfolgreich gelöscht
        };

        request.onerror = function () {
            // Fehler beim Löschen
        };
    }
    alert("Sie haben Ihre persönliche Diabetes-Einstellung erfolgreich gelöscht. \nUm mit Ihren Einstellungen zu arbeiten, speichern Sie diese bitte erneut.");
}



// Einstellung BE-Faktor
// function BEFfp() { changeValue('BEFf', '+', 0.1, false); }
function BEFfp() { document.getElementById('BEFf').value = (parseFloat(document.getElementById('BEFf').value) + 0.1).toFixed(1); }
function BEFfm() { document.getElementById('BEFf').value = (parseFloat(document.getElementById('BEFf').value) - 0.1).toFixed(1); }
function BEFmp() { document.getElementById('BEFm').value = (parseFloat(document.getElementById('BEFm').value) + 0.1).toFixed(1); }
function BEFmm() { document.getElementById('BEFm').value = (parseFloat(document.getElementById('BEFm').value) - 0.1).toFixed(1); }
function BEFap() { document.getElementById('BEFa').value = (parseFloat(document.getElementById('BEFa').value) + 0.1).toFixed(1); }
function BEFam() { document.getElementById('BEFa').value = (parseFloat(document.getElementById('BEFa').value) - 0.1).toFixed(1); }
function BEFsp() { document.getElementById('BEFs').value = (parseFloat(document.getElementById('BEFs').value) + 0.1).toFixed(1); }
function BEFsm() { document.getElementById('BEFs').value = (parseFloat(document.getElementById('BEFs').value) - 0.1).toFixed(1); }


// Einstellung Korrekturfaktor
function KFfp() { document.getElementById('KFf').value = (parseFloat(document.getElementById('KFf').value) + 0.1).toFixed(1); }
function KFfm() { document.getElementById('KFf').value = (parseFloat(document.getElementById('KFf').value) - 0.1).toFixed(1); }
function KFmp() { document.getElementById('KFm').value = (parseFloat(document.getElementById('KFm').value) + 0.1).toFixed(1); }
function KFmm() { document.getElementById('KFm').value = (parseFloat(document.getElementById('KFm').value) - 0.1).toFixed(1); }
function KFap() { document.getElementById('KFa').value = (parseFloat(document.getElementById('KFa').value) + 0.1).toFixed(1); }
function KFam() { document.getElementById('KFa').value = (parseFloat(document.getElementById('KFa').value) - 0.1).toFixed(1); }
function KFsp() { document.getElementById('KFs').value = (parseFloat(document.getElementById('KFs').value) + 0.1).toFixed(1); }
function KFsm() { document.getElementById('KFs').value = (parseFloat(document.getElementById('KFs').value) - 0.1).toFixed(1); }

// Einstellung Ziel-BZ
function ZBZfp() { document.getElementById('ZBZf').value = (parseFloat(document.getElementById('ZBZf').value) + 0.1).toFixed(1); }
function ZBZfm() { document.getElementById('ZBZf').value = (parseFloat(document.getElementById('ZBZf').value) - 0.1).toFixed(1); }
function ZBZmp() { document.getElementById('ZBZm').value = (parseFloat(document.getElementById('ZBZm').value) + 0.1).toFixed(1); }
function ZBZmm() { document.getElementById('ZBZm').value = (parseFloat(document.getElementById('ZBZm').value) - 0.1).toFixed(1); }
function ZBZap() { document.getElementById('ZBZa').value = (parseFloat(document.getElementById('ZBZa').value) + 0.1).toFixed(1); }
function ZBZam() { document.getElementById('ZBZa').value = (parseFloat(document.getElementById('ZBZa').value) - 0.1).toFixed(1); }
function ZBZsp() { document.getElementById('ZBZs').value = (parseFloat(document.getElementById('ZBZs').value) + 0.1).toFixed(1); }
function ZBZsm() { document.getElementById('ZBZs').value = (parseFloat(document.getElementById('ZBZs').value) - 0.1).toFixed(1); }


//Einstellung Insulin-Wirkdauer
function Iwirkp() { document.getElementById('Iwirk').value = (parseFloat(document.getElementById('Iwirk').value) + .5).toFixed(1); }
function Iwirkm() { document.getElementById('Iwirk').value = (parseFloat(document.getElementById('Iwirk').value) - .5).toFixed(1); Iwirksave() }
function Iwirksave() {if (document.getElementById('Iwirk').value < 0.5) document.getElementById('Iwirk').value = 0.5; }


function allesberechnen() {
    bzzahl.innerHTML = bzslider.value;
    khzahl.innerHTML = khslider.value;
    var khes = (khslider.value / 10).toFixed(1);
    var bes = (khslider.value / 12).toFixed(1);
    document.getElementById('khes').innerHTML = khes;  // BE-Insulin früh
    document.getElementById('bes').innerHTML = bes;  // BE-Insulin früh

    var KFf = document.getElementById('KFf').value;
    var KFm = document.getElementById('KFm').value;
    var KFa = document.getElementById('KFa').value;
    var KFs = document.getElementById('KFs').value;

    var ZBZf = document.getElementById('ZBZf').value;
    var ZBZm = document.getElementById('ZBZm').value;
    var ZBZa = document.getElementById('ZBZa').value;
    var ZBZs = document.getElementById('ZBZs').value;

    var KInsf = ((bzslider.value - ZBZf) / KFf).toFixed(1); //K-Faktor früh
    var KInsm = ((bzslider.value - ZBZm) / KFm).toFixed(1); //K-Faktor mittags
    var KInsa = ((bzslider.value - ZBZa) / KFa).toFixed(1); //K-Faktor abends
    var KInss = ((bzslider.value - ZBZs) / KFs).toFixed(1); //K-Faktor spät
    document.getElementById('eKIf').innerHTML = KInsf; //K-Insulin früh
    document.getElementById('eKIm').innerHTML = KInsm; //K-Insulin mittags
    document.getElementById('eKIa').innerHTML = KInsa; //K-Insulin abends
    document.getElementById('eKIs').innerHTML = KInss; //K-Insulin spät


    var BEFf = document.getElementById('BEFf').value;
    var BEFm = document.getElementById('BEFm').value;
    var BEFa = document.getElementById('BEFa').value;
    var BEFs = document.getElementById('BEFs').value;

    var BEInsf = ((khslider.value * BEFf) / 10).toFixed(1);  // BE-Insulin früh
    var BEInsm = ((khslider.value * BEFm) / 10).toFixed(1);  // BE-Insulin mittags
    var BEInsa = ((khslider.value * BEFa) / 10).toFixed(1);  // BE-Insulin abends
    var BEInss = ((khslider.value * BEFs) / 10).toFixed(1);  // BE-Insulin spät
    document.getElementById('BEIf').innerHTML = BEInsf;  // BE-Insulin früh
    document.getElementById('BEIm').innerHTML = BEInsm;  // BE-Insulin mittags
    document.getElementById('BEIa').innerHTML = BEInsa;  // BE-Insulin abends
    document.getElementById('BEIs').innerHTML = BEInss;  // BE-Insulin spät


    var Totalif = parseFloat(BEInsf) + parseFloat(KInsf);
    var Totalim = parseFloat(BEInsm) + parseFloat(KInsm);
    var Totalia = parseFloat(BEInsa) + parseFloat(KInsa);
    var Totalis = parseFloat(BEInss) + parseFloat(KInss);

    if (document.getElementById('sport').checked) {
        Totalif = Totalif * .5;
        Totalim = Totalim * .5;
        Totalia = Totalia * .5;
        Totalis = Totalis * .5;
    }

    document.getElementById('TotalIf').innerHTML = (Totalif).toFixed(1); //Total früh
    document.getElementById('TotalIm').innerHTML = (Totalim).toFixed(1); //Total mittags
    document.getElementById('TotalIa').innerHTML = (Totalia).toFixed(1); //Total abends
    document.getElementById('TotalIs').innerHTML = (Totalis).toFixed(1); //Total spät
}

function sportfarbe() {
    var sport = document.getElementById('sport');
    var label = document.querySelector('.sport-chk');

    if (sport.checked) {
        label.style.backgroundColor = '#248f8f';
        label.style.color = 'white';
    } else {
        label.style.backgroundColor = '#f2f2f2';
        label.style.color = '#333';
    }
    allesberechnen();
}

var details = document.querySelector('details');
var summary = document.getElementById('summary');

details.addEventListener('toggle', function () {
    if (details.open) {
        summary.innerHTML = '&#10006;'; // &#10006; für "✖" (X-Symbol)
    } else {
        summary.innerHTML = '&equiv;'; // &equiv; für das Menüsymbol ("≡")
    }
});


function aktivesInsulin() {
    if (document.getElementById('TotalIf').innerHTML == '') document.getElementById('TotalIf').innerHTML = 0;
    if (document.getElementById('TotalIm').innerHTML == '') document.getElementById('TotalIm').innerHTML = 0;
    if (document.getElementById('TotalIa').innerHTML == '') document.getElementById('TotalIa').innerHTML = 0;
    if (document.getElementById('TotalIs').innerHTML == '') document.getElementById('TotalIs').innerHTML = 0;

    var TotalIf = parseFloat(document.getElementById('TotalIf').innerHTML);
    var TotalIm = parseFloat(document.getElementById('TotalIm').innerHTML);
    var TotalIa = parseFloat(document.getElementById('TotalIa').innerHTML);
    var TotalIs = parseFloat(document.getElementById('TotalIs').innerHTML);

    if (document.getElementById('restIf').innerHTML !== '') TotalIf = TotalIf + parseFloat(document.getElementById('restIf').innerHTML);
    if (document.getElementById('restIm').innerHTML !== '') TotalIm = TotalIm + parseFloat(document.getElementById('restIm').innerHTML);
    if (document.getElementById('restIa').innerHTML !== '') TotalIa = TotalIa + parseFloat(document.getElementById('restIa').innerHTML);
    if (document.getElementById('restIs').innerHTML !== '') TotalIs = TotalIs + parseFloat(document.getElementById('restIs').innerHTML);




    var timestamp = new Date().getTime(); // Zeitstempel erzeugen

    if ('indexedDB' in window) {
        var request = window.indexedDB.open('Bolusrechner-mmol');

        request.onsuccess = function (event) {
            var db = event.target.result;

            var transaction = db.transaction(['settings'], 'readwrite');
            var objectStore = transaction.objectStore('settings');

            // Erzeuge ein Objekt mit einem Zeitstempel und den zu speichernden Werten
            var data = {
                timestamp: timestamp,
                TotalIf: TotalIf,
                TotalIm: TotalIm,
                TotalIa: TotalIa,
                TotalIs: TotalIs
            };

            // Speichern der Werte in der indexedDB
            var putRequest = objectStore.put(data);

            putRequest.onsuccess = function (event) {
                console.log('Insulin instance successfully saved.');
            };

            putRequest.onerror = function (event) {
                console.error('Error saving insulin instance:', event.target.error);
            };

            db.close();
        };
    }
}
function aktivesInsulinberechnen() {
    if ('indexedDB' in window) {
        var request = window.indexedDB.open('Bolusrechner-mmol');

        request.onsuccess = function (event) {
            var db = event.target.result;

            var transaction = db.transaction(['settings'], 'readonly');
            var objectStore = transaction.objectStore('settings');

            var currentTime = new Date().getTime(); // Aktuelle Zeit in Millisekunden

            objectStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;

                if (cursor) {
                    var insulinData = cursor.value;
                    var insulinTimestamp = insulinData.timestamp;

                    var timeDifference = (currentTime - insulinTimestamp) / (1000 * 60 * 60); // Differenz in Stunden

                    var TotalIf = insulinData.TotalIf;
                    var TotalIm = insulinData.TotalIm;
                    var TotalIa = insulinData.TotalIa;
                    var TotalIs = insulinData.TotalIs;

                    // Hier kannst du die timeDifference und die Insulinwerte weiterverarbeiten
                    // Zum Beispiel:
                    console.log('Time difference for entry:', timeDifference, 'hours');
                    console.log('TotalIf:', TotalIf, 'TotalIm:', TotalIm, 'TotalIa:', TotalIa, 'TotalIs:', TotalIs);
                    var Iwirkdauer = parseFloat(document.getElementById('Iwirk').value).toFixed(1);
                    var verbZeit = timeDifference / Iwirkdauer;
                    if (verbZeit <= 1) {
                        var restIf = (TotalIf - (TotalIf * verbZeit)).toFixed(1);
                        var restIm = (TotalIm - (TotalIm * verbZeit)).toFixed(1);
                        var restIa = (TotalIa - (TotalIa * verbZeit)).toFixed(1);
                        var restIs = (TotalIs - (TotalIs * verbZeit)).toFixed(1);
                        document.getElementById('aktIf').innerHTML = 'noch<br />' + restIf + ' IE aktiv';
                        document.getElementById('aktIm').innerHTML = 'noch<br />' + restIm + ' IE aktiv';
                        document.getElementById('aktIa').innerHTML = 'noch<br />' + restIa + ' IE aktiv';
                        document.getElementById('aktIs').innerHTML = 'noch<br />' + restIs + ' IE aktiv';
                        document.getElementById('restIf').innerHTML = restIf;
                        document.getElementById('restIm').innerHTML = restIm;
                        document.getElementById('restIa').innerHTML = restIa;
                        document.getElementById('restIs').innerHTML = restIs;
                    }

                    cursor.continue();
                } else {
                    // Alle Einträge in der IndexedDB wurden durchlaufen
                    db.close();
                }
            };
        };


    }
}
