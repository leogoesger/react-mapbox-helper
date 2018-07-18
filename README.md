## React Mapbox Helper

Simple wrapper around Mapbox GL for displaying point features on any styled map.


### Example

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