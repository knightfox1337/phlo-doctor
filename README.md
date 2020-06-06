# Phlo
This project was developed as a challenge for Phlo.

## Setup
Pull down repo and run:
`npm install` This will install any required modules

The next step is to create a new class called `GMapApi`.
file location: `/src/classes/GMapApi.js`

Contents: 
```
export default class GMapApi{
    constructor(){
        this.key = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';
    }
}
```

## Usage
* `npm start` to run eslint on watch mode and dev-server at localhost:8080.
* `npm run watch` to only watch for/recompile on changes.
* `npm run build` to generate a minified, production-ready build.

## References
* `https://github.com/stephenscaff/google-maps-es6` was used as a base line for google maps, this has been customised/altered to suit the challenge