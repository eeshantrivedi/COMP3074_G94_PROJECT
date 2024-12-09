import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const About = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions(); // Use hook for dynamic dimensions

  const students = [
    { name: 'Eeshan Trivedi', studentId: '101414811' },
  ];

  const handleBackToMain = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        {/* Title Section */}
        <View style={styles.header}>
          <Text style={styles.title}>About Us</Text>
          <Icon name="information-circle-outline" size={50} color="#fff" />
        </View>

        {/* Student Information */}
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, { width: width * 0.95 }]}
          showsVerticalScrollIndicator={false}
        >
          {students.map((student, index) => (
            <View key={index} style={styles.card}>
              <Icon name="person-circle" size={60} color="#FFD700" />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{student.name}</Text>
                <Text style={styles.id}>ID: {student.studentId}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToMain}
          activeOpacity={0.8}
          accessibilityLabel="Go back to the main screen"
        >
          <Icon name="arrow-back" size={20} color="#fff" style={styles.backIcon} />
          <Text style={styles.backButtonText}>Back to Main Screen</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker overlay for better readability
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5, // Shadow for cards
  },
  infoContainer: {
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color for a premium feel
    marginBottom: 5,
  },
  id: {
    fontSize: 16,
    color: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
    marginTop: 20,
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

export default About;
