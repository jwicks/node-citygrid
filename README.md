# node-citygrid #

A Node.js wrapper for the CityGrid API: http://docs.citygridmedia.com/display/citygridv2. The following APIs are implemented:

*  Places API
*  Offers API
*  Reviews API

## Installation ##

  Install with the node package manager [npm](http://npmjs.org):

    $ npm install citygrid

## Examples ##

Places Search

    var CityGrid = require('citygrid');
    
    var citygrid = new CityGrid('PUBLISHER CODE FROM developer.citygridmedia.com');
    citygrid.placesSearch({ what: 'coffee', where: 'Brooklyn, NY' }, function (err, data) {
      console.log('data:', data);
    });


## TODO ##

*  More examples
*  Tests
*  Pagination
*  Remove dependency on request?