var test = require('tape'),
    geojsonRandom = require('./');


var testBounds = {"type":"Polygon","coordinates":[[[-100.986328125,33.94335994657882],[-103.35937499999999,38.134556577054134],[-96.240234375,40.58058466412764],[-93.8671875,35.96022296929667],[-97.3828125,30.977609093348686],[-98.61328125,36.03133177633189],[-100.986328125,33.94335994657882]]]}


test('geojson-random', function(t) {
    t.equal(geojsonRandom(100, 'point').features.length, 100, '100 points');
    //TODO test if points in bounds
    t.equal(geojsonRandom(100, 'point', testBounds).features.length, 100, '100 points in bounds');
    t.deepEqual(geojsonRandom.pseudo(true)(1, 'point'),
        { "features": [ { geometry: { coordinates: [ 169.2190806503591, 37.40757559196183 ], type: 'Point' }, properties: {}, type: 'Feature' } ], type: 'FeatureCollection' },
    'pseudorandom');
    t.end();
});
