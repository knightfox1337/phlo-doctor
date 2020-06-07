export const stylers = {

    /**
   * Map Styler JSON
   * can be replaced with snazzy map designs
   */
    styles: [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [ {
                "color": "#444444"
            } ]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [ {
                "color": "#f2f2f2"
            } ]
        }, {
            "featureType": "landscape.natural.landcover",
            "elementType": "labels.icon",
            "stylers": [ {
                "visibility": "simplified"
            } ]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [ {
                "visibility": "off"
            } ]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [ {
                "saturation": -100
            }, {
                "lightness": 45
            } ]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [ {
                "visibility": "simplified"
            } ]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [ {
                "color": "#ffffff"
            } ]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [ {
                "visibility": "off"
            } ]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [ {
                "visibility": "off"
            } ]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [ {
                "color": "#dde6e8"
            }, {
                "visibility": "on"
            } ]
        }
    ],

    /**
    * Map Icon/Pin SVG
    * SVG is base64 encoded.
    */
    icons: {
        doctor: 'data:image/png;base64,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',
        user: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQ5QTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcVGFvQAAAFp0Uk5TABhBW3WOqMHb9P+ndCrAO4bRSpfj4kC59tzDqZB2XUNcj8L1LabShxEakweA+rBkGVnnrTN7Rp7TWh7mbbEOYxAmgWwridXsSS9zs+7JJ4vfBZl8R9CNy2KjXwZwjAAABHxJREFUeJy9WmlD8jAMHpdoEUE5BJFTFEUU79cLb/C+7///R96lhbYbjHVjJh/GkrZ5VtqmaVJNUyOfPxAMjYXHJ4hOE+PhSGgy4PcpNlaiaHCKDKSpYNQbhFh8ejACo+l4bFSEmURyGAKjVGJmBIj0rKwrk53LzecLxWIpX85Vsgty2WzaJUR1UShZqsWWzeXLsdqSqLFYdQGxUuftw9bDGw2GebX6ikOI1cZat+l6c2N41Y3merfqWmPVCcbmVrfd9o5K9Z3tbvWtTXWM3W6bqT3VFnu9hbSr2uIfq79/oP5Zeuf3Wat/SrUP2UcdHTuBADo+Yt0/tK+aZquvdeIUQ9NOWrRp0nbNnLJOhywrnJ2fn1kWhljr0+EYF6zW5aCyq0K71WHlnVa7cDWoziUrvxiGwfpxfdNXcHt3/0BM9HB/d9tX8ebari9pWuHxySSuPr+YAXr08my2Jk+PtMByXA7pmEdeTdI3KwRGb6bZ9Bqho281x+jcfTRhvA+HAHo3odC+TA3GoGvw2vhffXzaY+gb14eh0RMdl4GrktkS45h/qUAAGaf8DZUNsDCbtMAwd3e+VTEI+TZYUjaT+6zl6lbfB/2oQwD9yG3pqtwyW/4GSFuypOYMg5Ca3JpamIYRYwX2qCPZXv06xSDkV2p+AtZyzbhX1qGSbHcd98Pcl2MQ1GWMKkj23Y9Hj+RxofuLbA+oXyJNhh13GIRIc+wA+EXBU5slL1EHc9dI35ISakCEDaM+nLSfh9xiEPIltOwBP9vjZoDbFqUf7jEIkSwM9WF6HmwCGOnfHOpg29GnaWQTXSalv6+LMgW7O4wkmwxeX5K9xqCoyUsOR8MgROwkTWDZySIOr8IXtdmj7OmNq9oANs6HIMwLqqNiyCsQvPFpeImCPMjlz6ODPHNlQWCj8gsjS59BnV64Mt4BWJhLXHw7OgYhwlOCU5JuSnwgFebzzguQO66OGnOf5ocfcYC99wLknqujy8OvBeBHnAf7/EQ39MDVLQMb0Cb15wIXXnmBQYjwkzMERh4sbpbLCt6AFLjCLAH3BJzKCpe1vQFpc4VzOjdGF2WOy1regAi3J0fAnIzrzzKXdbwB6XCF8zo3rkFsKc9l3mAQwhXmdWaCqi31RGdegZwZZhIFKfZE516BnPc0FnFB+LT2/u8qURCUgYcpPP93U7hMYAqjLMYx/TnHZZ6blYrORXAMJGzxGS7z3NRDOHQSZ9NC2X5RHAkUlwjHuUNxU1EcbpyjA8ohSIOA3Z8d51Ldd/PBVCmQZkXTQo/hYIpyxO4LFigH7PpJipgZgwU4YQ8WwJGSDF4EcGi8UQrg4ISiUIJqOOFBlEAnTsgWJfg8OIyuHML7MjSzDKNbJASUAmyfygkBnNQGTpIGJd2EkzjDSQHiJDNx0rI4CWZNpModZPA17cBRqlzDSfrjXF/AuYihoVwpAUK4HANkvOazkK3kyvlSsVjIz+fmshm5zPU1H6CZRIrYUnKkC0uU/v7qFaO/v0TGyOcPTIYi4jrcWCiofh3uP1DrQ6w37yH1AAAAAElFTkSuQmCC'
    }
};
