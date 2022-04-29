

# LoR Library 2

## Abstract

Mein Projekt bezieht sich auf das Kartenspiel "Legends of Runeterra", spezifisch auf die Karten und Regionen des Spiels.
Dabei ähnelt das Projekt stark dem vorherigen Projekt, in dem wir eine statische Webseite erstellt haben.
Im Gegensatz zum letzten Projekt werden nun alle Daten dynamisch über meine eigene API aus dem Backend-Projekt geladen.
Dadurch werden alle Karten mit ihren Daten angezeigt und nicht nur ein Beispiel. 
Zusätzlich habe ich noch eine Suchfunktion für die Karten eingebaut bei der man sowohl nach Namen wie auch nach Region suchen kann.
Ausserdem kann man als eingeloggter Nutzer neue Karten erstellen oder bereits bestehende Karten entweder editieren oder löschen.
Auf der Startseite findet sich jeweils eine zufällige Auswahl an 4 Karten.

## Seiten

### Homepage

Auf der Homepage findet man einen kleinen Text, der kurz den Sinn der Webseite erklärt.
Ausserdem findet man 4 Karten, welche einem einen kleinen Anstoss geben sollen, die Karten etwas zu durchsuchen.
Bei Anklicken einer Karte wird man auf die Detail Seite dieser weitergeleitet.

### Karten 

Auf der Kartenseite werden alle Karten aufgelistet.
Da dies nicht viel Übersicht bietet gibt es zwei Suchleisten, welche einem ermöglichen nach Namen und Region zu suchen.
Wie auf der Homepage kann jede Karte angeklickt werden, um zu der Detail Seite zu gelangen.

### Detailansicht

Auf dieser Seite wird jeweils eine einzelne Karte dargestellt.
Man kann diese Karte dann als eingeloggter Nutzer bearbeiten oder löschen.
Die Seite ist bislang noch etwas karg, da ich nicht viele Informationen zum Darstellen.
Man könnte noch Sachen wie «Winrate» oder Ähnliches anzeigen.
Da ich auf diese Infos allerdings keinen Zugriff habe, habe ich die Seite sehr schlicht gehalten.

### Regionen

Auf der Seite der Regionen werden alle Regionen mit ihrem Motto und einem kurzen Text dargestellt.
Die Seite soll etwas mehr Inhalt bieten und den Nutzer etwas in die Hintergrundgeschichte des Spiels und den Regionen einführen.

### Erstellen

Hier können Karten selbst erstellt oder editiert werden. 
Ob erstellen oder editieren hängt von der Art ab wie man auf die Seite gelangt.
Über die Navigationsleiste gelangt man auf die Erstellseite und über die Detailseite auf die Bearbeitungsseite.
Dazu muss man allerdings eingeloggt sein.

## Design

Beim Design habe ich gegenüber dem letzten Projekt keine grossen Änderungen gemacht.
Das Stylen der Erstellseite war etwas Neues, aber auch da habe ich mich für ein simples Design entschieden.

### Responsiveness

Da bei diesem Projekt für mich das Einbinden meiner API-Daten im Fokus stand habe ich mich nicht von Anfang an auf das Design und damit auch auf die Responsiveness fokussiert.
Das musste ich dann gegen Ende noch etwas anpassen, was aber relativ gut ging.

## Testing

| Abschnitt           | Inhalt                                                                                               |
|---------------------|------------------------------------------------------------------------------------------------------|
| ID                  | T-01                                                                                                 |
| Vorbedingung        | Datenbank erstellt, API gestartet                                                                    |
| Ablauf              | Start auf der Hauptseite<br/> Die Seite entweder neu laden (F5) oder auf das Logo oben links klicken |
| Erwartetes Resultat | Es sollten 4 zufällige Karten angezeigt werden jedes mal wenn die Seite neu geladen wird.            |

| Abschnitt           | Inhalt                                                                                                                                                                                           |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID                  | T-02                                                                                                                                                                                             |
| Vorbedingung        | Datenbank erstellt, API gestartet                                                                                                                                                                |
| Ablauf              | In der Navigationsleiste auf "Cards" klicken.<br/> In der ersten Suchleiste "Dr" eingeben.<br/>In der zweiten Suchleiste "io" eingeben                                                           |
| Erwartetes Resultat | Zunächst sollten alle Karten angezeigt werden<br/>Nach der der ersten Sucheingabe sollten 9 Karten angezeigt werden<br/>Nach der zweiten Sucheingabe sollte nur noch eine Karte angezeigt werden |

| Abschnitt           | Inhalt                                                                                                                               |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| ID                  | T-03                                                                                                                                 |
| Vorbedingung        | Datenbank erstellt, API gestartet                                                                                                    |
| Ablauf              | In der Navigationsleiste auf "Create" klicken.<br/>Runterscrollen und auf den "Submit" Knopf drücken                                 |
| Erwartetes Resultat | Es sollten bei den Feldern "ID", "Name", "Type", "Rarity", "Region", "Picture 1" und "Picture 2" eine Fehlermeldung angezeigt werden |

## Fazit

Zu Beginn des Projektes habe ich hauptsächlich mit der Einbindung meiner API beschäftigt.
Da ich bereits zuvor einige Versuche damit gemacht habe ging dies relativ schnell.
Ich musste lediglich den "Access-Control-Allow-Origin" Header hinzufügen und die nötigen Methoden erlauben.

Nachdem ich meine Daten darstellen konnte, habe ich noch die Login-Funktionalität eingebaut, welche ich direkt aus der Vorlage entnommen habe.
Da meine Daten über meine API laufen und das Login über den JSON-Server halte ich die Lösung noch für etwas umständlich und seltsam.
Allerdings wollte ich bei meiner API nicht noch ein Login hinzufügen und habe mich mit dieser Lösung zufriedengegeben, auch wenn sie nicht optimal ist.

Daraufhin habe ich mich mit der Erstellseite auseinandergesetzt.
Die Seite liess sich sehr schnell erstellen, da es nicht mehr als ein Formular ist.
Ich musste allerdings bezüglich der Validierung einige Änderungen vornehmen, welche mich etwas mehr Zeit gekostet haben.
Auch das Stylen der Seite habe ich vor mir hergeschoben und erst am zweitletzten Tag umgesetzt.
Beim Abschicken des Formulars erscheint weiterhin ein Fehler, welcher sich auf das JSON bezieht.
Diesen konnte ich bisher nicht lösen und weiss auch nicht weshalb dieser auftritt, da das Erstellen und Editieren grundsätzlich funktioniert.

Das übrige erstellen und stylen der Seiten lief sehr gut, da ich mein letztes Projekt als Anhaltspunkt nutzen konnte.

Im Endeffekt bin ich mit meiner Seite sehr zufrieden, da ich das umgesetzt habe, was ich mir vorgenommen habe. Im Bestfall könnte man auf der Seite noch deutlich mehr umsetzen und verschiedenste Funktionen bezüglich Decks oder Ähnlichem darstellen, aber das würde für mich hier etwas den Rahmen sprengen.





