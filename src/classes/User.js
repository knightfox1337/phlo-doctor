import MarkerCreator from './markerCreator';

export default class User{

    constructor(){
        this.lat = "";
        this.lng = "";
    }

    /**
     * getLocation
     * Uses Navigator properties to obtain latitude and longitude of user
     */
    getLocation(){
        if (!this.promise) {
            this.promise = new Promise((resolve) => {
                this.resolve = resolve;

                let self = this;
                
                if (document.getElementById('map') != null) {
                    this.resolve();
                }else{
                    

                    if("geolocation" in navigator){
                        navigator.geolocation.getCurrentPosition(
                            function success(pos){
                                self.lat = pos.coords.latitude;
                                self.lng = pos.coords.longitude;

                                
                                const userMarker = MarkerCreator({lat: self.lat, lng: self.lng, address: '', title: ''}, true);
                                document.querySelector(".map-wrapper").appendChild(userMarker);
                                self.resolve();
                            },
                            function error(error){
                                switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    alert("User denied the request for Geolocation.");
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    alert("Location information is unavailable.");
                                    break;
                                case error.TIMEOUT:
                                    alert("The request to get user location timed out.");
                                    break;
                                case error.UNKNOWN_ERROR:
                                    alert("An unknown error occurred.");
                                    break;
                                }
                            });
                    }
                }

                
                
            });
            
        }
        return this.promise;
        
    }

   


}