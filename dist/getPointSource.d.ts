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
declare const getPointSource: (objs: any, objMapping: IObjMapping) => IPointSource;
export default getPointSource;
