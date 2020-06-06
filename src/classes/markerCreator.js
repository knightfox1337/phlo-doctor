
/**
 * Marker Creator
 * @param {obj} data - property data/json
 */
function markerCreator(data, primary = false) {

    if(!primary){
        return `<div
        class="marker"
        data-lat="${data.lat}"
        data-lng="${data.lng}"
        data-address="${data.address}"
        data-title="${data.title}">
        </div>`;
    }else{
        const wrapper = document.createElement('div');
        wrapper.setAttribute("id", "map");
        wrapper.setAttribute("class", "js-map");
        wrapper.setAttribute("data-lat", data.lat);
        wrapper.setAttribute("data-lng", data.lng);
        wrapper.setAttribute("data-address", data.address);
        wrapper.setAttribute("data-title", data.title);
        wrapper.setAttribute("data-zoom", "14");
        return wrapper;
        // document.createElement('div').setAttribute("data", "lat: '"+ data.lat +"'");
        // return `<div
        // id="map"
        // class="js-map"
        // data-lat="${data.lat}"
        // data-lng="${data.lng}"
        // data-address="${data.address}"
        // data-title="${data.title}"
        // data-zoom="14">
        // </div>`;
    }
}

export default markerCreator;
