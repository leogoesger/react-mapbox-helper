import * as React from "react";
import * as mapboxgl from "mapbox-gl";

interface IState {
    x: number;
    y: number;
    feature: string;
}

interface IProps {
    pointSource: any;
    pointLayer: any;
    mapStyle: any;
    hoverFeatureKey: string;
    accessToken: string;
}

class Map extends React.Component<IProps, IState> {
    map: any;
    mapContainer: any;

    constructor(props: any) {
        super(props);
        this.state = {
            feature: "",
            x: 0,
            y: 0,
        };
    }

    componentDidMount() {
        const {
            pointSource,
            pointLayer,
            hoverFeatureKey,
            mapStyle,
        } = this.props;

        (Object as any)
            .getOwnPropertyDescriptor(mapboxgl, "accessToken")
            .set(this.props.accessToken);

        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: mapStyle,
        });

        if (pointSource) {
            this.map.on("load", () => {
                this.map.addSource("pointData", pointSource);
                this.map.addLayer(pointLayer);
            });
        }

        this.map.on("mousemove", e => {
            const features = this.map.queryRenderedFeatures(e.point);
            if (
                features.length > 0 &&
                features[0].properties[hoverFeatureKey]
            ) {
                this.map.getCanvas().style.cursor = "pointer";
                this.setState({
                    x: e.point.x,
                    y: e.point.y,
                    feature: features[0].properties[hoverFeatureKey],
                });
            } else {
                this.map.getCanvas().style.cursor = "";
                this.setState({
                    x: 0,
                    y: 0,
                    feature: "",
                });
            }
        });
    }

    componentWillUnmount() {
        this.map.remove();
    }

    public render() {
        const style = {
            height: "300px",
            width: "100%",
        };

        const { x, y, feature } = this.state;
        return (
            <div style={{ position: "relative" }}>
                <div style={style} ref={el => (this.mapContainer = el)} />
                {feature && (
                    <div
                        className="tooltip"
                        style={{ position: "absolute", left: x, top: y }}
                    >
                        <div>{feature}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default Map;
