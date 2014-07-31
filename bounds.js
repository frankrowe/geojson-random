var Bounds = {}

Bounds.boundingBoxAroundPolyCoords = function(coords) {
  var xAll = [], yAll = []

  for (var i = 0; i < coords[0].length; i++) {
    xAll.push(coords[0][i][1])
    yAll.push(coords[0][i][0])
  }

  xAll = xAll.sort(function (a,b) { return a - b })
  yAll = yAll.sort(function (a,b) { return a - b })

  return [ [xAll[0], yAll[0]], [xAll[xAll.length - 1], yAll[yAll.length - 1]] ]
}

Bounds.pointInBoundingBox = function (point, bounds) {
    return !(point.coordinates[1] < bounds[0][0] || point.coordinates[1] > bounds[1][0] || point.coordinates[0] < bounds[0][1] || point.coordinates[0] > bounds[1][1]) 
  }


// Point in Polygon
// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html#Listing the Vertices

Bounds.pnpoly = function(x,y,coords) {
  var vert = [ [0,0] ]

  for (var i = 0; i < coords.length; i++) {
    for (var j = 0; j < coords[i].length; j++) {
      vert.push(coords[i][j])
    }
    vert.push(coords[i][0])
    vert.push([0,0])
  }

  var inside = false
  for (var i = 0, j = vert.length - 1; i < vert.length; j = i++) {
    if (((vert[i][0] > y) != (vert[j][0] > y)) && (x < (vert[j][1] - vert[i][1]) * (y - vert[i][0]) / (vert[j][0] - vert[i][0]) + vert[i][1])) inside = !inside
  }

  return inside
}

Bounds.pointInPolygon = function (p, poly) {
    var coords = (poly.type == "Polygon") ? [ poly.coordinates ] : poly.coordinates

    var insideBox = false
    for (var i = 0; i < coords.length; i++) {
      if (Bounds.pointInBoundingBox(p, Bounds.boundingBoxAroundPolyCoords(coords[i]))) insideBox = true
    }
    if (!insideBox) return false

    var insidePoly = false
    for (var i = 0; i < coords.length; i++) {
      if (Bounds.pnpoly(p.coordinates[1], p.coordinates[0], coords[i])) insidePoly = true
    }

    return insidePoly
  }

Bounds.world = {
  "type": "Polygon",
  "coordinates": [
    [
      [
        -180,
        -90
      ],
      [
        -180,
        90
      ],
      [
        180,
        90
      ],
      [
        180,
        -90
      ],
      [
        -180,
        -90
      ]
    ]
  ]
}

module.exports = Bounds