import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const EditRestaurant = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [tags, setTags] = useState('');
  const [ratings, setRatings] = useState(0);

  const handleSaveRestaurant = () => {
    if (!name || !address || !description) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Success',
      'Restaurant details have been updated!',
      [{ text: 'OK', onPress: () => console.log('Restaurant updated.') }]
    );
  };

  const handleDeleteRestaurant = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this restaurant?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Deleted Restaurant'),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessible accessibilityLabel="Go back">
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Restaurant</Text>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Fields */}
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Restaurant Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter restaurant name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
              accessible
              accessibilityLabel="Enter restaurant name"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter restaurant address"
              placeholderTextColor="#aaa"
              value={address}
              onChangeText={setAddress}
              accessible
              accessibilityLabel="Enter restaurant address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter a brief description"
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              accessible
              accessibilityLabel="Enter restaurant description"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              accessible
              accessibilityLabel="Enter phone number"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Tags (comma-separated)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Italian, Vegan, Family-Friendly"
              placeholderTextColor="#aaa"
              value={tags}
              onChangeText={setTags}
              accessible
              accessibilityLabel="Enter restaurant tags"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Ratings</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRatings(star)}
                  accessible
                  accessibilityLabel={`Rate ${star} stars`}
                >
                  <Icon
                    name={ratings >= star ? 'star' : 'star-outline'}
                    size={30}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSaveRestaurant}
            accessible
            accessibilityLabel="Save restaurant details"
          >
            <Icon name="save-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDeleteRestaurant}
            accessible
            accessibilityLabel="Delete restaurant"
          >
            <Icon name="trash-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  form: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#2c2c2e',
    borderRadius: 15,
    elevation: 5,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#3a3a3c',
    borderRadius: 10,
    color: '#fff',
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 12,
  },
  saveButton: {
    backgroundColor: '#4caf50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditRestaurant;
