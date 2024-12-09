import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

// Gradient Colors
const GRADIENT_COLORS = ['#6a11cb', '#2575fc'];

// Complete Restaurant Data
const restaurantData = [
  {
    id: '1',
    name: 'Tasty Bites',
    description: 'Delicious meals crafted with love and fresh ingredients.',
    cuisine: 'Italian',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'The Gourmet Spot',
    description: 'A fine dining experience like no other.',
    cuisine: 'French',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Farmhouse Feast',
    description: 'Wholesome dishes made with farm-fresh produce.',
    cuisine: 'Organic',
    rating: 4.3,
  },
  {
    id: '4',
    name: 'Fusion Fiesta',
    description: 'An eclectic mix of flavors from around the world.',
    cuisine: 'Fusion',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Urban Bites',
    description: 'Modern dishes served in a stylish urban setting.',
    cuisine: 'Contemporary',
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Rustic Table',
    description: 'Classic comfort food with a rustic charm.',
    cuisine: 'Traditional',
    rating: 4.2,
  },
  {
    id: '7',
    name: 'City Lights Grill',
    description: 'Trend-setting cuisine in a vibrant atmosphere.',
    cuisine: 'Urban',
    rating: 4.9,
  },
  {
    id: '8',
    name: 'The Gourmet Lounge',
    description: 'Creative and bold flavors with a gourmet twist.',
    cuisine: 'Gourmet',
    rating: 4.4,
  },
  {
    id: '9',
    name: 'Cozy Eats',
    description: 'Comfort food served with a side of cozy ambiance.',
    cuisine: 'Casual Dining',
    rating: 4.6,
  },
];

// Main Component
const RestaurantList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantData);
  const searchTimeout = useRef(null);

  // Search Handler with Debouncing
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      const filtered = restaurantData.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }, 300); // Debounce by 300ms
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredRestaurants(restaurantData);
  };

  // Render Individual Restaurant Card
  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { restaurant: item })}
    >
      <LinearGradient
        colors={GRADIENT_COLORS}
        style={styles.gradientCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCuisine}>{item.cuisine}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.cardRating}>
            <Icon name="star" size={16} color="#FFD700" /> {item.rating}
          </Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />
      {/* Header */}
      <LinearGradient colors={GRADIENT_COLORS} style={styles.header}>
        <Text style={styles.headerTitle}>Discover Restaurants</Text>
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={clearSearch}>
              <Icon name="close-circle" size={20} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>
      </LinearGradient>
      {/* Restaurant List */}
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No restaurants found</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
        accessibilityLabel="Create a new post"
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: StatusBar.currentHeight + 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientCard: {
    padding: 15,
    borderRadius: 10,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardCuisine: {
    fontSize: 14,
    color: '#d0d0d0',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#ccc',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardRating: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  detailsButtonText: {
    color: '#6a11cb',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6a11cb',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default RestaurantList;
