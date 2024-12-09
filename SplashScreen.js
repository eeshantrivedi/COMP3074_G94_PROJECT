import React, { useEffect } from 'react';
import { View, Image, StyleSheet, AccessibilityInfo } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('RestaurantList'); // Navigate to the main screen
    }, 2000);

    // Cleanup the timeout on unmount
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container} accessible accessibilityLabel="App is loading">
      <Image
        source={require('./assets/splash.png')} // Ensure the image path is correct
        style={styles.image}
        resizeMode="contain" // Better for images that need to maintain aspect ratio
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  image: {
    width: '80%', 
    height: '50%',
  },
});

export default SplashScreen;
