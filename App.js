import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SplashScreen from './SplashScreen';
import RestaurantList from './RestaurantList';
import CreatePost from './CreatePost';
import EditRestaurant from './EditRestaurant';
import Details from './Details';
import SharePost from './SharePost';
import Direction from './Direction';
import About from './About';

// Create the stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false, // Disable headers globally by default
        }}
      >
        {/* Screens */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="RestaurantList"
          component={RestaurantList}
          options={{
            headerShown: false, // Explicitly keep header hidden
          }}
        />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="EditRestaurant" component={EditRestaurant} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="SharePost" component={SharePost} />
        <Stack.Screen name="Direction" component={Direction} />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerShown: true, 
            title: 'About Us',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
