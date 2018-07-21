# React Mapbox Helper

Simple wrapper around Mapbox GL for adding additional sources and layers to pre-existing Mapbox style sheet.

Current helpers: `ReactMap` and `getPointSource`

## Installation

```
yarn add react-mapbox-helper
```

Include `css` style sheet in `index.html`

```
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css' rel='stylesheet' />
```

Add a custome `css` for the tooltip and mapbox viewport

```
.react-mapbox-tooltip {
    position: absolute;
    margin: 8px;
    padding: 4px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    max-width: 300px;
    font-size: 10px;
    z-index: 7;
    pointer-events: none;
}
.react-mapbox {
    width: 100%;
    height: 100%;
}
```


##  ReactMap Component

Use the component or you can follow this [example](https://github.com/leogoesger/react-mapbox-helper/blob/master/example/Example.tsx)


```
import { ReactMap } from "react-mapbox-helper";

<ReactMap
    accessToken={'you_token'}
    mapStyle={MAP_STYLE}
    sources={POINT_SOURCE}
    sourceIds={SOURCE_IDs}
    layers={MAP_LAYER}
    hoverFeatureKey={"location"}
    onClick={this.onClick}
/>
```

| Key               | Type               | Description                           |
| ----------------- | :----------------: | :-----------------------------------: |
| `accessToken`     | string             | Mapbox token                          |
| `mapStyle`        | object \| string   | `json` or style sheet `url`           |
| `sources`         | object[]           | `geojson` objects array               |
| `sourceIds`       | string[]           | source IDs array                      |
| `layers`          | object[]           | Mapbox style objects array            |
| `hoverFeatureKey` | string             | string in properties                  |
| `onClick`         | (e:string) => void | event handler for clicking on feature |

Note: `onClick` sends back a property value using `hoverFeatureKey`. `sources` and `sourceIds` need to have the same length, where first item in both array represent the same `geoJson` object.

##  getPointSource helper

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

## Example Props

### mapStyle
Use the mapbox style sheet directly with `mapbox://styles/mapbox/streets-v9`. Or you can custome create your own style sheet and download it into `JSON` file, and import it. 

### sources
An array with a list of `geoJson` objects. For example: 

```
[{  
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
      ]
   },
   "type":"geojson"
},{  
   "data":{  
      "type":"FeatureCollection",
      "features":[  
         {  
            "type":"Feature",
            "geometry":{  
               "type":"Polygon",
                //
            },
            "properties":{  
               "location":"Yolo County"
            }
         },
      ]
   },
   "type":"geojson"
}]
```

### sourceIds

An array matching with `sources`. Using previous example, it would need to have 2 elements. This will assign `pointData` to the first source and `polygonData` for the second source.

```
['pointData', 'polygonData']
```

### layers

An array with Mapbox style objects. Mapbox will apply each layer based on `source` key.

```
[{
    id: "pointData",
    source: "pointData",
    type: "circle",
    interactive: true,
    minzoom: 5,
    layout: {
        visibility: "visible",
    },
    paint: {
        "circle-radius": {
            base: 3,
            stops: [[5, 3.5], [7, 5.5]],
        },
        "circle-stroke-color": "#fafafa",
        "circle-stroke-width": 1,
        "circle-color": "#03a9f4",
    },
},{
    id: "polygonData",
    source: "polygonData",
    type: "circle",
    interactive: true,
    minzoom: 5,
    layout: {
        visibility: "visible",
    },
    paint: {
        // your style
    },
}]
```

### hoverFeatureKey

A string value that allows Mapbox to know when to show the Tooltip. In here, we can use `location`

### onClick

An onClick event handler for when user click certain feature. 