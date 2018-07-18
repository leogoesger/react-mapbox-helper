interface IObjMapping {
    longitude: string;
    latitude: string;
    propertyKeys: string[];
}

interface IGeoPoint {
    type: string;
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties: {
        [index: string]: string;
    };
}

interface IPointSource {
    type: string;
    data: {
        type: string;
        features: IGeoPoint[];
    };
}

const getPointSource = (objs: any, objMapping: IObjMapping): IPointSource => {
    const geoPoints = objs.map(site => {
        const properties = {};
        objMapping.propertyKeys.forEach(key => (properties[key] = site[key]));
        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    site[objMapping.longitude],
                    site[objMapping.latitude],
                ],
            },
            properties,
        };
    });

    return {
        data: { type: "FeatureCollection", features: geoPoints },
        type: "geojson",
    };
};

export default getPointSource;
