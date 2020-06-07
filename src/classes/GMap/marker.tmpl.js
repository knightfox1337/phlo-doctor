
/**
 * Marker Template
 * 
 * @param {obj} data - property data/json
 */
function markerTmpl(data) {
    return `<article class="marker-box ${data.type}">
    <div class="marker-box__wrap">
      <div class="marker-box__grid">
        <div class="marker-box__main">
          <span class="marker-box__title">${data.title}</span>
          <address class="marker-box__address">
            <span class="marker-box__address">${data.address}</span>
          </address>
          <a class="js-modal-trigger" href="#">Book now</a>
        </div>
      </div>
    </div>
  </article>`;
}

export default markerTmpl;
