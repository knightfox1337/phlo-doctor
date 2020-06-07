import MarkerCreator from './markerCreator';

/**
 * User
 * this class defines location information from the users browser
 * Notes: To use the geo location api within the browser, we need to have https
 * As a default, if we are unable to get geolocation due to permission issues, we will use a predefined location (for testing only)
 */
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
                // setting self as this, so we can refer to class easily within sucess and error functions of getCurrentPosition
                let self = this;
                
                if (document.getElementById('map') != null) {
                    this.resolve();
                }else{
                    

                    if("geolocation" in navigator){
                        navigator.geolocation.getCurrentPosition(
                            function success(pos){
                                //sets location
                                self.lat = pos.coords.latitude;
                                self.lng = pos.coords.longitude;

                                //creates a div within .map-wrapper to then be used later for generating the google map
                                const userMarker = MarkerCreator({lat: self.lat, lng: self.lng, address: '', title: ''}, true);
                                document.querySelector(".map-wrapper").appendChild(userMarker);
                                self.resolve();
                            },
                            function error(error){
                                // I have used alert boxes here for a simple way to display any errors, 
                                // ideally i would have another modal displaying messages but is not vital to functionally 
                                // of this app
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
                                alert("maunally setting GeoLocation"); 

                                // sets predefined location if user:
                                // Doesn't allow permissions
                                // permissions can't be obtained due to not having https
                                self.lat = 55.812572;
                                self.lng = -3.978616;

                                //creates a div within .map-wrapper to then be used later for generating the google map
                                const userMarker = MarkerCreator({lat: self.lat, lng: self.lng, address: '', title: ''}, true);
                                document.querySelector(".map-wrapper").appendChild(userMarker);
                                self.resolve();
                            });
                    }
                }

                
                
            });
            
        }
        return this.promise;
        
    }

   


}