import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { REACT_APP_API_KEY } from '@env';
import * as Location from 'expo-location';

export default function App() {
  const API_KEY = REACT_APP_API_KEY;
  const API_URL = `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}`;
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      });
    })();
  }, []);

  const showAddress = () => {
    if (address) {
      fetch(`${API_URL}&location=${address}`)
      .then(response => response.json()) 
      .then(responseData => {
        setRegion({
          ...region,
          latitude: responseData.results[0].locations[0].latLng.lat, 
          longitude: responseData.results[0].locations[0].latLng.lng});
      })
      .catch(err => console.error(err));
    }
  }  

  return (
    <View style={styles.container}>
      <MapView
        style={{flex: 5}}
        region={region}>
        {region && (
          <Marker
            coordinate={{
              latitude: region.latitude, longitude: region.longitude
            }} 
          />
        )}
      </MapView>
      <TextInput 
        placeholder='Type address' 
        style={{height: 40, fontSize: 18}} 
        onChangeText={address => setAddress(address)} />
      <Button title="Show" onPress={showAddress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
