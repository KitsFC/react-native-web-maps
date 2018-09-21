import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from './Marker';

const GoogleMapContainer = withGoogleMap(props => <GoogleMap {...props} ref={props.handleMapMounted} />);

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapTypeId: props.mapTypeId || google.maps.MapTypeId.ROADMAP,
      center: {
        lat: props.region.latitude,
        lng: props.region.longitude
      },
      zoom: props.zoom || 2.2,
    };
  };

  handleMapMounted = map => (this.map = map);

  onDragEnd = () => {
    const center = this.map.getCenter();
    !!this.props.onRegionChangeComplete &&
      this.props.onRegionChangeComplete({ latitude: center.lat(), longitude: center.lng() });
  };
  
  componentDidMount() {
    this.props.onRef(this);
  };
  
  componentWillUnmount() {
    this.props.onRef(undefined);
  };
  
  getCenter() {
    return this.map.getCenter();
  };
  
  getZoom() {
    return this.map.getZoom();
  };
  
  panTo(location) {
    this.map.panTo(location.coords);
    this.setState({
      ...this.state,
      zoom: location.zoom,
    });
  };
  
  render() {
    if (!this.state.center)
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    return (
      <View style={styles.container}>
        <GoogleMapContainer
          mapTypeId={this.state.mapTypeId}
          handleMapMounted={this.handleMapMounted}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          center={this.state.center}
          zoom={this.state.zoom}
          onDragStart={!!this.props.onRegionChange && this.props.onRegionChange}
          onDragEnd={this.onDragEnd}
          // defaultZoom={15}
          // onClick={this.props.onPress}
          // onZoomChanged={() => { console.log(this.map.getZoom()); }}
          defaultOptions={{ disableDefaultUI: true }}
        >
          {this.props.children}
        </GoogleMapContainer>
      </View>
    );
  }
}

MapView.Marker = Marker;

const styles = StyleSheet.create({
  container: {
    height: '100vh',
  },
});

export { Marker };

export default MapView;
