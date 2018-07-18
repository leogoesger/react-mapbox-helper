## React Mapbox Helper

Simple wrapper around Mapbox GL for displaying point features on any styled map.

Current helpers: `ReactMap` and `getPointSource`

### Example - `ReactMap`

Include `css` style sheet in `index.html`

```
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css' rel='stylesheet' />
```

Use the component

```
import { ReactMap } from "react-mapbox-helper";

<ReactMap
    accessToken={'you_token'}
    mapStyle={MAP_STYLE}
    pointSource={POINT_SOURCE}
    pointLayer={MAP_LAYER}
    hoverFeatureKey={"location"}
/>
```

| Key               | Type             | Description                 |
| ----------------- | :--------------: | :-------------------------: |
| `accessToken`     | string           | Mapbox token                |
| `mapStyle`        | object \| string | `json` or style sheet `url` |
| `pointSource`     | object           | `geojson` object            |
| `pointLayer`      | object           | Mapbox style object         |
| `hoverFeatureKey` | string           | string in properties        |

### Example - `getPointSource`

This helper normalizes an array of objects into a common `geojson` object that can be passed down to Mapbox, and persver its properties if needed.

It take two parameters: raw data and options params.

| Key       | Type     | Description                    |
| --------- | :------: | :----------------------------: |
| `param_1` | object[] | objects from api or any source |
| `param_2` | IParam   | key mapping                    |

where `IParam` is an object with type as following:


```
interface IParam {
    longitude: string;
    latitude: string;
    propertyKeys: string[];
}
```

For example, this is the data from `api`

```
[  
   {  
      "location":"Davis",
      "lat":38.544907,
      "lng":-121.740517,
      "__typename":"CCSiteType"
   },
   {  
      "location":"Dixon",
      "lat":38.445623,
      "lng":-121.826706,
      "__typename":"CCSiteType"
   }
]
```

and we want to transform the data to `geojson` object.

```
getPointSource(data, {
                        longitude: "lng",
                        latitude: "lat",
                        propertyKeys: ["location"],
                    })
```

This will produce an geojson object

```
{  
   "data":{  
      "type":"FeatureCollection",
      "features":[  
         {  
            "type":"Feature",
            "geometry":{  
               "type":"Point",
               "coordinates":[  
                  -121.740517,
                  38.544907
               ]
            },
            "properties":{  
               "location":"Davis"
            }
         },
         {  
            "type":"Feature",
            "geometry":{  
               "type":"Point",
               "coordinates":[  
                  -121.826706,
                  38.445623
               ]
            },
            "properties":{  
               "location":"Dixon"
            }
         }
      ]
   },
   "type":"geojson"
}
```