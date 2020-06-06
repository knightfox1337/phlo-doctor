//import Doctor from './classes/Doctor';
import GMapApi from './classes/GMapApi';
// provided by https://github.com/stephenscaff/google-maps-es6
import * as GMap from './classes/GMap';
import User from './classes/User';


const init = () => {
    /*eslint-disable no-console */

    //getting api key from class
    let api = new GMapApi();
    
    let user = new User();

    user.getLocation().then(function(){
        setTimeout(function(){
            GMap.GMap('.js-map', api.key);
        }, 0);
        
    });
    
    
    //init map
    
    
};

init();
