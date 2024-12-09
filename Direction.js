import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';

const Direction = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions(); // Hook for dynamic width

  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    // Request Location Permissions
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied.');
        return;
      }
      setLocationPermission(true);
    };
    requestPermissions();
  }, []);

  const handleBackToDetails = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="location-outline" size={30} color="#fff" />
          <Text style={styles.headerText}>Restaurant Location</Text>
        </View>

        {/* Map View */}
        <View style={styles.mapContainer}>
          {locationPermission ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              accessible
              accessibilityLabel="Map displaying the restaurant location"
            >
              <Marker
                coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                title="Restaurant Name"
                description="123 Main St, City, Country"
              />
            </MapView>
          ) : (
            <Text style={styles.permissionText}>
              Location permission is required to view the map.
            </Text>
          )}
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={[styles.backButton, { width: width * 0.6 }]} // Inline style for dynamic width
          onPress={handleBackToDetails}
          accessible
          accessibilityLabel="Navigate back to restaurant details"
        >
          <Icon name="arrow-back" size={20} color="#fff" style={styles.backIcon} />
          <Text style={styles.backButtonText}>Back to Details</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  permissionText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
  },
  backIcon: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Direction;
