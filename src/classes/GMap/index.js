import GoogleMapsApi from './GoogleMapsApi';
import { stylers }   from './stylers';
import markerTmpl from './marker.tmpl';
import { DataSet } from './DataSet';
/*global google*/ 

/**
 * Location Map
 * Main map rendering function that uses our GMaps API class
 * @param {string} el - Google Map selector
 */
export function GMap(el, apiKey) {
    /*eslint-disable no-console */
    const gApiKey = apiKey;
    const gmapApi = new GoogleMapsApi(gApiKey);
    const mapEl   = document.querySelector(el);
    const data    = {
        lat:     parseFloat(mapEl.dataset.lat ? mapEl.dataset.lat : 0),
        lng:     parseFloat(mapEl.dataset.lng ? mapEl.dataset.lng : 0),
        address: mapEl.dataset.address,
        title:   mapEl.dataset.title ? mapEl.dataset.title: "Your location",
        zoom:    parseFloat(mapEl.dataset.zoom ? mapEl.dataset.zoom: 12),
        type:   mapEl.dataset.type ? mapEl.dataset.type : "user",
    };
    // Call map renderer
    gmapApi.load().then(() => {
        renderMap(mapEl, data);
    });
}

/**
 * Render Map
 * @param {map obj} mapEl - Google Map
 * @param {obj} data - map data
 */
function renderMap(mapEl, data) {

    const options = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles:    stylers.styles,
        zoom:      data.zoom,
        center:    {
            lat: data.lat,
            lng: data.lng
        }
    };

    const map = new google.maps.Map(mapEl, options);

    const mergedData = DataSet.concat(data);


    mergedData.forEach((mData) => {
        renderMarker(map, mData);
    });
        
    
}

/**
 * Render Marker
 * Renders custom map marker and infowindow
 * @param {map element} mapEl
 * @param {object} data
 */
function renderMarker(map, data) {
    /*eslint-disable no-console */

    

    const icon = {
        url:        (data.type === "user") ? stylers.icons.user : stylers.icons.doctor,
        scaledSize: (data.type === "user") ? new google.maps.Size(20, 20) : new google.maps.Size(30, 30)
    };
    
    



    const tmpl = markerTmpl(data);

    const marker = new google.maps.Marker({
        position:  new google.maps.LatLng(data.lat, data.lng),
        map:       map,
        icon:      icon,
        title:     data.title,
        content:   tmpl,
        animation: google.maps.Animation.DROP
    });

    const infowindow = new google.maps.InfoWindow();

    handleMarkerClick(map, marker, infowindow);
}

/**
 * Handle Marker Click
 *
 * @param {map obj} mapEl
 * @param {marker} marker
 * @param {infowindow} infoWindow
 */
function handleMarkerClick(map, marker, infowindow) {

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.content);
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(map, 'click', function() {
        if (infowindow) {
            infowindow.close(map, infowindow);
        }
    });
}
