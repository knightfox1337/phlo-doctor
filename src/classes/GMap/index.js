import GoogleMapsApi from './GoogleMapsApi';
import { stylers }   from './stylers';
import markerTmpl from './marker.tmpl';
import { DataSet } from './DataSet';
import MicroModal from 'micromodal';

let activeWindows = [];

/*global google*/ 

/**
 * Location Map
 * Main map rendering function that uses our GMaps API class
 * @param {string} el - Google Map selector
 */
export function GMap(el, apiKey) {

    const gApiKey = apiKey;
    const gmapApi = new GoogleMapsApi(gApiKey);
    const mapEl   = document.querySelector(el);
    // creaing mock data for users location
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

    // setting default options for google maps
    const options = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles:    stylers.styles,
        zoom:      data.zoom,
        center:    {
            lat: data.lat,
            lng: data.lng
        }
    };

    //creating map within dom
    const map = new google.maps.Map(mapEl, options);
    //merging user data set in function "Gmap" with mock Dataset from DataSet.js
    const mergedData = DataSet.concat(data);

    //looping through full dataset to place marker/icons on map with infowindow
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

    // setting icon of marker depending on data.type (user or doctor)    
    const icon = {
        url:        (data.type === "user") ? stylers.icons.user : stylers.icons.doctor,
        scaledSize: (data.type === "user") ? new google.maps.Size(20, 20) : new google.maps.Size(30, 30)
    };

    //retrieving marker template for infowindow
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

    // as we are in a loop, we cannot directly address other infowindows,
    // we will push all infowindows to a global var to later be addressed for closing purposes
    activeWindows.push(infowindow);
    // init micromodel 
    MicroModal.init();
    // add eventlisteners to various buttons, markers and events
    handleMarkerClick(map, marker, infowindow, data);
}

/**
 * Handle Marker Click
 *
 * @param {map obj} mapEl
 * @param {marker} marker
 * @param {infowindow} infoWindow
 * @param {object} data
 */
function handleMarkerClick(map, marker, infowindow, data) {

    // on marker click, we will close all infowindows and open chosen infowindow
    google.maps.event.addListener(marker, 'click', function() {
        closeAllInfoWindows();
        modalReset();
        infowindow.setContent(marker.content);
        infowindow.open(map, marker);
    });
    // On map click we will close info window
    google.maps.event.addListener(map, 'click', function() {
        if (infowindow) {
            infowindow.close(map, infowindow);
        }
    });

    // within infowindow, when the user clicks "book now", populate modal and open
    google.maps.event.addListener(infowindow, 'domready', function() {
        google.maps.event.addDomListener(document.getElementsByClassName('js-modal-trigger')[0], 'click', function() {

            modalPopulate(data.title, data.address);

            MicroModal.show('modal');
            
        });

        // within modal, when the user clicks on book now
        // validate inputs and ajax data across to "send_email.php"
        // wait for response and display various messages relating to feedback
        google.maps.event.addDomListener(document.getElementById('book-now'), 'click', function(e) {
            e.preventDefault();
            if(validateFields()){
                let button = document.getElementById('book-now');
                button.classList.add("loading");
                button.disabled = true;
                button.innerText = "";
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        /* eslint-disable no-console */
                        // TODO:
                        // add loading spinner on button and display message if email is sent or not

                        const response = JSON.parse(this.response);
                        let messageSpan =document.getElementById('post-message');
                        if(response.code === 4){
                            //success
                            // setting a mock delay to show loading bar
                            
                            setTimeout(() => {
                                messageSpan.innerText = "Email successfully sent, please check your emails for your conformation!";
                                messageSpan.style.display = "block";
                                messageSpan.style.color = "green";
                                button.innerText = "Booked";
                                button.classList.remove('loading');
                                button.disabled = false;
                            }, 1000);
                            
                        }else{
                            //failed, will display message
                            // setting a mock delay to show loading bar
                            setTimeout(() => {
                                messageSpan.innerText = "Email failed to send, error: " + response.message;
                                messageSpan.style.display = "block";
                                messageSpan.style.color = "red";
                                button.innerText = "Book now";
                                button.classList.remove('loading');
                                button.disabled = true;
                            }, 1000);
                        }
                    }
                };
                const timeslot = document.getElementById("timeslot");

                const emailData = {
                    "f-name":document.getElementById("f-name").value,
                    "l-name":document.getElementById("l-name").value,
                    "title": data.title,
                    "address": data.address,
                    "timeslot": timeslot.options[timeslot.selectedIndex].value,
                    "email": document.getElementById("email").value
                };
                xhttp.open("POST", "send_email.php?" + Object.keys(emailData).map(key => key + '=' + emailData[key]).join('&'), true);
                xhttp.send();
            }
        });
    });
}

/**
 * modelReset
 * Resets all modal data to default
 */
function modalReset(){
    document.getElementById("modal-title").innerText = "";
    document.getElementById("modal-location").innerText = "";
    document.getElementById("f-name").value = "";
    document.getElementById("l-name").value = "";
    document.getElementById("timeslot").selectedIndex = 0;
    document.getElementById('book-now').classList.remove("loading");
    document.getElementById('book-now').diabled = false;
    document.getElementById('book-now').innerText = "Book now";
    document.getElementById('post-message').innerText = "";
    document.getElementById('post-message').style = null;
}

/**
 * modalPopulate
 * Popualtes modal with name and address of doctor
 * @param {string} title 
 * @param {string} address 
 */
function modalPopulate(title, address){
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-location").innerText = address;
}

/**
 * closeAllInfoWindows
 * uses global var to close all opened infowindows
 */
function closeAllInfoWindows() {
    for (var i=0;i<activeWindows.length;i++) {
        activeWindows[i].close();
    }
}

/**
 * validateFields
 * Simple validation to check if inputs are empty, can expand upon
 */
function validateFields(){
    let fname = document.getElementById('f-name');
    let lname = document.getElementById('l-name');
    let timeslot = document.getElementById('timeslot');
    let email = document.getElementById('email');


    if(validateTextField(fname) && validateTextField(lname) && validateTextField(email, false) && validateSelectField(timeslot)){
        return true;
    }else{
        return false;
    }

}

/**
 * validateSelectField
 * checks to see if value has been selected and is not default position (0)
 * @param {object} field 
 */
function validateSelectField(field){
    if(field.selectedIndex === 0){
        document.getElementById(field.id+'-warning').style.display = "block";
        document.getElementById(field.id+'-warning').style.color = "red";
        document.getElementById(field.id+'-warning').style.fontSize = "12px";
        document.getElementById(field.id+'-warning').innerText = "Please select a time slot";
        return false;
    }else{
        document.getElementById(field.id+'-warning').style = null;
        return true;
    }
}

/**
 * validateTextField
 * used to validate text based field including email types
 * adds a simple red border to fields that fail validation
 * @param {object} field 
 * @param {boolean} preg 
 */
function validateTextField(field, preg = true){
    if(preg)
        field.value = field.value.replace(/[^a-zA-Z ]/g, "");
    if(field.value.length < 1){
        field.style.border = "1px solid red";
        return false;
    }else{
        field.style = null;
        return true;
    }
}