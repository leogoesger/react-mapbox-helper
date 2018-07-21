import * as React from "react";
import * as mapboxgl from "mapbox-gl";

interface IState {
    x: number;
    y: number;
    feature: string;
}

interface IGeoJson {
    data: {
        type: string;
        features: any[];
    };
    type: string;
}

interface ILayout {
    source: string;
    type: string;
    id: string;
    [index: string]: any;
}

interface IProps {
    sources: IGeoJson[];
    sourceIds: string[];
    layers: ILayout[];
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
            sources,
            sourceIds,
            layers,
            hoverFeatureKey,
            mapStyle,
        } = this.props;

        if (sources.length !== sourceIds.length) {
            throw "Make sure the sources and sourceIds are same length.";
        }

        (Object as any)
            .getOwnPropertyDescriptor(mapboxgl, "accessToken")
            .set(this.props.accessToken);

        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: mapStyle,
        });

        this.map.on("load", () => {
            sources.length > 0 &&
                sources.forEach((source, index) => {
                    this.map.addSource(sourceIds[index], source);
                });
            layers.length > 0 &&
                layers.forEach(layer => {
                    this.map.addLayer(layer);
                });
        });

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
