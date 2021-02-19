# Pixelleap
  
[Pages-Version](https://johannschulenburg.github.io/PixelLeap/) (doesnt work)  
[Repository](https://github.com/JohannSchulenburg/PixelLeap)  
[Designdokument](https://github.com/JohannSchulenburg/PixelLeap/blob/main/documents/Designdokument.pdf)  
[Code](https://github.com/johannschulenburg/PixelLeap/tree/main/typescript)  
[Download as zip](https://github.com/JohannSchulenburg/PixelLeap/archive/main.zip)  
  
## About the game
  
the game is a heavily [DoodleJump](https://play.google.com/store/apps/details?id=com.lima.doodlejump&hl=en&gl=us) inspired game built with the learning 3D-Engine [Fudge](https://github.com/JirkaDellOro/FUDGE) within the class "Prototyping of interactive Media-Applications and Games". Try to reach the highest possible score; but dont fall, because there will be less and less platforms to depend on!

  
## Controls
  
Left:   <kbd>A</kbd> or <kbd>Left Arrow</kbd>
Right:  <kbd>D</kbd> or <kbd>Right Arrow</kbd>  

  
## Installation

Clone the repo and start the index.html in a Live-Server.
  
## Anforderungstabelle

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 |
|    | Name                  |
|    | Matrikelnummer        |
|  1 | Nutzerinteraktion     | Der Spieler kann den Würfel auf der horizontalen Achse nach links und rechts bewegen. Auf den Seiten rechts und links kann er sich auf die jeweils andere Seite teleportieren.                                                                                                                                                 |
|  2 | Objektinteraktion     | Die Plattformen werden in jedem Frame abgefragt, ob sie mit dem Spieler colliden. Wenn dies passiert, setzen sie die "Fallgeschwindigkeit" des spielers ins positive, was dem Spieler wiederum einen Schub nach oben verpasst. Bei manchen Plattformen ist dieser größer als bei anderen.                                                                                                                                                                                  |
|  3 | Objektanzahl variabel | Immer wenn der Spieler einen neuen highscore erreicht werden neue Plattformen kreiert. Die Erzeugung findet statt, indem eine zufällige neue Plattformen-Klasse erstellt wird, diese in dem Array der Plattformen hinzugefügt wird und an die root angeschlossen wird. Erzeugung?                                                                                                                                                      |
|  4 | Szenenhierarchie      | Der Player und die Plattformen sind einzeln and die root angehangen, da diese nicht voneinander abhängig sind. Die Plattformen werden als child der root entfernt, wenn diese den unteren Rand unterschreiten.                                                                                                                                                          |
|  5 | Sound                 | Es wird ein Soundeffekt abgespielt immer, wenn der Spieler mit Plattformen kollidiert. Die Hintergrundmusik läuft in einer Schleife und sorgt für Spannung und ein Gefühl von Zeitdruck. Die Musik wirkt retro und passt zu einem Arcade Game .                                                            |
|  6 | GUI                   | Dem Spieler wird unter dem Canvas sein highscore angezeigt.                                                                                   |
|  7 | Externe Daten         |                                                                                  |
|  8 | Verhaltensklassen     | Die verschiedenen Klassen haben eigene Methoden, wie z.B. move, update und checkCollision. Einige Klassen mit individuellen Methoden sind z.B. PlatformCloud, PlatformMoving, GameObject.                                                                                          |
|  9 | Subklassen            | PlatformMoving und PlatformCloud erben von Platform, welche vom GameObject erbt. Der Player erbt von GameObject |
| 10 | Maße & Positionen     | Die Plattformen haben übliche Maße wie 5,1 und die Größen wirken angemessen.                                                               |
| 11 | Event-System          | Timer, Load und Loop werden mit dem Event-System geregelt.                                                                                                                                                                                |

## Abgabeformat
* Fasse die Konzeption als ein wohlformatiertes Designdokument in PDF zusammen!
* Platziere einen Link in der Readme-Datei deines PRIMA-Repositories auf Github auf die fertige und in Github-Pages lauffähige Anwendung.
* Platziere ebenso Links zu den Stellen in deinem Repository, an denen der Quellcode und das Designdokument zu finden sind.
* Stelle zudem auf diese Art dort auch ein gepacktes Archiv zur Verfügung, welches folgende Daten enthält
  * Das Designdokument 
  * Die Projektordner inklusive aller erforderlichen Dateien, also auch Bild- und Audiodaten
  * Eine kurze Anleitung zur Installation der Anwendung unter Berücksichtigung erforderlicher Dienste (z.B. Heroku, MongoDB etc.) 
  * Eine kurze Anleitung zur Interaktion mit der Anwendung

## GameZone
Wenn Du dein Spiel bei der Dauerausstellung "GameZone" am Tag der Medien sehen möchtest, ergänze folgendes  
* Einen Ordner mit zwei Screenshots der laufenden Applikation in den Größen 250x100 und 1920x400 pixel sowie ein Textdokument mit den Informationen:
* Titel
* Autor
* Jahr und Semester der Entwicklung (Sose, Wise)
* Studiensemester
* Lehrplansemester
* Studiengang
* Veranstaltung im Rahmen derer die Entwicklung durchgeführt wurde
* betreuender Dozent
* Genre des Spiels
* ggf. passende Tags/ Schlagwörter zu dem Spiel
* Untertitel (max 40 Zeichen), der Menschen zum Spielen animiert
* Kurzbeschreibung (max 250 Zeichen), die kurz erklärt wie zu spielen ist
* Erklärung, dass die Fakultät Digitale Medien die Anwendung bei Veranstaltungen, insbesondere am Tag der Medien, mit einem expliziten Verweis auf den Autor, vorführen darf.
