/**
* Fichier générant la carte qui sera affichée montrant les différentes zones de numérotation en France, par types de zones
*/

// Initialisation des variables
var latitude = 46.49389;
var longitude = 2.602778;
var map = null;
var GeoSearchControl = window.GeoSearch.GeoSearchControl;
var OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;
var zLayer;
var zabLayer;
var zneLayer;
var info;
var control;

/**
* Fonction définissant la couleur qui est affectée à une zone particulière
* @param L'identifiant de la couleur concernée
*/
function getColor(id) {
  return id == 1 ? '#E41A1C' :
  id == 2 ? '#377EB8' :
  id == 3 ? '#4DAF4A' :
  id == 4 ? '#984EA3' :
  id == 5 ? '#FF7F00' :
  id == 6 ? '#FFFF33' :
  '#D8B2D8';
}

/**
* Fonction qui définit le style qui sera affiché en fonction d'une donnée particulière
* @param Le fichier GeoJson en entrée
*/
function style(feature) {
  return {
    fillColor: getColor(feature.properties.color_id),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

/*
* Foncion qui définit un listener pour lorsque la souris est sur une des couches
* @param Évènement
*/
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

/*
* Fonction qui définit ce qui se passe lorsque la souris quitte une des couches
* @param Évènement
*/
function resetHighlight(e) {
  zLayer.resetStyle(e.target);
  zabLayer.resetStyle(e.target);
  zneLayer.resetStyle(e.target);
  info.update();
}

/*
* Fonction qui va permettre de zoomer sur l'élément lorsqu'un clic est détecté sur ce dernier
* @param Évènement
*/
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

/**
* Fonction qui ajoute les listeners pour chaque couche de la carte
* @param Fonctionnalités
* @param Couches
*/
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    //click: zoomToFeature
  });
}

/**
* Fonction qui déplace des éléments au format HTML dans un nouveau parent
* @param Eléments à déplacer
* @param Le nouvel élément où l'élément "el" sera déplacé
*/
function setParent(el, newParent) {
  newParent.appendChild(el);
}

/**
* Fonction d'initialisation de la carte
*/
function initMap() {
  // Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
  map = L.map('map', {
    fullscreenControl: {
      pseudoFullscreen: false, // if true, fullscreen to page width and height
      position: 'topleft'
    }
  }).setView([latitude, longitude], 6);

  // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
  var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 1,
    maxZoom: 20
  });

  // On créé une URL dynamique au lieu de l'URL statique par défaut
  var hash = new L.Hash(map);

  // On lit les données contenues dans les fichiers geojson
  zLayer = new L.GeoJSON.AJAX("./Donnees/carte_z.json", {
    style: style,
    onEachFeature: onEachFeature
  });
  zabLayer = new L.GeoJSON.AJAX("./Donnees/carte_zab.json", {
    style: style,
    onEachFeature: onEachFeature
  });
  zneLayer = new L.GeoJSON.AJAX("./Donnees/carte_zne.json", {
    style: style,
    onEachFeature: onEachFeature
  });

  var overlayMaps = {
    "Zones géographiques (Z)": zLayer,
    "Zones de numérotation (ZAB)": zabLayer,
    "Zones de numérotation élémentaire (ZNE)": zneLayer
  };

  control = L.control.layers(overlayMaps, null, {
    collapsed: false
  }); // On ajoute les trois couches précédentes à la carte, en les rendant exclusives

  // On gère la géolocalisation de l'utilisateur
  var location = L.control.locate({
    position: 'topleft',
    setView: 'untilPanOrZoom',
    flyTo: false,
    cacheLocation: true,
    drawMarker: true,
    drawCircle: false,
    showPopup: false,
    keepCurrentZoomLevel: true
  });

  // On définit le fournisseur sur lequel on va s'appuyer pour effectuer les recherches d'adresse
  var provider = new OpenStreetMapProvider({
    params: {
      countrycodes: 'fr'
    }, // On restreint uniquement les recherches pour la France
  });

  // On définit le module de recherche
  var searchControl = new GeoSearchControl({
    provider: provider,
    showMarker: true,
    showPopup: false,
    marker: {
      icon: new L.Icon.Default,
      draggable: false,
      interactive: false
    },
    maxMarkers: 1,
    retainZoomLevel: true,
    animateZoom: true,
    autoClose: true,
    searchLabel: "Entrez l'adresse",
    keepResult: true
  });

  info = L.control();

  /**
  * On ajoute les informations à la carte
  * @param la carte où les informations seront ajoutées
  */
  info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // On créé une section avec la classe info
    this.update();
    return this._div;
  }

  /**
  * Fonction qui met à jour les informations en fonction des propriétés passées
  * @param Propriétés
  */
  info.update = function(props) {
    this._div.innerHTML = '<h4>Zone de numérotation</h4>' + (props ?
      '<b>' + props.DECOUPAGE : '<br />');
    };

    // On définit l'export de la carte au format .png
    var exporter = L.easyPrint({
      sizeModes: ['Current'],
      title: 'Exporter',
      filename: 'CarteZNE',
      exportOnly: true,
      hideControlContainer: false,
      hideClasses: ['leaflet-control-zoom','leaflet-control-fullscreen','leaflet-control-easyPrint','leaflet-control-easyPrint-button','leaflet-control-locate','leaflet-control-geosearch','info']
    });

    // On définit l'impression de la carte
    var printer = L.easyPrint({
      sizeModes: ['Current'],
      title: 'Imprimer',
      filename: 'CarteZNE',
      exportOnly: false,
      hideControlContainer: false,
      hideClasses: ['leaflet-control-zoom','leaflet-control-fullscreen','leaflet-control-easyPrint','leaflet-control-easyPrint-button','leaflet-control-locate','leaflet-control-geosearch','info']
    });

    // On ajoute toutes les couches à la carte
    control.addTo(map);
    osmLayer.addTo(map);
    zLayer.addTo(map);
    map.addControl(searchControl);
    location.addTo(map);
    info.addTo(map);
    exporter.addTo(map);
    printer.addTo(map);

    // On met les boutons radio servant à contrôler la carte qui sera affichée en dehors de la carte
    var htmlObject = control.getContainer();
    var a = document.getElementById('control');
    setParent(htmlObject, a);

    // On change l'endroit où s'affiche les boutons radio lorsque l'utilisateur passe en plein écran
    map.on('fullscreenchange', function() {
      if (map.isFullscreen()) {
        control.addTo(map);
      } else {
        htmlObject = control.getContainer();
        setParent(htmlObject, a);
      }
    });

  }

  /**
  * Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
  */
  window.onload = function() {
    initMap();
  };
