var Random = require('random-js'),
    mt = new Random(Random.engines.mt19937().seed(0))
    Bounds = require('./bounds.js')

var pseudo = false,
    random = Math.random,
    polygon_bounds = Bounds.world,
    bbox_bounds = []

module.exports = function(count, type, _bounds) {
    if (_bounds) {
        bbox_bounds = Bounds.boundingBoxAroundPolyCoords(_bounds.coordinates)
    } else {
        bbox_bounds = Bounds.boundingBoxAroundPolyCoords(polygon_bounds.coordinates)
    }
    switch (type) {
        case 'point':
            var features = [];
            for (var i = 0; i < count; i++) {
                features.push(feature(point()));
            }
            return collection(features);
    }
};

module.exports.pseudo = function(_) {
    random = _ ? function() { return mt.real(0, 1); } : Math.random;
    return module.exports;
};

function rndRange(min, max) { return random() * (max - min) + min; }
function rnd() { return random() - 0.5; }
function lon() { return rndRange(bbox_bounds[0][1], bbox_bounds[1][1]); }
function lat() { return rndRange(bbox_bounds[0][0], bbox_bounds[1][0]); }
function point() {
    var p = { type: 'Point', coordinates: [lon(), lat()] }
      , inside = Bounds.pointInPolygon(p, polygon_bounds)
    if (inside) {
        return p;
    } else {
        return point();
    }
}
function feature(geom) { return { type: 'Feature', geometry: geom, properties: {} }; }
function collection(f) { return { type: 'FeatureCollection', features: f }; }

