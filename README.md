# react-native-web-maps
> React Native for Web implementation of react-native-maps

## Version
> 0.1.1

## Notes about this fork
- Adds onRef prop so that the DOM element generated from the `MapView` component can be referenced.
- Modifies other `MapView` and `MapView.Marker` props and events (see below).

## Getting started
```
npm install https://github.com/KitsFC/react-native-web-maps --save
```
or
```
yarn add https://github.com/KitsFC/react-native-web-maps
```

To implement `react-native-web-maps` we're using the `react-google-maps` package:

```
npm install react-google-maps --save
```
or
```
yarn add react-google-maps
```

Include and alias the package in your webpack config:

```
include: [
  path.resolve(appDirectory, 'node_modules/react-native-web-maps'),
],
...
resolve: {
    alias: {
        'react-native': 'react-native-web',
        ...
        'react-native-maps': 'react-native-web-maps',
    }
}
```

You need to have a Google Maps Javascript API key to use the map, you can get one [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

Then, you should add this script to your index.html:
``` html
<script src="https://maps.googleapis.com/maps/api/js?key=<YOUR_GOOGLE_API_KEY>"></script>
```

## Usage

``` javascript
import MapView from 'react-native-maps';
```
See the original [documentation](https://github.com/airbnb/react-native-maps).

If you are using [react-community/react-native-maps](https://github.com/react-community/react-native-maps) and/or [Expo](https://docs.expo.io/versions/latest/sdk/map-view) for iOS and Android:

``` javascript
// webpack.config.js
...
module.exports = {
  resolve: {
    alias: {
      ...
      '@expo/vector-icons': 'expo-web',
      expo: 'expo-web',
      'react-native-maps': 'react-native-web-maps',
      ...
    },
  },
}
...

// Import statements example
import { Platform, View } from "react-native";
import expo from 'expo';
import reactNativeMaps from 'react-native-maps'
const MapView = Platform.OS === 'web' ? reactNativeMaps : expo.MapView;
```

The supported components are `MapView` and `MapView.Marker`.

`MapView`:
- The supported props are:
    - `region`
    - `zoom`
    - `onRef`
- The supported events are:
    - `onRegionChange`
    - `onRegionChangeComplete`
    - `onPress`

`MapView.Marker`:
- The supported props are:
    - `title`
    - `coordinate`
    - `image`
    - `anchor`
- The supported events are:
    - `onRegionChange`
    - `onRegionChangeComplete`
    - `onPress`


## Examples
See the [storybook](https://react-native-web-community.github.io/react-native-web-maps/storybook/index.html).

Using this fork, an array of markers:

``` javascript
<MapView
  onRef={ref => { this.map = ref; }} //for web
  ref={ref => { this.map = ref; }} //for native
  style={StyleSheet.absoluteFillObject}
  region={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922, //for native instead of zoom
    longitudeDelta: 0.0922 * Dimensions.get('window').width / Dimensions.get('window').height, //for native instead of zoom
  }}
  zoom={13} //for web only
  onRegionChangeComplete={(region) => { center = this.getCenter(); }}
>
  {markers.map((marker, i) => (
    <MapView.Marker
      key={i}
      title={marker.title}
      coordinate={marker.location}
      image={require('./../../assets/icon.png')}
      anchor={{ x: 0.5, y: 0.5 }}
      onPress={() => this.handlePress();}
    />
  ))}
</MapView>
```

## License
MIT License
