"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mapboxgl = require("mapbox-gl");
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            feature: "",
            x: 0,
            y: 0,
        };
        return _this;
    }
    Map.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, pointSource = _a.pointSource, pointLayer = _a.pointLayer, hoverFeatureKey = _a.hoverFeatureKey, mapStyle = _a.mapStyle;
        Object
            .getOwnPropertyDescriptor(mapboxgl, "accessToken")
            .set(this.props.accessToken);
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: mapStyle,
        });
        if (pointSource) {
            this.map.on("load", function () {
                _this.map.addSource("pointData", pointSource);
                _this.map.addLayer(pointLayer);
            });
        }
        this.map.on("mousemove", function (e) {
            var features = _this.map.queryRenderedFeatures(e.point);
            if (features.length > 0 &&
                features[0].properties[hoverFeatureKey]) {
                _this.map.getCanvas().style.cursor = "pointer";
                _this.setState({
                    x: e.point.x,
                    y: e.point.y,
                    feature: features[0].properties[hoverFeatureKey],
                });
            }
            else {
                _this.map.getCanvas().style.cursor = "";
                _this.setState({
                    x: 0,
                    y: 0,
                    feature: "",
                });
            }
        });
    };
    Map.prototype.componentWillUnmount = function () {
        this.map.remove();
    };
    Map.prototype.render = function () {
        var _this = this;
        var style = {
            height: "300px",
            width: "100%",
        };
        var _a = this.state, x = _a.x, y = _a.y, feature = _a.feature;
        return (React.createElement("div", { style: { position: "relative" } },
            React.createElement("div", { style: style, ref: function (el) { return (_this.mapContainer = el); } }),
            feature && (React.createElement("div", { className: "tooltip", style: { position: "absolute", left: x, top: y } },
                React.createElement("div", null, feature)))));
    };
    return Map;
}(React.Component));
exports.default = Map;
