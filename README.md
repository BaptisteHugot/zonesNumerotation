> :warning: **Suite à la disparition des zones de numérotation élémentaires en France (décision de l'Arcep n°2019-0954), ces données ne sont plus valides. Ce projet est désormais archivé et laissé accessible uniquement pour la partie historique :wink:**

# zonesNumerotation
Ce programme affiche une carte montrant les différentes zones de numérotation en France, suivant trois niveaux distincts :
* Au niveau de la zone géographique (Z)
* Au niveau de la zone de numérotation (ZAB)
* Au niveau de la zone élémentaire de numérotation (ZNE)
<a/>
Les données sont basées sur les fichiers disponibles sur le site de l'[Arcep](https://extranet.arcep.fr/portail/Op%C3%A9rateursCE/Num%C3%A9rotation.aspx), le régulateur des communications électroniques en France.

## Exemple
Un exemple complet est disponible sur [ma page personnelle GitHub](https://baptistehugot.github.io/zonesNumerotation/), et un exemple de rendu de ces cartes au format .png est disponible ci-dessous.

<img src="https://user-images.githubusercontent.com/19981614/69440050-631ef100-0d48-11ea-9007-d773ea9c6960.png" width="30%"></img> <img src="https://user-images.githubusercontent.com/19981614/69440051-631ef100-0d48-11ea-8750-60e16768342b.png" width="30%"></img> <img src="https://user-images.githubusercontent.com/19981614/69440048-62865a80-0d48-11ea-928e-50ae165b94e7.png" width="30%"></img> 

## Ecrit avec
* [Javascript](https://www.ecma-international.org/publications/standards/Ecma-262.htm) - Le langage de programmation utilisé pour gérer la gestion de la carte et des bibliothèques
* [HTML](https://www.w3.org/html/) - Le langage de programmation utilisé pour afficher la page Internet
* [CSS](https://www.w3.org/Style/CSS/) - Le langage de programmation utilisé pour gérer les styles de la page Internet

## Bibliothèques utilisées
* [Leaflet](https://leafletjs.com/) - La bibliothèque utilisée pour afficher la carte
* [Leaflet-Ajax](https://github.com/calvinmetcalf/leaflet-ajax) - La bibliothèque utilisée pour gérer l'affichage des zones contenues dans le fichier GeoJson
* [Leaflet-Geosearch](https://github.com/smeijer/leaflet-geosearch) - La bibliothèque utilisée pour permettre la recherche par commune
* [Leaflet-Locatecontrol](https://github.com/domoritz/leaflet-locatecontrol) - La bibliothèque utilisée pour permettre la géolocalisation de l'utilisateur
* [Leaflet.fullscreen](https://github.com/Leaflet/Leaflet.fullscreen) - La bibliothèque utilisée pour afficher la carte en plein écran
* [Leaflet-Hash](https://github.com/mlevans/leaflet-hash) - La bibliothèque utilisée pour avoir une URL dynamique au lieu d'une URL statique par défaut
* [Leaflet-easyPrint](https://github.com/rowanwins/leaflet-easyPrint/) - La bibliothèque utilisée pour exporter la carte au format .png et pour l'imprimer

## Versions
[SemVer](http://semver.org/) est utilisé pour la gestion de versions. Pour connaître les versions disponibles, veuillez vous référer aux [étiquettes disponibles dans ce dépôt](https://github.com/BaptisteHugot/zonesNumerotation/releases/).

## Auteurs
* **Baptiste Hugot** - *Travail initial* - [BaptisteHugot](https://github.com/BaptisteHugot)

## Licence
Ce projet est disponible sous licence logiciel MIT. Veuillez lire le fichier [LICENSE](LICENSE) pour plus de détails.

## Règles de conduite
Pour connaître l'ensemble des règles de conduite à respecter sur ce dépôt, veuillez lire le fichier [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Contribution au projet
Si vous souhaitez contribuer au projet, que ce soit en corrigeant des bogues ou en proposant de nouvelles fonctionnalités, veuillez lire le fichier [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.
