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

## Emails
Due to the emails being sent from PHP, we must run this from Xampp or Ampps (or something similar)
The MailJet SMTP requires auth keys (which i can provide for testing)
These can be set on lines 103 and 106 within `send_mail.php`

## Usage
* `npm start` to run eslint on watch mode and dev-server at localhost:8080.
* `npm run watch` to only watch for/recompile on changes.
* `npm run build` to generate a minified, production-ready build.

## References
* `https://github.com/stephenscaff/google-maps-es6` was used as a base line for google maps, this has been customised/altered to suit the challenge
* `https://www.mailjet.com/` was used for smtp email 
* `https://github.com/metagrover/ES6-boilerplate` Was used as a base 

## Known issues
* Due to permission issues, GeoLocation cannot be obtained when not using https (ssl). Due to this we need to use mock data
* For emails to work, we must run this project within a simple stack of PHP (7.3), apache.