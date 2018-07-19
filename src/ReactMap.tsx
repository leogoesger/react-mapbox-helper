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
    onClick: (prop: string) => void;
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

        this.map.on("mousemove", e => this.onHover(e, hoverFeatureKey));
        this.map.on("click", e => this.onClick(e, hoverFeatureKey));
    }

    componentWillUnmount() {
        this.map.remove();
    }

    private onHover(e, hoverFeatureKey) {
        const features = this.map.queryRenderedFeatures(e.point);
        if (features.length > 0 && features[0].properties[hoverFeatureKey]) {
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
    }

    private onClick(e, hoverFeatureKey) {
        const features = this.map.queryRenderedFeatures(e.point);
        if (features.length > 0 && features[0].properties[hoverFeatureKey]) {
            this.props.onClick(features[0].properties[hoverFeatureKey]);
        }
    }

    public render() {
        const { x, y, feature } = this.state;
        return (
            <div style={{ position: "relative" }}>
                <div
                    className="react-mapbox"
                    ref={el => (this.mapContainer = el)}
                />
                {feature && (
                    <div
                        className="react-mapbox-tooltip"
                        style={{ position: "absolute", left: x, top: y }}
                    >
                        <div>{feature}</div>
                    </div>
                )}
                {this.props.children}
            </div>
        );
    }
}

export default Map;
