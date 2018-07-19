/* tslint:disable */

import * as React from "react";
import { Query } from "react-apollo";
import { Dialog, DialogContent } from "@material-ui/core";

import { MAP_STYLE, MAP_LAYER } from "../components/map/mapStyle";
import { CC_SITES_QUERY } from "../queries";
import { getPointSource } from "react-mapbox-helper";
import ReactMap from "../components/shared/ReactMap";

interface IProps {}

interface IState {
    dialogLocation: string;
}

class Map extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            dialogLocation: "",
        };
    }

    onClick = location => {
        this.setState({ dialogLocation: location });
    };

    handleDialogClose = () => {
        this.setState({ dialogLocation: "" });
    };

    render() {
        return (
            <Query query={CC_SITES_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return "Error...";

                    return (
                        <ReactMap
                            accessToken={
                                "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
                            }
                            pointSource={getPointSource(data.geoSites, {
                                longitude: "lng",
                                latitude: "lat",
                                propertyKeys: ["location"],
                            })}
                            pointLayer={MAP_LAYER}
                            hoverFeatureKey={"location"}
                            mapStyle={MAP_STYLE}
                            onClick={this.onClick}
                        >
                            <Dialog
                                open={Boolean(this.state.dialogLocation)}
                                onClose={this.handleDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogContent>
                                    {this.state.dialogLocation}
                                </DialogContent>
                            </Dialog>
                        </ReactMap>
                    );
                }}
            </Query>
        );
    }
}

export default Map;
