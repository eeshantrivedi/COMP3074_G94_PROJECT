import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CreatePost = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [tags, setTags] = useState('');
  const [ratings, setRatings] = useState(0);
  const [publish, setPublish] = useState(false);

  const handleCreatePost = () => {
    if (!name || !address || !description || !phone || !tags || ratings === 0) {
      Alert.alert('Error', 'Please fill in all fields and select a rating.');
      return;
    }

    Alert.alert(
      'Post Created',
      `Your post "${name}" has been successfully created!`,
      [{ text: 'OK', onPress: () => console.log('Post created') }]
    );

    // Reset fields after creating the post
    setName('');
    setAddress('');
    setDescription('');
    setPhone('');
    setTags('');
    setRatings(0);
    setPublish(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="create-outline" size={32} color="#fff" />
          <Text style={styles.headerText}>Create a New Post</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Restaurant Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter restaurant name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Address Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter restaurant address"
              placeholderTextColor="#aaa"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the restaurant"
              placeholderTextColor="#aaa"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Tags Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Tags</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., cozy, vegan-friendly"
              placeholderTextColor="#aaa"
              value={tags}
              onChangeText={setTags}
            />
          </View>

          {/* Ratings */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Rating</Text>
            <View style={styles.ratingsContainer}>
              {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity key={index} onPress={() => setRatings(index)}>
                  <Icon
                    name={ratings >= index ? 'star' : 'star-outline'}
                    size={32}
                    color="#FFD700"
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Publish Switch */}
          <View style={styles.switchWrapper}>
            <Text style={styles.label}>Publish Post</Text>
            <Switch
              value={publish}
              onValueChange={setPublish}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor="#fff"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleCreatePost}>
            <Text style={styles.submitButtonText}>Create Post</Text>
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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  formContainer: {
    backgroundColor: '#2c2c2e',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
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
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginHorizontal: 5,
  },
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreatePost;
