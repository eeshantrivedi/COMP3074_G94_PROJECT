import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SharePost = () => {
  const navigation = useNavigation();

  const handleBackToDetails = () => {
    navigation.goBack();
  };

  const handleShare = async (platform) => {
    try {
      let url = '';
      if (platform === 'facebook') {
        url = 'https://www.facebook.com/sharer/sharer.php?u=yoururl.com';
      } else if (platform === 'twitter') {
        url = 'https://twitter.com/intent/tweet?url=yoururl.com&text=Check this out!';
      } else {
        Alert.alert('Error', `Unsupported platform: ${platform}`);
        return;
      }

      const supported = await Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', `Unable to open ${platform}`);
      }
    } catch (error) {
      console.error('Sharing Error:', error);
      Alert.alert('Error', 'An error occurred while sharing.');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titleText}>Share This Post</Text>
        </View>

        {/* Instructions */}
        <Text style={styles.descriptionText}>Select a platform to share:</Text>

        {/* Social Media Buttons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: '#3b5998' }]} // Facebook blue
            onPress={() => handleShare('facebook')}
            activeOpacity={0.8}
            accessibilityLabel="Share this post on Facebook"
          >
            <Icon name="facebook" size={40} color="#fff" />
            <Text style={styles.iconText}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: '#1DA1F2' }]} // Twitter blue
            onPress={() => handleShare('twitter')}
            activeOpacity={0.8}
            accessibilityLabel="Share this post on Twitter"
          >
            <Icon name="twitter" size={40} color="#fff" />
            <Text style={styles.iconText}>Twitter</Text>
          </TouchableOpacity>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToDetails}
          activeOpacity={0.8}
          accessibilityLabel="Go back to the details page"
        >
          <Icon name="arrow-left" size={20} color="#fff" style={styles.backIcon} />
          <Text style={styles.backButtonText}>Back to Details</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better readability
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 40,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: '#d0d0d0',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  iconButton: {
    width: '45%',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  iconText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4757',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 5,
  },
  backIcon: {
    marginRight: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SharePost;
