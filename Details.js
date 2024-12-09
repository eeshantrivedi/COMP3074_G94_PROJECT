import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Details = ({ route }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  // Fake restaurant details for testing
  const restaurant = {
    name: 'The Golden Spoon',
    description: 'A cozy restaurant offering gourmet meals with fresh ingredients.',
    address: '123 Foodie Lane, Tasteville, TX 75001',
    phone: '+1 (555) 123-4567',
    cuisine: 'Italian, Continental',
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => setRating(newRating);

  const handleSubmitComment = () => {
    if (comment.trim()) {
      Alert.alert('Success', 'Your comment was submitted successfully!');
      setComment('');
    } else {
      Alert.alert('Error', 'Please enter a valid comment.');
    }
  };

  const renderRatingStars = () =>
    [...Array(5)].map((_, index) => (
      <TouchableOpacity key={index} onPress={() => handleRatingChange(index + 1)}>
        <Icon name={index < rating ? 'star' : 'star-outline'} size={30} color="#FFD700" />
      </TouchableOpacity>
    ));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{restaurant.name}</Text>
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.descriptionText}>{restaurant.description}</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="location" size={18} color="#FFD700" /> Address
            </Text>
            <Text style={styles.sectionContent}>{restaurant.address}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="call" size={18} color="#FFD700" /> Phone
            </Text>
            <Text style={styles.sectionContent}>{restaurant.phone}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="restaurant" size={18} color="#FFD700" /> Cuisine
            </Text>
            <View style={styles.cuisineTag}>
              <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
            </View>
          </View>

          {/* Rating Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="star" size={18} color="#FFD700" /> Rate This Restaurant
            </Text>
            <View style={styles.ratingStars}>{renderRatingStars()}</View>
          </View>

          {/* Comment Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="chatbubble-ellipses" size={18} color="#FFD700" /> Add a Comment
            </Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Share your experience..."
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitComment}
              accessible
              accessibilityLabel="Submit your comment"
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={[styles.actionButtonsContainer, { width: width * 0.9 }]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('SharePost', { restaurant })}
            >
              <Icon name="share-social" size={20} color="#FFD700" />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Direction', { restaurant })}
            >
              <Icon name="navigate" size={20} color="#FFD700" />
              <Text style={styles.actionButtonText}>Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('EditRestaurant', { restaurant })}
            >
              <Icon name="create" size={20} color="#FFD700" />
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('About')}
            >
              <Icon name="information-circle" size={20} color="#FFD700" />
              <Text style={styles.actionButtonText}>About</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 15,
    padding: 20,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    color: '#ccc',
  },
  cuisineTag: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  cuisineText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  ratingStars: {
    flexDirection: 'row',
    marginTop: 10,
  },
  commentInput: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Details;
