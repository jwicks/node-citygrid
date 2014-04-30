# node-citygrid #

A Node.js wrapper for the CityGrid API: http://docs.citygridmedia.com/display/citygridv2. The following APIs are implemented:

*  Places API
*  Offers API
*  Reviews API

## Installation ##

  Install with the node package manager [npm](http://npmjs.org):

    $ npm install jira

## Examples ##

Places Search

    var CityGrid = require('citygrid');
    
    var citygrid = new CityGrid('PUBLISHER CODE FROM developer.citygridmedia.com');
    citygrid.placesSearch({ what: 'coffee', where: 'Brooklyn, NY' }, function (err, data) {
      console.log('data:', data);
    });

Currently there is no explicit login call necessary as each API call uses Basic Authentication to authenticate. 

## TODO ##

*  More examples
*  Tests
