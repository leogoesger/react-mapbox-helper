import * as React from "react";
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
declare class Map extends React.Component<IProps, IState> {
    map: any;
    mapContainer: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onHover;
    private onClick;
    render(): JSX.Element;
}
export default Map;
