"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getPointSource = function (objs, objMapping) {
    var geoPoints = objs.map(function (site) {
        var properties = {};
        objMapping.propertyKeys.forEach(function (key) { return (properties[key] = site[key]); });
        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    site[objMapping.longitude],
                    site[objMapping.latitude],
                ],
            },
            properties: properties,
        };
    });
    return {
        data: { type: "FeatureCollection", features: geoPoints },
        type: "geojson",
    };
};
exports.default = getPointSource;
