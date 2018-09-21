import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

class MapViewMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      position: { lat: props.coordinate.latitude, lng: props.coordinate.longitude },
      icon: props.image,
      onClick: props.onPress,
      anchorPoint: new google.maps.Point(...props.anchor),
    };
  };
  
  render() {
    return (
      <Marker
        title={this.state.title}
        position={this.state.position}
        icon={this.state.icon}
        onClick={this.state.onClick}
        defaultOptions={{ anchorPoint: this.state.anchorPoint }}
      />
    );
  };
}

export default MapViewMarker;
