import * as React from "react";
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
declare class Map extends React.Component<IProps, IState> {
    map: any;
    mapContainer: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default Map;
