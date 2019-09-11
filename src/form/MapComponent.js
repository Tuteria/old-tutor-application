import React from "react";

import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import { getAddressValue, sortAddress } from "./utils";
import markerLogo from "./marker.svg";
import { Div } from "../primitives";
import { Icon } from "../simple";
import { spacing } from "../design-systems";
import includes from "lodash/includes";
import createReactContext from "create-react-context";

export const MapFormContext: Context<MapProps> = createReactContext({
  state: {},
  display_error: true
});
export class MapFormContextProvider extends React.Component {
  // state = {
  //   state: this.props.state,
  //   display_error: this.props.display_error
  // };
  render() {
    return (
      <MapFormContext.Provider
        value={{
          state: this.props.state,
          display_error: this.props.display_error
        }}
      >
        {this.props.children}
      </MapFormContext.Provider>
    );
  }
}

const IconMarker = (
  <svg width="38px" height="56px" viewBox="0 0 38 56" version="1.1">
    <title>pin-3</title>
    <desc>Created with Sketch.</desc>
    <defs />
    <g
      id="Tutor-Application"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="Step-1---Location"
        transform="translate(-593.000000, -726.000000)"
        fill-rule="nonzero"
      >
        <g id="Group-7" transform="translate(515.000000, 675.000000)">
          <g id="pin-3" transform="translate(78.000000, 51.000000)">
            <path
              d="M19,0 C8.50664647,0 0,8.60772057 0,19.2259054 C0,30.6963067 14.3870459,51.9897843 18.1225353,55.6393701 C18.6146465,56.12021 19.3853424,56.12021 19.8775206,55.6393701 C23.6130212,51.9897956 38,30.6963067 38,19.2259054 C38,8.60772057 29.4933535,0 19,0 Z"
              id="Shape"
              fill="#F45A4B"
            />
            <circle id="Oval" fill="#FFFFFF" cx="19" cy="19" r="7" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const MapComponent = props => {
  const marker = props.marker;
  const onDragEnd = ({ latLng }) => {
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    props.onDragEnd({ latitude, longitude });
  };
  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={14}
      defaultCenter={marker}
      onClick={props.onMapClick}
    >
      <Marker
        position={marker}
        defaultAnimation={2}
        draggable={true}
        icon={markerLogo}
        onDragEnd={onDragEnd}
      />
      <Circle
        center={marker}
        radius={500}
        options={{
          fillColor: `#36D37E`,
          fillOpacity: 0.29,
          strokeColor: `#36D37E`,
          strokeOpacity: 1,
          strokeWeight: 2
        }}
      />
    </GoogleMap>
  );
};
const MAP = withScriptjs(withGoogleMap(MapComponent));

export class MapFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.node = null;
    this.state = {
      geocodedAddress: false,
      display_error: false,
      customErrorMessage: "",
      areas: [],
      vicinities: []
    };
  }
  componentDidMount() {
    const { data } = this.props;
    this.setState(state => ({ state, ...data }));
  }
  onDragend = ({ latitude, longitude }) => {
    // this.setState(state=>({...state, latitude,longitude}))
    this.geocoder = new window.google.maps.Geocoder();
    this.geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          this.updateStateAndVicinity(results[0], []);
        }
      }
    );
  };

  geocodingAction = (address, onSuccess, onError = () => {}) => {
    if (!Boolean(this.geocoder)) {
      this.geocoder = new window.google.maps.Geocoder();
    }
    this.geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        if (results.length > 0) {
          onSuccess(results);
        }
      }
      if (status === "ZERO_RESULTS") {
        onError();
      }
    });
  };

  updateLatitudeAndLongitude = (latitude, longitude) => {
    this.setState(state => {
      const result = {
        ...state,
        geocodedAddress: true,
        customErrorMessage: ""
      };
      this.node.panTo(new window.google.maps.LatLng(latitude, longitude));

      return result;
    });
  };
  updateStateAndVicinity = data => {
    let address = data.name || getAddressValue(data.address_components);
    let components = sortAddress(data.address_components);
    let latitude = data.geometry.location.lat();
    let longitude = data.geometry.location.lng();
    if (Object.keys(components).length > 0 && latitude && longitude) {
      this.props.getVicinities(components.state).then(data => {
        this.setState({ vicinities: data.data.vicinities }, () => {
          this.props.updateParentVicinities(data.data.vicinities);
          // if (!includes(this.state.vicinities, components.vicinity)) {
          //   const { vicinities } = this.state;
          //   vicinities.push(components.vicinity);
          //   this.props.updateParentVicinities(vicinities);
          // }
        });
        this.props.updateState(
          { marketing_channels: data.data.marketing_channels },
          true
        );
      });
      components = { ...components, vicinity: "" };
      this.props.updateFormState(components, latitude, longitude, address);
      this.setState(state => {
        let result = {
          ...state,
          geocodedAddress: true
        };
        return result;
      });
      this.node.panTo(new window.google.maps.LatLng(latitude, longitude));
    }
  };

  render() {
    const {
      latitude,
      longitude,
      defaultCoordinate,
      style = {
        height: "400px",
        width: "100%",
        marginBottom: spacing.xl
      }
    } = this.props;
    const lat = latitude || defaultCoordinate.lat;
    const lng = longitude || defaultCoordinate.lng;
    return (
      <MAP
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.34&libraries=places,geometry&region=${"Lekki"}&key=AIzaSyAGzhm0XKSODtV3cBmytMp5eN1yTeLBcmA`}
        loadingElement={
          <Div
            css={`
              height: 600px;
              & > i {
                display: block;
                width: 80px;
                height: 80px;
                margin: 150px auto;
                animation: fa-spin 2s infinite linear;
              }
            `}
          >
            <Icon name="spinner" />
          </Div>
        }
        containerElement={this.props.render({
          that: this,
          updateLatitudeAndLongitude: this.updateLatitudeAndLongitude,
          geocodingAction: this.geocodingAction,
          updateStateAndVicinity: this.updateStateAndVicinity,
          ...this.state
        })}
        mapElement={<div className="mapper" style={style} />}
        onMapLoad={e => {
          this.node = e;
        }}
        onMapClick={() => {}}
        onDragEnd={this.onDragend}
        marker={{ lat, lng }}
        onMarkerRightClick={() => {}}
      />
    );
  }
}
